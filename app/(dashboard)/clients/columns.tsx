"use client"

import { InferResponseType } from "hono"
import { ColumnDef } from "@tanstack/react-table"
import { client } from "@/lib/hono"
import { useEditClients } from "@/functions/clients/hooks/useClients";

import Actions from "@/components/actions"

export type ResponseType = InferResponseType<typeof client.api.clients.$get, 200>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
      accessorKey: "actions",
      cell: ({ row }) => {
        return <ActionsCell row={row} />
      }
    },
]

const ActionsCell: React.FC<{ row: { original: ResponseType } }> = ({ row }) => {
  const { onOpen } = useEditClients();
  return <Actions id={row.original.id} onOpen={onOpen} />;
};
