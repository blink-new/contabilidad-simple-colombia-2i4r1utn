import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Venta {
  id: string
  fecha: string
  cliente: string
  descripcion: string
  subtotal: number
  iva: number
  total: number
  estado: 'pagada' | 'pendiente' | 'vencida'
}

export default function Ventas() {
  const { toast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data - will be replaced with real data later
  const [ventas, setVentas] = useState<Venta[]>([
    {
      id: '1',
      fecha: '2024-01-15',
      cliente: 'Empresa ABC SAS',
      descripcion: 'Servicios de consultoría empresarial',
      subtotal: 2100000,
      iva: 399000,
      total: 2499000,
      estado: 'pagada'
    },
    {
      id: '2',
      fecha: '2024-01-14',
      cliente: 'Comercial XYZ Ltda',
      descripcion: 'Desarrollo de software personalizado',
      subtotal: 5000000,
      iva: 950000,
      total: 5950000,
      estado: 'pendiente'
    }
  ])

  const [formData, setFormData] = useState({
    fecha: '',
    cliente: '',
    descripcion: '',
    subtotal: '',
    iva: '',
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
    
    const subtotal = parseFloat(formData.subtotal)
    const iva = parseFloat(formData.iva)
    const total = subtotal + iva

    const newVenta: Venta = {
      id: Date.now().toString(),
      fecha: formData.fecha,
      cliente: formData.cliente,
      descripcion: formData.descripcion,
      subtotal,
      iva,
      total,
      estado: formData.estado as 'pagada' | 'pendiente' | 'vencida'
    }

    setVentas([newVenta, ...ventas])
    setFormData({
      fecha: '',
      cliente: '',
      descripcion: '',
      subtotal: '',
      iva: '',
      estado: 'pendiente'
    })
    setShowForm(false)
    
    toast({
      title: "Venta registrada",
      description: "La venta ha sido registrada exitosamente.",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Auto-calculate IVA when subtotal changes
    if (field === 'subtotal' && value) {
      const subtotal = parseFloat(value)
      const iva = subtotal * 0.19 // 19% IVA
      setFormData(prev => ({ ...prev, iva: iva.toString() }))
    }
  }

  const filteredVentas = ventas.filter(venta =>
    venta.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venta.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'pagada':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Pagada</Badge>
      case 'pendiente':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case 'vencida':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Vencida</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ventas</h1>
          <p className="text-slate-600">Registra y gestiona todas tus ventas</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Venta
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Registrar Nueva Venta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fecha">Fecha</Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => handleInputChange('fecha', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input
                    id="cliente"
                    placeholder="Nombre del cliente"
                    value={formData.cliente}
                    onChange={(e) => handleInputChange('cliente', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Descripción de la venta"
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange('descripcion', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="subtotal">Subtotal (COP)</Label>
                  <Input
                    id="subtotal"
                    type="number"
                    placeholder="0"
                    value={formData.subtotal}
                    onChange={(e) => handleInputChange('subtotal', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="iva">IVA (COP)</Label>
                  <Input
                    id="iva"
                    type="number"
                    placeholder="0"
                    value={formData.iva}
                    onChange={(e) => handleInputChange('iva', e.target.value)}
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
                      <SelectItem value="pagada">Pagada</SelectItem>
                      <SelectItem value="vencida">Vencida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Guardar Venta
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
                  placeholder="Buscar por cliente o descripción..."
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
          <CardTitle>Lista de Ventas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
                <TableHead className="text-right">IVA</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVentas.map((venta) => (
                <TableRow key={venta.id}>
                  <TableCell>{venta.fecha}</TableCell>
                  <TableCell className="font-medium">{venta.cliente}</TableCell>
                  <TableCell>{venta.descripcion}</TableCell>
                  <TableCell className="text-right">{formatCurrency(venta.subtotal)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(venta.iva)}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(venta.total)}</TableCell>
                  <TableCell>{getEstadoBadge(venta.estado)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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