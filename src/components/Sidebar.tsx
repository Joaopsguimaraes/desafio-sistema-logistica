import {
  BarChart3Icon,
  LinkIcon,
  Package2Icon,
  ShoppingCartIcon,
  TruckIcon,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from './ui/sidebar'
import { NavLink, useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'

const menuItems = [
  {
    title: 'Dashboard',
    icon: BarChart3Icon,
    href: '/',
  },
  {
    title: 'Produtos',
    icon: Package2Icon,
    href: '/products',
  },
  {
    title: 'Compras',
    icon: ShoppingCartIcon,
    href: '/purchase',
  },
  {
    title: 'Vendas',
    icon: TruckIcon,
    href: '/sales',
  },
  {
    title: 'ver Vínculos',
    icon: LinkIcon,
    href: '/links',
  },
]

export function MainSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
            >
              <NavLink to="/">
                <Logo />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Logistica</span>
                  <span className="text-xs text-muted-foreground">
                    Gestão de Logística
                  </span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.href === location.pathname}
                className={cn(
                  'group transition-all duration-300 ease-in-out',
                  'hover:-translate-y-1 hover:bg-green-100 dark:hover:bg-green-900/30',
                )}
              >
                <NavLink to={item.href}>
                  <item.icon className="transition-transform duration-300 ease-in-out group-hover:scale-110" />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
