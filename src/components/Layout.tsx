import React, { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'
import { BarChart3, Package, ShoppingCart, Home, TruckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <div className="bg-primary md:w-64 w-full md:min-h-screen p-4">
        <div className="flex items-center gap-2 mb-8">
          <TruckIcon className="size-8 text-white" />
          <h1 className="text-2xl font-bold text-white">Logística</h1>
        </div>

        <nav className="space-y-2">
          <NavItem
            to="/"
            icon={<Home className="size-5" />}
            label="Dashboard"
          />
          <NavItem
            to="/products"
            icon={<Package className="size-5" />}
            label="Produtos"
          />
          <NavItem
            to="/purchases"
            icon={<ShoppingCart className="size-5" />}
            label="Compras"
          />
          <NavItem
            to="/sales"
            icon={<BarChart3 className="size-5" />}
            label="Vendas"
          />
        </nav>
      </div>

      <div className="flex-1 p-6 bg-gray-50">{children}</div>
    </div>
  )
}

interface NavItemProps {
  to: string
  icon: React.ReactNode
  label: string
}

function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
          'hover:bg-foreground/20',
          isActive
            ? 'bg-zinc-900 text-primary-foreground font-medium'
            : 'text-gray-300',
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}
