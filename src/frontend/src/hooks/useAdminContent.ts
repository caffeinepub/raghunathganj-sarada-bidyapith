import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Announcement, Event, StaffProfile, Setting } from '../backend';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';

// Announcements
export function useAllAnnouncements() {
  const { actor, isFetching } = useActor();

  return useQuery<Announcement[]>({
    queryKey: ['announcements', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAnnouncements();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveAnnouncement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (announcement: Announcement) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveAnnouncement(announcement);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast.success('Announcement saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save announcement: ${error.message}`);
    },
  });
}

export function useDeleteAnnouncement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteAnnouncement(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast.success('Announcement deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete announcement: ${error.message}`);
    },
  });
}

// Events
export function useAllEvents() {
  const { actor, isFetching } = useActor();

  return useQuery<Event[]>({
    queryKey: ['events', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (event: Event) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveEvent(event);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save event: ${error.message}`);
    },
  });
}

export function useDeleteEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteEvent(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete event: ${error.message}`);
    },
  });
}

// Staff
export function useAllStaff() {
  const { actor, isFetching } = useActor();

  return useQuery<StaffProfile[]>({
    queryKey: ['staff', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      const published = await actor.getAllPublishedStaff();
      return published;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveStaffProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: StaffProfile) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveStaffProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      toast.success('Staff profile saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save staff profile: ${error.message}`);
    },
  });
}

export function useDeleteStaffProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteStaffProfile(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      toast.success('Staff profile deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete staff profile: ${error.message}`);
    },
  });
}

// Gallery
export function usePublishFiles() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      if (!actor) throw new Error('Actor not available');
      await actor.publishFiles(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast.success('Images published successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to publish images: ${error.message}`);
    },
  });
}

// Settings
export function useSaveSetting() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (setting: Setting) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveSetting(setting);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      queryClient.invalidateQueries({ queryKey: ['setting'] });
      toast.success('Setting saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save setting: ${error.message}`);
    },
  });
}
