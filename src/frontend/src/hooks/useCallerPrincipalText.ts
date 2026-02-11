import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

export function useCallerPrincipalText() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const query = useQuery<string>({
    queryKey: ['callerPrincipalText', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) {
        // Fallback to identity if actor is not available
        return identity?.getPrincipal().toString() || '';
      }
      try {
        return await actor.getCallerPrincipalText();
      } catch (error) {
        console.error('Failed to fetch caller principal text:', error);
        // Fallback to identity
        return identity?.getPrincipal().toString() || '';
      }
    },
    enabled: !!identity && !actorFetching,
    retry: false,
    staleTime: Infinity, // Principal doesn't change during session
  });

  return {
    ...query,
    principalText: query.data || '',
    isLoading: actorFetching || query.isLoading,
  };
}
