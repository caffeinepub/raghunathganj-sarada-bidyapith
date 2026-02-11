import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

export function useFirstAdminBootstrapAvailable() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<boolean>({
    queryKey: ['firstAdminBootstrapAvailable'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.getFirstAdminWindowOpen();
      } catch (error) {
        console.error('Failed to check bootstrap availability:', error);
        return false;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    staleTime: 30000, // Cache for 30 seconds
  });

  return {
    ...query,
    isAvailable: query.data === true,
    isLoading: actorFetching || query.isLoading,
  };
}

export function useBootstrapFirstAdmin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { identity } = useInternetIdentity();

  return useMutation({
    mutationFn: async () => {
      if (!actor) {
        throw new Error('Actor not available');
      }
      if (!identity) {
        throw new Error('Not authenticated');
      }
      await actor.bootstrapFirstAdmin();
    },
    onSuccess: () => {
      // Invalidate admin-related queries
      queryClient.invalidateQueries({ queryKey: ['adminStatus'] });
      queryClient.invalidateQueries({ queryKey: ['firstAdminBootstrapAvailable'] });
    },
    onError: (error) => {
      console.error('Bootstrap failed:', error);
    },
  });
}
