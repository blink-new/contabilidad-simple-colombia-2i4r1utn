import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Filter, Edit, Trash2, Receipt } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Gasto {
  id: string
  fecha: string
  proveedor: string
  descripcion: string
  categoria: string
  monto: number
  iva: number
  total: number
  deducible: boolean
  comprobante: boolean
}

const categorias = [
  'Suministros de oficina',
  'Servicios públicos',
  'Transporte',
  'Alimentación',
  'Tecnología',
  'Marketing',
  'Capacitación',
  'Mantenimiento',
  'Otros'
]

export default function Gastos() {
  const { toast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data - will be replaced with real data later
  const [gastos, setGastos] = useState<Gasto[]>([
    {
      id: '1',
      fecha: '2024-01-14',
      proveedor: 'Papelería Central',
      descripcion: 'Compra de suministros de oficina',
      categoria: 'Suministros de oficina',
      monto: 378000,
      iva: 72000,
      total: 450000,
      deducible: true,
      comprobante: true
    },
    {
      id: '2',
      fecha: '2024-01-13',
      proveedor: 'EPM',
      descripcion: 'Pago de servicios públicos - Enero',
      categoria: 'Servicios públicos',
      monto: 269000,
      iva: 51000,
      total: 320000,
      deducible: true,
      comprobante: true
    }
  ])

  const [formData, setFormData] = useState({
    fecha: '',
    proveedor: '',
    descripcion: '',
    categoria: '',
    monto: '',
    iva: '',
    deducible: true,
    comprobante: false
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
    const iva = parseFloat(formData.iva)
    const total = monto + iva

    const newGasto: Gasto = {
      id: Date.now().toString(),
      fecha: formData.fecha,
      proveedor: formData.proveedor,
      descripcion: formData.descripcion,
      categoria: formData.categoria,
      monto,
      iva,
      total,
      deducible: formData.deducible,
      comprobante: formData.comprobante
    }

    setGastos([newGasto, ...gastos])
    setFormData({
      fecha: '',
      proveedor: '',
      descripcion: '',
      categoria: '',
      monto: '',
      iva: '',
      deducible: true,
      comprobante: false
    })
    setShowForm(false)
    
    toast({
      title: "Gasto registrado",
      description: "El gasto ha sido registrado exitosamente.",
    })
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Auto-calculate IVA when monto changes
    if (field === 'monto' && typeof value === 'string' && value) {
      const monto = parseFloat(value)
      const iva = monto * 0.19 // 19% IVA
      setFormData(prev => ({ ...prev, iva: iva.toString() }))
    }
  }

  const filteredGastos = gastos.filter(gasto =>
    gasto.proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gasto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gasto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gastos</h1>
          <p className="text-slate-600">Registra y controla todos tus gastos empresariales</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Gasto
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Registrar Nuevo Gasto</CardTitle>
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
                  <Label htmlFor="proveedor">Proveedor</Label>
                  <Input
                    id="proveedor"
                    placeholder="Nombre del proveedor"
                    value={formData.proveedor}
                    onChange={(e) => handleInputChange('proveedor', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Descripción del gasto"
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange('descripcion', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="categoria">Categoría</Label>
                  <Select value={formData.categoria} onValueChange={(value) => handleInputChange('categoria', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="deducible"
                    checked={formData.deducible}
                    onChange={(e) => handleInputChange('deducible', e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  <Label htmlFor="deducible">Gasto deducible</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="comprobante"
                    checked={formData.comprobante}
                    onChange={(e) => handleInputChange('comprobante', e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  <Label htmlFor="comprobante">Tengo comprobante</Label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Guardar Gasto
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
                  placeholder="Buscar por proveedor, descripción o categoría..."
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
          <CardTitle>Lista de Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead className="text-right">IVA</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGastos.map((gasto) => (
                <TableRow key={gasto.id}>
                  <TableCell>{gasto.fecha}</TableCell>
                  <TableCell className="font-medium">{gasto.proveedor}</TableCell>
                  <TableCell>{gasto.descripcion}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{gasto.categoria}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(gasto.monto)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(gasto.iva)}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(gasto.total)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {gasto.deducible && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                          Deducible
                        </Badge>
                      )}
                      {gasto.comprobante && (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
                          <Receipt className="w-3 h-3 mr-1" />
                          Comprobante
                        </Badge>
                      )}
                    </div>
                  </TableCell>
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