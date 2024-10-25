import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.clients[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.clients[":id"]["$patch"]>["json"];


export const useUpdateClient = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType,
    Error,
    RequestType>({
      mutationFn: async (json) => {
        const response = await client.api.clients[":id"]["$patch"]({
          param: { id },
          json,
        });
        return await response.json();
      },
      onSuccess: () => {
        toast.success('Cliente actualizado');
        queryClient.invalidateQueries({ queryKey: ['client', { id }] });
        queryClient.invalidateQueries({ queryKey: ['clients'] });
      },
      onError: (error) => {
        console.log(error);
        toast.error('Falla al actualizar cliente');
        console.error(error);
      }
    })

  return mutation
}