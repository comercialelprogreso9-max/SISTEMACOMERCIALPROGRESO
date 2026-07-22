import React, { useState } from 'react';
import { DeliveryNote, DeliveryItem } from '../types';
import { generateDeliveryNotePDF } from '../utils/pdfGenerator';
import { Plus, Trash2, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const ComprobanteEntrega: React.FC = () => {
  const [numero, setNumero] = useState('001-2026');
  const [fecha, setFecha] = useState(() => new Date().toISOString().split('T')[0]);
  const [cliente, setCliente] = useState('');
  const [items, setItems] = useState<DeliveryItem[]>([
    { id: '1', codigo: 'LAP-001', cantidad: 1, concepto: 'Laptop MacBook Pro 15 i7 - Semi Nueva' },
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
      { id: Date.now().toString(), codigo: '', cantidad: 1, concepto: '' },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) {
      showErr('⚠️ Debe quedar al menos una fila de producto.');
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof DeliveryItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleGeneratePDF = () => {
    if (!numero.trim() || !fecha.trim() || !cliente.trim()) {
      showErr('⚠️ Por favor complete el número, fecha y nombre de cliente.');
      return;
    }

    const invalidItems = items.some((it) => !it.codigo.trim() || !it.concepto.trim() || it.cantidad <= 0);
    if (invalidItems) {
      showErr('⚠️ Complete todos los campos de la tabla de productos.');
      return;
    }

    const note: DeliveryNote = {
      numero,
      fecha,
      cliente,
      items,
    };

    generateDeliveryNotePDF(note);
    showToast('✅ Comprobante de Entrega PDF generado correctamente');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Toast Alert */}
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
            <h2 className="text-2xl font-black text-indigo-950 flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-600" />
              <span>Comprobante de Entrega</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Registro formal de entrega de equipos, laptops y accesorios a clientes.
            </p>
          </div>
        </div>

        {/* Top Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Número de Entrega <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="Ej: 001-2026"
              className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-bold text-slate-800 text-sm focus:border-indigo-600 outline-none"
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
              className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-medium text-slate-800 text-sm focus:border-indigo-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Cliente / Empresa <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Nombre del cliente"
              className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-bold text-slate-800 text-sm focus:border-indigo-600 outline-none"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase text-slate-700">Productos Entregados</h3>
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
              <thead className="bg-indigo-950 text-white font-bold uppercase">
                <tr>
                  <th className="p-3 w-1/4">Código *</th>
                  <th className="p-3 w-1/6 text-center">Cant *</th>
                  <th className="p-3 w-1/2">Concepto / Descripción *</th>
                  <th className="p-3 text-center">Acción</th>
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
                        placeholder="Ej: LAP-001"
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
                        value={item.concepto}
                        onChange={(e) => handleItemChange(item.id, 'concepto', e.target.value)}
                        placeholder="Descripción del producto entregado"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium"
                      />
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

        {/* Signatures Preview Box */}
        <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200 text-center">
          <div className="space-y-1">
            <div className="h-12 border-b-2 border-indigo-950 w-3/4 mx-auto" />
            <p className="text-xs font-black text-indigo-950 uppercase pt-1">Entregó Conforme</p>
            <p className="text-[10px] text-slate-500">Comercial El Progreso</p>
          </div>
          <div className="space-y-1">
            <div className="h-12 border-b-2 border-indigo-950 w-3/4 mx-auto" />
            <p className="text-xs font-black text-indigo-950 uppercase pt-1">Recibió Conforme</p>
            <p className="text-[10px] text-slate-500">Firma y Nombre del Cliente</p>
          </div>
        </div>

        {/* Generate PDF Button */}
        <div className="pt-4">
          <button
            onClick={handleGeneratePDF}
            className="w-full py-4 bg-indigo-950 hover:bg-indigo-900 text-white font-black text-sm rounded-xl shadow-xl flex items-center justify-center gap-2 transition"
          >
            <FileText className="w-5 h-5" />
            <span>Generar Comprobante PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
