import type { Metadata } from "next"
import localFont from "next/font/local"
import { ClerkProvider } from "@clerk/nextjs"
// Lenguaje en español para Clerk
import { esES } from "@clerk/localizations"

// Provider de Tanstack React Query
import QueryProvider from "@/providers/queryProvider"
// Provider para mostrar todas las modales
import { DialogProvider } from "@/providers/dialogProvider"
// Componente para mostrar notificaciones
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Envío de paquetería",
  description: "Enviamos a todo el país",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <QueryProvider>
            <DialogProvider />
            <Toaster />
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
