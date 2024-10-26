"use client"

import { useEffect, useState } from "react"
import { CreateClientDialog } from "@/functions/clients/components/createClientDialog"
import { EditClientDialog } from "@/functions/clients/components/editClientDialog"
import { CreatePackageDialog } from "@/functions/packages/components/createPackageDialog"
import { EditPackageDialog } from "@/functions/packages/components/editPackageDialog"

export const DialogProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <CreateClientDialog />
      <EditClientDialog />
      <CreatePackageDialog />
      <EditPackageDialog />
    </>
  )
}