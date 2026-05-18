import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stackd',
  description: 'Your AI-powered student OS — DSA, CGPA, placement prep & AI mentor',
  keywords: ['Stackd', 'AI', 'student', 'DSA', 'CGPA', 'placement prep', 'GenAI'],
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
