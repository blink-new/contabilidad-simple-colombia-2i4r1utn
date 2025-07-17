import React, { useState } from 'react'
import { Toaster } from '@/components/ui/toaster'
import Dashboard from '@/pages/Dashboard'
import Ventas from '@/pages/Ventas'
import Gastos from '@/pages/Gastos'
import IngresosBancarios from '@/pages/IngresosBancarios'
import Reportes from '@/pages/Reportes'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

type Page = 'dashboard' | 'ventas' | 'gastos' | 'ingresos' | 'reportes'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'ventas':
        return <Ventas />
      case 'gastos':
        return <Gastos />
      case 'ingresos':
        return <IngresosBancarios />
      case 'reportes':
        return <Reportes />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 lg:ml-64">
          <Header />
          <main className="p-6">
            {renderPage()}
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default App