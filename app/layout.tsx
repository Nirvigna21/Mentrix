import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Student OS',
  description: 'Your all-in-one AI-powered student productivity platform',
  keywords: ['AI', 'student', 'DSA', 'CGPA', 'placement prep', 'GenAI'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg text-white antialiased">
        {children}
      </body>
    </html>
  )
}
