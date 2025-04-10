import { PropsWithChildren } from 'react'
import { MainSidebar } from './Sidebar'
import { SidebarInset, SidebarProvider } from './ui/sidebar'

export function Layout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <div className="flex-1 p-6 ">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
