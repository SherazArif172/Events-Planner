import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { Providers } from "./components/Providers"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "EventCraft - Professional Event Planning",
  description: "Create unforgettable events with professional planning and attention to detail",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense>
          <Providers >
          {children}
          </Providers>
          <Analytics />
          <Toaster />
        </Suspense>
      </body>
    </html>
  )
}
