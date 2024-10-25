import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetPackages = () => {
  const query = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const response = await client.api.packages.$get();

      if (!response.ok) {
        throw new Error("Fallo al obtener los envíos");
      }

      const { data } = await response.json();
      return data;
    }
  });

  return query;
}