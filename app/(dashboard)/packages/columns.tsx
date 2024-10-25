"use client"

import { InferResponseType } from "hono"
import { ColumnDef } from "@tanstack/react-table"
import { client } from "@/lib/hono"

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
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "Actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
]
