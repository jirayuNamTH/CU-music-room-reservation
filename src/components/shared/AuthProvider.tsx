// src/components/shared/AuthProvider.tsx
"use client" // <-- This is required

import { SessionProvider } from "next-auth/react"

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <SessionProvider>{children}</SessionProvider>
}