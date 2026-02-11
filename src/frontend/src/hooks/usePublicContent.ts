import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Announcement, Event, StaffProfile, Setting } from '../backend';
import { ExternalBlob } from '../backend';

export function usePublishedAnnouncements() {
  const { actor, isFetching } = useActor();

  return useQuery<Announcement[]>({
    queryKey: ['announcements', 'published'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAnnouncements();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000,
  });
}

export function usePublishedEvents() {
  const { actor, isFetching } = useActor();

  return useQuery<Event[]>({
    queryKey: ['events', 'published'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEvents();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000,
  });
}

export function usePublishedStaff() {
  const { actor, isFetching } = useActor();

  return useQuery<StaffProfile[]>({
    queryKey: ['staff', 'published'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPublishedStaff();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000,
  });
}

export function usePublishedGallery() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[string, ExternalBlob]>>({
    queryKey: ['gallery', 'published'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedGalleryEntries();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000,
  });
}

export function useSiteSettings() {
  const { actor, isFetching } = useActor();

  return useQuery<Setting[]>({
    queryKey: ['settings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSettings();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60000,
  });
}

export function useSetting(key: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Setting | null>({
    queryKey: ['setting', key],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSetting(key);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60000,
  });
}
