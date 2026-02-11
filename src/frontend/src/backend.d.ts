import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface StaffProfile {
    id: string;
    bio: string;
    contact: string;
    published: boolean;
    name: string;
    position: string;
    photoId?: string;
}
export interface Setting {
    id: string;
    key: string;
    value: string;
}
export interface Event {
    id: string;
    title: string;
    date: bigint;
    published: boolean;
    description: string;
    location: string;
}
export interface Announcement {
    id: string;
    title: string;
    published: boolean;
    author: string;
    message: string;
    timestamp: Time;
}
export interface ContentMetadata {
    id: string;
    contentType: ContentCollection;
    lastModified: Time;
    collectionUpdated: Time;
    collectionSize: bigint;
}
export enum ContentCollection {
    siteSettings = "siteSettings",
    staff = "staff",
    events = "events",
    announcements = "announcements",
    gallery = "gallery"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteAnnouncement(id: string): Promise<void>;
    deleteEvent(id: string): Promise<void>;
    deleteSetting(key: string): Promise<void>;
    deleteStaffProfile(id: string): Promise<void>;
    getAllAnnouncements(): Promise<Array<Announcement>>;
    getAllEvents(): Promise<Array<Event>>;
    getAllPublishedStaff(): Promise<Array<StaffProfile>>;
    getAllSettings(): Promise<Array<Setting>>;
    getAnnouncement(id: string): Promise<Announcement>;
    getAnnouncementsByPublished(published: boolean): Promise<Array<Announcement>>;
    getCallerUserRole(): Promise<UserRole>;
    getContentMetadata(contentType: ContentCollection, id: string | null): Promise<ContentMetadata | null>;
    getEvent(id: string): Promise<Event>;
    getPublishedGalleryEntries(): Promise<Array<[string, ExternalBlob]>>;
    getSetting(key: string): Promise<Setting | null>;
    getStaffProfile(key: string): Promise<StaffProfile>;
    isCallerAdmin(): Promise<boolean>;
    publishFiles(ids: Array<string>): Promise<void>;
    saveAnnouncement(a: Announcement): Promise<void>;
    saveEvent(e: Event): Promise<void>;
    saveSetting(s: Setting): Promise<void>;
    saveStaffProfile(profile: StaffProfile): Promise<void>;
}
