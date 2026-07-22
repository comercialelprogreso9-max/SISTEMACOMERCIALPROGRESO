import React from 'react';
import { FileText, Receipt, Image as ImageIcon, Phone, MapPin } from 'lucide-react';

interface NavbarProps {
  activeTab: 'flyer' | 'entrega' | 'venta';
  setActiveTab: (tab: 'flyer' | 'entrega' | 'venta') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-[#0b1836] text-white border-b border-indigo-900/60 shadow-xl">
      {/* Top Info Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-indigo-950">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-800 border-2 border-cyan-400 flex items-center justify-center font-black text-xl shadow-md">
            EP
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tight text-white flex items-center gap-2">
              COMERCIAL <span className="text-cyan-400">"EL PROGRESO"</span>
            </h1>
            <p className="text-xs text-slate-300 font-medium">
              Venta de Computadoras, Accesorios y Servicio Técnico
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-300 font-medium">
          <div className="flex items-center gap-1.5 bg-indigo-950/70 border border-indigo-800/60 px-3 py-1.5 rounded-full">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>+505 81295540</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-indigo-950/70 border border-indigo-800/60 px-3 py-1.5 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>Matagalpa, Nicaragua</span>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex gap-2 py-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('flyer')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all shadow-sm ${
              activeTab === 'flyer'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/20 shadow-lg scale-[1.02]'
                : 'bg-indigo-950/50 text-slate-300 hover:bg-indigo-900/60 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>📱 Generador de Flyer (Diseño Oficial)</span>
          </button>

          <button
            onClick={() => setActiveTab('entrega')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all shadow-sm ${
              activeTab === 'entrega'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-indigo-500/20 shadow-lg scale-[1.02]'
                : 'bg-indigo-950/50 text-slate-300 hover:bg-indigo-900/60 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>📋 Comprobante de Entrega</span>
          </button>

          <button
            onClick={() => setActiveTab('venta')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all shadow-sm ${
              activeTab === 'venta'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-emerald-500/20 shadow-lg scale-[1.02]'
                : 'bg-indigo-950/50 text-slate-300 hover:bg-indigo-900/60 hover:text-white'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>🧾 Facturación / Ventas</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
