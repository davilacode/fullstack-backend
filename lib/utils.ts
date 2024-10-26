import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTrackingNumber() {
  const prefix = "TRK"; // Prefijo para el número de rastreo
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // Fecha en formato YYYYMMDD
  const random = Math.floor(1000 + Math.random() * 9000); // Número aleatorio de 4 dígitos

  return `${prefix}-${date}-${random}`;
}