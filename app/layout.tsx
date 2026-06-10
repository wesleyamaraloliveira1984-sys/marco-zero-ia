import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marco Zero AI',
  description: 'Financial Intelligence System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
