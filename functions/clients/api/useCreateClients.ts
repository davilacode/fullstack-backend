import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.clients.$post>;
type RequestType = InferRequestType<typeof client.api.clients.$post>["json"];


export const useCreateClients = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType,
    Error,
    RequestType>({
      mutationFn: async (json) => {
        const response = await client.api.clients.$post({ json });
        return await response.json();
      },
      onSuccess: () => {
        toast.success('Cliente creado');
        queryClient.invalidateQueries({ queryKey: ['clients'] });
      },
      onError: (error) => {
        console.log(error);
        toast.error('Falla al crear cliente');
        console.error(error);
      }
    })

  return mutation
}