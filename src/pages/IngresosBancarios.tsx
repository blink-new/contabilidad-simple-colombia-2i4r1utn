import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Filter, Edit, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface IngresoBancario {
  id: string
  fecha: string
  banco: string
  numeroCuenta: string
  monto: number
  concepto: string
  referencia: string
  estado: 'confirmado' | 'pendiente' | 'rechazado'
  fechaConfirmacion?: string
}

const bancos = [
  'Bancolombia',
  'Banco de Bogotá',
  'Davivienda',
  'BBVA Colombia',
  'Banco Popular',
  'Banco Caja Social',
  'Banco AV Villas',
  'Banco Falabella',
  'Nequi',
  'Daviplata',
  'Otros'
]

export default function IngresosBancarios() {
  const { toast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data - will be replaced with real data later
  const [ingresos, setIngresos] = useState<IngresoBancario[]>([
    {
      id: '1',
      fecha: '2024-01-15',
      banco: 'Bancolombia',
      numeroCuenta: '****-1234',
      monto: 2500000,
      concepto: 'Pago de factura - Cliente ABC',
      referencia: 'TRF-20240115-001',
      estado: 'confirmado',
      fechaConfirmacion: '2024-01-15'
    },
    {
      id: '2',
      fecha: '2024-01-14',
      banco: 'Davivienda',
      numeroCuenta: '****-5678',
      monto: 1800000,
      concepto: 'Transferencia por servicios',
      referencia: 'TRF-20240114-002',
      estado: 'pendiente'
    }
  ])

  const [formData, setFormData] = useState({
    fecha: '',
    banco: '',
    numeroCuenta: '',
    monto: '',
    concepto: '',
    referencia: '',
    estado: 'pendiente'
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const monto = parseFloat(formData.monto)

    const newIngreso: IngresoBancario = {
      id: Date.now().toString(),
      fecha: formData.fecha,
      banco: formData.banco,
      numeroCuenta: formData.numeroCuenta,
      monto,
      concepto: formData.concepto,
      referencia: formData.referencia,
      estado: formData.estado as 'confirmado' | 'pendiente' | 'rechazado',
      fechaConfirmacion: formData.estado === 'confirmado' ? formData.fecha : undefined
    }

    setIngresos([newIngreso, ...ingresos])
    setFormData({
      fecha: '',
      banco: '',
      numeroCuenta: '',
      monto: '',
      concepto: '',
      referencia: '',
      estado: 'pendiente'
    })
    setShowForm(false)
    
    toast({
      title: "Ingreso registrado",
      description: "El ingreso bancario ha sido registrado exitosamente.",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleConfirmarIngreso = (id: string) => {
    setIngresos(prev => prev.map(ingreso => 
      ingreso.id === id 
        ? { ...ingreso, estado: 'confirmado' as const, fechaConfirmacion: new Date().toISOString().split('T')[0] }
        : ingreso
    ))
    
    toast({
      title: "Ingreso confirmado",
      description: "El ingreso bancario ha sido confirmado exitosamente.",
    })
  }

  const filteredIngresos = ingresos.filter(ingreso =>
    ingreso.banco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ingreso.concepto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ingreso.referencia.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'confirmado':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmado
          </Badge>
        )
      case 'pendiente':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        )
      case 'rechazado':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            Rechazado
          </Badge>
        )
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ingresos Bancarios</h1>
          <p className="text-slate-600">Confirma y gestiona todos los ingresos a tus cuentas bancarias</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Ingreso
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Registrar Nuevo Ingreso Bancario</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fecha">Fecha del Ingreso</Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => handleInputChange('fecha', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="banco">Banco</Label>
                  <Select value={formData.banco} onValueChange={(value) => handleInputChange('banco', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar banco" />
                    </SelectTrigger>
                    <SelectContent>
                      {bancos.map((banco) => (
                        <SelectItem key={banco} value={banco}>
                          {banco}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numeroCuenta">Número de Cuenta</Label>
                  <Input
                    id="numeroCuenta"
                    placeholder="****-1234"
                    value={formData.numeroCuenta}
                    onChange={(e) => handleInputChange('numeroCuenta', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="monto">Monto (COP)</Label>
                  <Input
                    id="monto"
                    type="number"
                    placeholder="0"
                    value={formData.monto}
                    onChange={(e) => handleInputChange('monto', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="concepto">Concepto</Label>
                <Textarea
                  id="concepto"
                  placeholder="Descripción del ingreso"
                  value={formData.concepto}
                  onChange={(e) => handleInputChange('concepto', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="referencia">Referencia/Comprobante</Label>
                  <Input
                    id="referencia"
                    placeholder="TRF-20240115-001"
                    value={formData.referencia}
                    onChange={(e) => handleInputChange('referencia', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Select value={formData.estado} onValueChange={(value) => handleInputChange('estado', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="confirmado">Confirmado</SelectItem>
                      <SelectItem value="rechazado">Rechazado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Guardar Ingreso
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search and filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por banco, concepto o referencia..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Ingresos Bancarios</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Banco</TableHead>
                <TableHead>Cuenta</TableHead>
                <TableHead>Concepto</TableHead>
                <TableHead>Referencia</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIngresos.map((ingreso) => (
                <TableRow key={ingreso.id}>
                  <TableCell>{ingreso.fecha}</TableCell>
                  <TableCell className="font-medium">{ingreso.banco}</TableCell>
                  <TableCell>{ingreso.numeroCuenta}</TableCell>
                  <TableCell>{ingreso.concepto}</TableCell>
                  <TableCell className="font-mono text-sm">{ingreso.referencia}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(ingreso.monto)}</TableCell>
                  <TableCell>{getEstadoBadge(ingreso.estado)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {ingreso.estado === 'pendiente' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handleConfirmarIngreso(ingreso.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}