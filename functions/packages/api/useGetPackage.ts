import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetPackage = (id?: string ) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["package", { id }],
    queryFn: async () => {
      const response = await client.api.packages[":id"].$get({
        param: { id }
      });

      if (!response.ok) {
        throw new Error("Fallo al obtener el envío");
      }

      const { data } = await response.json();
      return data;
    }
  });

  return query;
}