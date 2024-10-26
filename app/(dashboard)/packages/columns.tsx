"use client"

import { InferResponseType } from "hono"
import { ColumnDef } from "@tanstack/react-table"
import { client } from "@/lib/hono"
import { useEditPackages } from "@/functions/packages/hooks/usePackages";

import Actions from "@/components/actions"

export type ResponseType = InferResponseType<typeof client.api.packages.$get, 200>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    accessorKey: "content",
    header: "Contenido",
  },
  {
    accessorKey: "senderName",
    header: "Remitente",
  },
  {
    accessorKey: "recipientName",
    header: "Destinatario",
  },
  {
    accessorKey: "trackingId",
    header: "Nro Guía",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha creación",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    accessorKey: "Actions",
    cell: ({ row }) => {
      return <ActionsCell row={row} />
    }
  },
]

const ActionsCell: React.FC<{ row: { original: ResponseType } }> = ({ row }) => {
  const { onOpen } = useEditPackages();
  return <Actions id={row.original.id} onOpen={onOpen} />;
};
