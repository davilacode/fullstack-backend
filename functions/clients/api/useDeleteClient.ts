import { InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.clients[":id"]["$delete"]>;


export const useDeleteClient = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType,
    Error>({
      mutationFn: async () => {
        const response = await client.api.clients[":id"]["$delete"]({ param: { id } });
        return await response.json();
      },
      onSuccess: () => {
        toast.success('Cliente eliminado');
        queryClient.invalidateQueries({ queryKey: ['client', { id }] });
        queryClient.invalidateQueries({ queryKey: ['clients'] });
      },
      onError: (error) => {
        console.log(error);
        toast.error('Falla al eliminar cliente');
        console.error(error);
      }
    })

  return mutation
}