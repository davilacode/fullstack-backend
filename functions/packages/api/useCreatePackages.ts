import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.packages.$post>;
type RequestType = InferRequestType<typeof client.api.packages.$post>["json"];


export const useCreatePackages = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType,
    Error,
    RequestType>({
      mutationFn: async (json) => {
        const response = await client.api.packages.$post({json});
        return await response.json();
      },
      onSuccess: () => {
        toast.success('Envío creado');
        queryClient.invalidateQueries({ queryKey: ['packages'] });
      },
      onError: (error) => {
        console.log(error);
        toast.error('Falla al crear envío');
        console.error(error);
      }
    })

  return mutation
}