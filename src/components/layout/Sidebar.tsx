import React from 'react'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Receipt, 
  CreditCard, 
  FileText,
  Calculator
} from 'lucide-react'

type Page = 'dashboard' | 'ventas' | 'gastos' | 'ingresos' | 'reportes'

interface SidebarProps {
  currentPage: Page
  onPageChange: (page: Page) => void
}

const menuItems = [
  {
    id: 'dashboard' as Page,
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    id: 'ventas' as Page,
    label: 'Ventas',
    icon: ShoppingCart
  },
  {
    id: 'gastos' as Page,
    label: 'Gastos',
    icon: Receipt
  },
  {
    id: 'ingresos' as Page,
    label: 'Ingresos Bancarios',
    icon: CreditCard
  },
  {
    id: 'reportes' as Page,
    label: 'Reportes',
    icon: FileText
  }
]

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 lg:block hidden">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-slate-200">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">ContaSimple</h1>
            <p className="text-sm text-slate-500">Portal Cliente</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-amber-800">Régimen Simple</p>
              <p className="text-xs text-amber-600">Colombia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}