import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useHealthCheck() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['healthCheck'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.healthCheck();
    },
    enabled: !!actor && !isFetching,
  });
}
