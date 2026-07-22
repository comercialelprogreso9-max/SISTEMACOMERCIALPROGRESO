import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { GeneradorFlyer } from './components/GeneradorFlyer';
import { ComprobanteEntrega } from './components/ComprobanteEntrega';
import { FacturacionVentas } from './components/FacturacionVentas';

export default function App() {
  const [activeTab, setActiveTab] = useState<'flyer' | 'entrega' | 'venta'>('flyer');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Workspace Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'flyer' && <GeneradorFlyer />}
        {activeTab === 'entrega' && <ComprobanteEntrega />}
        {activeTab === 'venta' && <FacturacionVentas />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-indigo-950/80 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-bold text-slate-300">
            COMERCIAL "EL PROGRESO" · Especializados en Tecnología
          </p>
          <p>
            Teléfono: +505 81295540 · Colegio San Francisco de Asís ½ Cuadra al Norte, Matagalpa, Nicaragua
          </p>
          <p className="text-[10px] text-slate-400 pt-2">
            © {new Date().getFullYear()} Comercial El Progreso. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
