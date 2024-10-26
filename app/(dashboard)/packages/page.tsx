"use client"
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { useNewPackages } from "@/functions/packages/hooks/usePackages";
import { useGetPackages } from "@/functions/packages/api/useGetPackages";
import { columns } from "./columns"


const Packages = () => {
  const { onOpen } = useNewPackages();
  const packagesQuery = useGetPackages();
  const data = packagesQuery.data ?? [];

  if (packagesQuery.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex py-2 flex-col lg:flex-row gap-y-2 border-b-2 border-stone-600 justify-between mb-4">
        <h2 className="font-bold text-2xl">Envíos</h2>
        <Button onClick={() => onOpen()}>
          <Plus className="size-4" /> 
          Envío
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
 
export default Packages;