"use client"

import { useEffect, useState } from "react"
import { ClientDialog } from "@/functions/clients/components/clientDialog"

export const DialogProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <ClientDialog />
    </>
  )
}