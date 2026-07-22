import React, { useState } from 'react';
import { Invoice, InvoiceItem } from '../types';
import { generateInvoicePDF } from '../utils/pdfGenerator';
import { Plus, Trash2, Receipt, CheckCircle2, AlertCircle, DollarSign } from 'lucide-react';

export const FacturacionVentas: React.FC = () => {
  const [numero, setNumero] = useState('0000076');
  const [fecha, setFecha] = useState(() => new Date().toISOString().split('T')[0]);
  const [cliente, setCliente] = useState('');
  const [direccion, setDireccion] = useState('Matagalpa, Nicaragua');
  const [metodoPago, setMetodoPago] = useState<'Efectivo' | 'Transferencia'>('Efectivo');
  const [moneda, setMoneda] = useState<'Córdobas' | 'Dólares'>('Dólares');
  const [observacion, setObservacion] = useState('');

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      codigo: 'MAC-15',
      cantidad: 1,
      descripcion: 'MacBook Pro 15 i7 - 32GB RAM / 500GB SSD',
      precioUnitario: 500,
      total: 500,
    },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const showErr = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 4000);
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), codigo: '', cantidad: 1, descripcion: '', precioUnitario: 0, total: 0 },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) {
      showErr('⚠️ Debe quedar al menos una fila de producto.');
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === 'cantidad' || field === 'precioUnitario') {
            const qty = field === 'cantidad' ? parseFloat(value) || 0 : item.cantidad;
            const price = field === 'precioUnitario' ? parseFloat(value) || 0 : item.precioUnitario;
            updated.total = qty * price;
          }
          return updated;
        }
        return item;
      })
    );
  };

  const totalGeneral = items.reduce((sum, item) => sum + (item.total || 0), 0);
  const symbol = moneda === 'Córdobas' ? 'C$' : '$';

  const handleGeneratePDF = () => {
    if (!numero.trim() || !fecha.trim() || !cliente.trim()) {
      showErr('⚠️ Por favor complete el número, fecha y cliente.');
      return;
    }

    const invalidItems = items.some(
      (it) => !it.codigo.trim() || !it.descripcion.trim() || it.cantidad <= 0 || it.precioUnitario < 0
    );
    if (invalidItems) {
      showErr('⚠️ Complete todos los campos de los productos en la factura.');
      return;
    }

    const invoice: Invoice = {
      numero,
      fecha,
      cliente,
      direccion,
      metodoPago,
      moneda,
      observacion,
      items,
      totalGeneral,
    };

    generateInvoicePDF(invoice);
    showToast('✅ Factura PDF generada correctamente');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Toast Alerts */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="fixed top-20 right-6 z-50 bg-rose-600 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200 space-y-6">
        <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-emerald-950 flex items-center gap-2">
              <Receipt className="w-6 h-6 text-emerald-600" />
              <span>Facturación / Ventas</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Emisión de comprobantes de venta y facturas oficiales para Comercial El Progreso.
            </p>
          </div>
        </div>

        {/* Invoice Info Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Nº Factura <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="Ej: 0000076"
              className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-bold text-slate-800 text-sm focus:border-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Fecha <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-medium text-slate-800 text-sm focus:border-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Cliente <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Nombre del cliente"
              className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-bold text-slate-800 text-sm focus:border-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Dirección del cliente"
              className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-medium text-slate-800 text-sm focus:border-emerald-600 outline-none"
            />
          </div>
        </div>

        {/* Payment & Currency Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
          <div>
            <label className="block text-xs font-bold uppercase text-emerald-900 mb-1">
              Método de Pago
            </label>
            <select
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value as any)}
              className="w-full px-3.5 py-2 border-2 border-emerald-200 rounded-xl font-bold text-slate-800 text-sm focus:border-emerald-600 outline-none bg-white"
            >
              <option value="Efectivo">💰 Efectivo</option>
              <option value="Transferencia">🏦 Transferencia Bancaria</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-emerald-900 mb-1">
              Moneda
            </label>
            <select
              value={moneda}
              onChange={(e) => setMoneda(e.target.value as any)}
              className="w-full px-3.5 py-2 border-2 border-emerald-200 rounded-xl font-bold text-slate-800 text-sm focus:border-emerald-600 outline-none bg-white"
            >
              <option value="Dólares">$ Dólares</option>
              <option value="Córdobas">C$ Córdobas</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-emerald-900 mb-1">
              Observación / Referencia
            </label>
            <input
              type="text"
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Ej: Nº Transf. 98412"
              className="w-full px-3.5 py-2 border-2 border-emerald-200 rounded-xl font-medium text-slate-800 text-sm focus:border-emerald-600 outline-none bg-white"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase text-slate-700">Detalle de Factura</h3>
            <button
              onClick={handleAddItem}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Producto</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-emerald-950 text-white font-bold uppercase">
                <tr>
                  <th className="p-3 w-1/5">Código *</th>
                  <th className="p-3 w-16 text-center">Cant *</th>
                  <th className="p-3">Descripción *</th>
                  <th className="p-3 w-28 text-right">P. Unit ({symbol}) *</th>
                  <th className="p-3 w-28 text-right">Total ({symbol})</th>
                  <th className="p-3 text-center w-12">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-2">
                      <input
                        type="text"
                        value={item.codigo}
                        onChange={(e) => handleItemChange(item.id, 'codigo', e.target.value)}
                        placeholder="MAC-15"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="1"
                        value={item.cantidad}
                        onChange={(e) => handleItemChange(item.id, 'cantidad', parseInt(e.target.value) || 1)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-center"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={item.descripcion}
                        onChange={(e) => handleItemChange(item.id, 'descripcion', e.target.value)}
                        placeholder="Descripción del equipo o servicio"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.01"
                        value={item.precioUnitario}
                        onChange={(e) => handleItemChange(item.id, 'precioUnitario', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-right"
                      />
                    </td>
                    <td className="p-2 text-right font-black text-emerald-950 text-sm">
                      {symbol} {item.total.toFixed(2)}
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grand Total Box */}
        <div className="flex justify-end pt-2">
          <div className="bg-emerald-950 text-white rounded-2xl p-5 border-2 border-emerald-500/40 shadow-xl min-w-[280px] text-right">
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">TOTAL A PAGAR</p>
            <p className="text-3xl font-black text-white mt-1">
              {symbol} {totalGeneral.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Generate PDF Button */}
        <div className="pt-4">
          <button
            onClick={handleGeneratePDF}
            className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm rounded-xl shadow-xl flex items-center justify-center gap-2 transition"
          >
            <Receipt className="w-5 h-5" />
            <span>Generar Factura PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
