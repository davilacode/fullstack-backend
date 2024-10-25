import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetClients = () => {
  const query = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await client.api.clients.$get();

      if (!response.ok) {
        throw new Error("Fallo al obtener los clientes");
      }

      const { data } = await response.json();
      return data;
    }
  });

  return query;
}