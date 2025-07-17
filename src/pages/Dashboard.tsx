import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

export default function Dashboard() {
  // Mock data - will be replaced with real data later
  const stats = {
    totalVentas: 15420000,
    totalGastos: 8750000,
    ingresosBancarios: 14200000,
    utilidadNeta: 6670000
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const recentTransactions = [
    { id: 1, type: 'venta', description: 'Venta de servicios - Cliente ABC', amount: 2500000, date: '2024-01-15' },
    { id: 2, type: 'gasto', description: 'Compra de suministros de oficina', amount: -450000, date: '2024-01-14' },
    { id: 3, type: 'ingreso', description: 'Transferencia bancaria confirmada', amount: 2500000, date: '2024-01-14' },
    { id: 4, type: 'gasto', description: 'Pago de servicios públicos', amount: -320000, date: '2024-01-13' }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">¡Bienvenido de vuelta!</h1>
            <p className="text-blue-100">Aquí tienes un resumen de tu actividad contable</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Período actual</p>
            <p className="text-xl font-semibold">Enero 2024</p>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Ventas</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalVentas)}</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +12.5% vs mes anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Gastos</CardTitle>
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalGastos)}</div>
            <div className="flex items-center text-sm text-red-600 mt-1">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +8.2% vs mes anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Ingresos Bancarios</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(stats.ingresosBancarios)}</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +15.3% vs mes anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Utilidad Neta</CardTitle>
            <div className="p-2 bg-amber-100 rounded-lg">
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(stats.utilidadNeta)}</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +18.7% vs mes anterior
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions and recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Registrar Venta
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Gasto
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Confirmar Ingreso
            </Button>
          </CardContent>
        </Card>

        {/* Recent transactions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'venta' ? 'bg-green-100' :
                      transaction.type === 'gasto' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {transaction.type === 'venta' ? (
                        <TrendingUp className={`w-4 h-4 ${
                          transaction.type === 'venta' ? 'text-green-600' :
                          transaction.type === 'gasto' ? 'text-red-600' : 'text-blue-600'
                        }`} />
                      ) : transaction.type === 'gasto' ? (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      ) : (
                        <DollarSign className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{transaction.description}</p>
                      <p className="text-sm text-slate-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(Math.abs(transaction.amount))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}