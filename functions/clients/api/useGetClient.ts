import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";


// Hook para obtener un cliente
export const useGetClient = (id?: string ) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["client", { id }],
    queryFn: async () => {
      const response = await client.api.clients[":id"].$get({
        param: { id }
      });

      if (!response.ok) {
        throw new Error("Fallo al obtener los clientes");
      }

      const { data } = await response.json();
      return data;
    }
  });

  return query;
}