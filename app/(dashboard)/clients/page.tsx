"use client"

import { Button } from "@/components/ui/button";
import { useNewClients } from "@/functions/clients/hooks/useClients";
import { Plus } from "lucide-react";

import { columns } from "./columns"
import { DataTable } from "@/components/data-table";
import { useGetClients } from "@/functions/clients/api/useGetClients";

const Clients = () => {
  const { onOpen } = useNewClients();
  const clientsQuery = useGetClients();
  const data = clientsQuery.data ?? [];

  if (clientsQuery.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex py-2 flex-col lg:flex-row gap-y-2 border-b-2 border-stone-600 justify-between mb-4">
        <h2 className="font-bold text-2xl">Clientes</h2>
        <Button onClick={() => onOpen()}>
          <Plus className="size-4" /> 
          cliente
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
 
export default Clients;