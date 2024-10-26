import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.packages[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.packages[":id"]["$patch"]>["json"];


export const useUpdatePackages = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType,
    Error,
    RequestType>({
      mutationFn: async (json) => {
        const response = await client.api.packages[":id"]["$patch"]({
          param: { id },
          json,
        });
        return await response.json();
      },
      onSuccess: () => {
        toast.success('Envío actualizado');
        queryClient.invalidateQueries({ queryKey: ['package', {
          id
        }] });
        queryClient.invalidateQueries({ queryKey: ['packages'] });
      },
      onError: (error) => {
        console.log(error);
        toast.error('Falla al actualizar envío');
        console.error(error);
      }
    })

  return mutation
}