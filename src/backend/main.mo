import Array "mo:core/Array";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import List "mo:core/List";
import Time "mo:core/Time";
import Int64 "mo:core/Int64";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Persistent State
  // Arrays for ordered content
  let announcementsList = List.empty<Announcement>();
  let eventsList = List.empty<Event>();
  // Maps for entities keyed by ID
  let staffProfiles = Map.empty<Text, StaffProfile>();
  let siteSettings = Map.empty<Text, Setting>();
  let publishedGallery = Map.empty<Text, Storage.ExternalBlob>();
  // Keep order of all keys to maintain save order and fetch order in reverse
  let publishedGalleryEntries = List.empty<Text>();

  // Auth system and persistent references initialized upfront
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Content type and content id
  public type ContentCollection = {
    #announcements;
    #events;
    #staff;
    #gallery;
    #siteSettings;
  };

  public type ContentMetadata = {
    id : Text;
    contentType : ContentCollection;
    lastModified : Time.Time;
    collectionSize : Nat;
    collectionUpdated : Time.Time;
  };

  //---------------- DATA TYPES -------------------------------

  public type Announcement = {
    id : Text;
    title : Text;
    message : Text;
    author : Text;
    timestamp : Time.Time;
    published : Bool;
  };

  public type Event = {
    id : Text;
    title : Text;
    description : Text;
    date : Int64;
    location : Text;
    published : Bool;
  };

  public type StaffProfile = {
    id : Text;
    name : Text;
    position : Text;
    bio : Text;
    contact : Text;
    photoId : ?Text;
    published : Bool;
  };

  public type Setting = {
    id : Text;
    key : Text;
    value : Text;
  };

  // FILE STORAGE IMPLEMENTATION
  include MixinStorage();

  //--------------- PUBLISHED LARGE FILE GALLERY ----------------------

  public shared ({ caller }) func publishFiles(ids : [Text]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    // Fetch and add in order w. latest first
    let validKeys = ids.filter(func(key) { publishedGallery.containsKey(key) });
    let reversedValidKeys = validKeys.reverse();
    for (key in reversedValidKeys.values()) {
      publishedGalleryEntries.add(key);
    };
  };

  public query ({ caller }) func getPublishedGalleryEntries() : async [(Text, Storage.ExternalBlob)] {
    publishedGalleryEntries.reverse().toArray().map(
      func(key) {
        switch (publishedGallery.get(key)) {
          case (?blob) { (key, blob) };
          case (null) { Runtime.trap("Key not found") };
        };
      }
    );
  };

  //------------------- STAFF -----------------------------

  public query ({ caller }) func getStaffProfile(key : Text) : async StaffProfile {
    switch (staffProfiles.get(key)) {
      case (null) { Runtime.trap("Staff profile does not exist") };
      case (?profile) { profile };
    };
  };

  public query ({ caller }) func getAllPublishedStaff() : async [StaffProfile] {
    staffProfiles.values().toArray().filter(func(profile) { profile.published });
  };

  public shared ({ caller }) func saveStaffProfile(profile : StaffProfile) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    staffProfiles.add(profile.id, profile);
  };

  public shared ({ caller }) func deleteStaffProfile(id : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    staffProfiles.remove(id);
  };

  //-------------------- ANNOUNCEMENTS -------------------

  module Announcement {
    public func compare(a : Announcement, b : Announcement) : Order.Order {
      Int64.compare(Int64.fromInt(a.timestamp), Int64.fromInt(b.timestamp));
    };
  };

  public query ({ caller }) func getAllAnnouncements() : async [Announcement] {
    // Only admins can see all announcements (including unpublished)
    // Public users only see published announcements
    if (AccessControl.isAdmin(accessControlState, caller)) {
      announcementsList.toArray();
    } else {
      announcementsList.toArray().filter(func(a) { a.published });
    };
  };

  public query ({ caller }) func getAnnouncementsByPublished(published : Bool) : async [Announcement] {
    // Only admins can fetch unpublished announcements
    if (not published and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view unpublished announcements");
    };
    announcementsList.toArray().filter(func(a) { a.published == published });
  };

  public query ({ caller }) func getAnnouncement(id : Text) : async Announcement {
    switch (announcementsList.toArray().find(func(a) { a.id == id })) {
      case (null) { Runtime.trap("Announcement not found") };
      case (?announcement) {
        // Only admins can view unpublished announcements
        if (not announcement.published and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only admins can view unpublished announcements");
        };
        announcement;
      };
    };
  };

  public shared ({ caller }) func saveAnnouncement(a : Announcement) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    // Remove existing entries with same id
    let filteredList = announcementsList.filter(func(ann) { ann.id != a.id });
    announcementsList.clear();
    announcementsList.addAll(filteredList.values());

    // Add new announcement at the end (already in right order)
    announcementsList.add(a);
  };

  public shared ({ caller }) func deleteAnnouncement(id : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete announcements");
    };
    let filteredList = announcementsList.filter(func(a) { a.id != id });
    announcementsList.clear();
    announcementsList.addAll(filteredList.values());
  };

  //---------------------- EVENTS -----------------------

  module Event {
    public func compare(a : Event, b : Event) : Order.Order {
      Int64.compare(a.date, b.date); // Ascending by date
    };
  };

  public query ({ caller }) func getAllEvents() : async [Event] {
    // Only admins can see all events (including unpublished)
    // Public users only see published events
    if (AccessControl.isAdmin(accessControlState, caller)) {
      eventsList.toArray().sort();
    } else {
      eventsList.toArray().filter(func(e) { e.published }).sort();
    };
  };

  public query ({ caller }) func getEvent(id : Text) : async Event {
    switch (eventsList.toArray().find(func(event) { event.id == id })) {
      case (null) { Runtime.trap("Event not found") };
      case (?event) {
        // Only admins can view unpublished events
        if (not event.published and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only admins can view unpublished events");
        };
        event;
      };
    };
  };

  public shared ({ caller }) func saveEvent(e : Event) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    // Remove existing entries with same id
    let filteredList = eventsList.filter(func(ev) { ev.id != e.id });
    eventsList.clear();
    eventsList.addAll(filteredList.values());

    // Add new event at the end (already in right order)
    eventsList.add(e);
  };

  public shared ({ caller }) func deleteEvent(id : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete events");
    };
    let filteredList = eventsList.filter(func(e) { e.id != id });
    eventsList.clear();
    eventsList.addAll(filteredList.values());
  };

  //------------------- SITE SETTINGS -----------------

  public query ({ caller }) func getSetting(key : Text) : async ?Setting {
    siteSettings.get(key);
  };

  public query ({ caller }) func getAllSettings() : async [Setting] {
    siteSettings.values().toArray();
  };

  public shared ({ caller }) func saveSetting(s : Setting) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    siteSettings.add(s.key, s);
  };

  public shared ({ caller }) func deleteSetting(key : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete settings");
    };
    siteSettings.remove(key);
  };

  //------------------ CONTENT METADATA -----------------

  func getAnnouncementsCount() : Nat {
    announcementsList.size();
  };

  func getEventsCount() : Nat {
    eventsList.size();
  };

  func getPublishedCount(map : Map.Map<Text, Storage.ExternalBlob>) : Nat {
    map.size();
  };

  public query ({ caller }) func getContentMetadata(contentType : ContentCollection, id : ?Text) : async ?ContentMetadata {
    switch (id) {
      case (null) {
        ?{
          id = "";
          contentType;
          lastModified = Time.now();
          collectionSize = switch (contentType) {
            case (#announcements) { getAnnouncementsCount() };
            case (#events) { getEventsCount() };
            case (#gallery) { getPublishedCount(publishedGallery) };
            case (#staff) { staffProfiles.size() };
            case (#siteSettings) { siteSettings.size() };
          };
          collectionUpdated = Time.now();
        };
      };
      case (_) { null };
    };
  };
};
