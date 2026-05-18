import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navbar user={null} />
      <div className="flex flex-1 pt-14">
        <Sidebar />
        <main className="flex-1 ml-0 md:ml-56 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}