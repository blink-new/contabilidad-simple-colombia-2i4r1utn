import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  FileText,
  BarChart3,
  PieChart
} from 'lucide-react'

export default function Reportes() {
  const [selectedPeriod, setSelectedPeriod] = useState('mes-actual')
  const [selectedReport, setSelectedReport] = useState('resumen-general')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Mock data - will be replaced with real data later
  const resumenGeneral = {
    totalVentas: 15420000,
    totalGastos: 8750000,
    totalIngresos: 14200000,
    utilidadBruta: 6670000,
    ivaVentas: 2929800,
    ivaGastos: 1662500,
    ivaAPagar: 1267300
  }

  const ventasPorCategoria = [
    { categoria: 'Servicios de consultoría', monto: 8500000, porcentaje: 55.1 },
    { categoria: 'Desarrollo de software', monto: 4200000, porcentaje: 27.2 },
    { categoria: 'Capacitación', monto: 1800000, porcentaje: 11.7 },
    { categoria: 'Otros servicios', monto: 920000, porcentaje: 6.0 }
  ]

  const gastosPorCategoria = [
    { categoria: 'Suministros de oficina', monto: 2100000, porcentaje: 24.0 },
    { categoria: 'Servicios públicos', monto: 1800000, porcentaje: 20.6 },
    { categoria: 'Tecnología', monto: 1500000, porcentaje: 17.1 },
    { categoria: 'Transporte', monto: 1200000, porcentaje: 13.7 },
    { categoria: 'Marketing', monto: 950000, porcentaje: 10.9 },
    { categoria: 'Otros', monto: 1200000, porcentaje: 13.7 }
  ]

  const reportesMensuales = [
    { mes: 'Enero 2024', ventas: 15420000, gastos: 8750000, utilidad: 6670000 },
    { mes: 'Diciembre 2023', ventas: 13800000, gastos: 7900000, utilidad: 5900000 },
    { mes: 'Noviembre 2023', ventas: 12500000, gastos: 7200000, utilidad: 5300000 },
    { mes: 'Octubre 2023', ventas: 14200000, gastos: 8100000, utilidad: 6100000 }
  ]

  const handleExportReport = () => {
    // This would generate and download the actual report
    console.log('Exporting report:', selectedReport, 'for period:', selectedPeriod)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reportes</h1>
          <p className="text-slate-600">Genera reportes detallados de tu actividad contable</p>
        </div>
        <Button onClick={handleExportReport} className="bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          Exportar Reporte
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Configuración de Reportes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="report-type">Tipo de Reporte</Label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resumen-general">Resumen General</SelectItem>
                  <SelectItem value="ventas-detallado">Ventas Detallado</SelectItem>
                  <SelectItem value="gastos-detallado">Gastos Detallado</SelectItem>
                  <SelectItem value="ingresos-bancarios">Ingresos Bancarios</SelectItem>
                  <SelectItem value="declaracion-iva">Declaración IVA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="period">Período</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mes-actual">Mes Actual</SelectItem>
                  <SelectItem value="mes-anterior">Mes Anterior</SelectItem>
                  <SelectItem value="trimestre-actual">Trimestre Actual</SelectItem>
                  <SelectItem value="año-actual">Año Actual</SelectItem>
                  <SelectItem value="personalizado">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedPeriod === 'personalizado' && (
              <>
                <div>
                  <Label htmlFor="fecha-inicio">Fecha Inicio</Label>
                  <Input
                    id="fecha-inicio"
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="fecha-fin">Fecha Fin</Label>
                  <Input
                    id="fecha-fin"
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Ventas</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(resumenGeneral.totalVentas)}</div>
            <p className="text-xs text-slate-500 mt-1">Enero 2024</p>
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
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(resumenGeneral.totalGastos)}</div>
            <p className="text-xs text-slate-500 mt-1">Enero 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Utilidad Bruta</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(resumenGeneral.utilidadBruta)}</div>
            <p className="text-xs text-slate-500 mt-1">Enero 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">IVA a Pagar</CardTitle>
            <div className="p-2 bg-amber-100 rounded-lg">
              <FileText className="w-4 h-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(resumenGeneral.ivaAPagar)}</div>
            <p className="text-xs text-slate-500 mt-1">Enero 2024</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and detailed reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ventas por categoría */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Ventas por Categoría
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ventasPorCategoria.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
                    }`}></div>
                    <span className="text-sm font-medium">{item.categoria}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{formatCurrency(item.monto)}</div>
                    <div className="text-xs text-slate-500">{item.porcentaje}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gastos por categoría */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Gastos por Categoría
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gastosPorCategoria.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-red-500' :
                      index === 1 ? 'bg-orange-500' :
                      index === 2 ? 'bg-pink-500' :
                      index === 3 ? 'bg-indigo-500' :
                      index === 4 ? 'bg-teal-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="text-sm font-medium">{item.categoria}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{formatCurrency(item.monto)}</div>
                    <div className="text-xs text-slate-500">{item.porcentaje}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly reports table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Resumen Mensual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Período</TableHead>
                <TableHead className="text-right">Ventas</TableHead>
                <TableHead className="text-right">Gastos</TableHead>
                <TableHead className="text-right">Utilidad</TableHead>
                <TableHead className="text-right">Margen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportesMensuales.map((reporte, index) => {
                const margen = ((reporte.utilidad / reporte.ventas) * 100).toFixed(1)
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{reporte.mes}</TableCell>
                    <TableCell className="text-right">{formatCurrency(reporte.ventas)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(reporte.gastos)}</TableCell>
                    <TableCell className="text-right font-semibold text-green-600">
                      {formatCurrency(reporte.utilidad)}
                    </TableCell>
                    <TableCell className="text-right">{margen}%</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}