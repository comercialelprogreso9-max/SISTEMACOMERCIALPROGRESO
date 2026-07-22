import React, { useState, useRef } from 'react';
import { FlyerData } from '../types';
import { DEFAULT_FLYER_DATA, PRESET_FLYERS } from '../data/presets';
import { FlyerCanvas } from './FlyerCanvas';
import { downloadFlyerAsPng, downloadFlyerAsPdf } from '../utils/flyerExport';
import { Download, FileDown, Upload, Sparkles, RefreshCw, CheckCircle2, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

export const GeneradorFlyer: React.FC = () => {
  const [flyerData, setFlyerData] = useState<FlyerData>(DEFAULT_FLYER_DATA);
  const [extraSpecInput, setExtraSpecInput] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleInputChange = (field: keyof FlyerData, value: any) => {
    setFlyerData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleInputChange('imagenUrl', event.target.result as string);
          showToast('✅ Imagen de laptop cargada con éxito');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addExtraSpec = () => {
    if (!extraSpecInput.trim()) return;
    setFlyerData((prev) => ({
      ...prev,
      specExtra: [...(prev.specExtra || []), extraSpecInput.trim()],
    }));
    setExtraSpecInput('');
  };

  const removeExtraSpec = (index: number) => {
    setFlyerData((prev) => ({
      ...prev,
      specExtra: prev.specExtra.filter((_, i) => i !== index),
    }));
  };

  const loadPreset = (presetData: Partial<FlyerData>) => {
    setFlyerData((prev) => ({
      ...prev,
      ...presetData,
    }));
    showToast('✨ Plantilla cargada');
  };

  const resetToDefault = () => {
    setFlyerData(DEFAULT_FLYER_DATA);
    showToast('🔄 Restablecido al diseño oficial inicial');
  };

  const handleDownloadPng = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      await downloadFlyerAsPng(canvasRef.current, `Flyer_${flyerData.titleLine1}_${flyerData.titleLine2}.png`);
      showToast('🎉 Imagen PNG descargada con éxito');
    } catch (err) {
      console.error(err);
      showToast('⚠️ Error al generar la imagen PNG');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      await downloadFlyerAsPdf(canvasRef.current, `Flyer_${flyerData.titleLine1}_${flyerData.titleLine2}.pdf`);
      showToast('🎉 Flyer PDF descargado con éxito');
    } catch (err) {
      console.error(err);
      showToast('⚠️ Error al generar el PDF');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-indigo-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="bg-cyan-500/20 text-cyan-300 font-bold text-xs uppercase px-3 py-1 rounded-full border border-cyan-400/30">
            Diseño Oficial idéntico a la Muestra
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Generador de Flyer Publicitario</h2>
          <p className="text-sm text-slate-300 mt-1">
            Personaliza el título, especificaciones, precio e imagen para crear flyers promocionales en tiempo real.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={resetToDefault}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-2 transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Restablecer Muestra</span>
          </button>
        </div>
      </div>

      {/* Quick Presets Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
        <p className="text-xs font-bold uppercase text-slate-400 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Cargar Plantilla Rápida de Laptop:</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESET_FLYERS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => loadPreset(preset.data)}
              className="bg-indigo-950/80 hover:bg-indigo-900 text-cyan-300 border border-indigo-800/80 hover:border-cyan-400 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: FORM CONTROLS */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-xl border border-slate-200 space-y-6">
          <h3 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
            <span>⚙️ Configuración del Producto</span>
          </h3>

          {/* Product Name Lines */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase text-slate-700">
              Título del Producto (Líneas 1, 2, 3)
            </label>
            <div className="grid grid-cols-1 gap-2">
              <input
                type="text"
                value={flyerData.titleLine1}
                onChange={(e) => handleInputChange('titleLine1', e.target.value)}
                placeholder="Línea 1 (ej: MACBOOK)"
                className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-800 focus:border-indigo-600 outline-none"
              />
              <input
                type="text"
                value={flyerData.titleLine2}
                onChange={(e) => handleInputChange('titleLine2', e.target.value)}
                placeholder="Línea 2 (ej: PRO 15)"
                className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-800 focus:border-indigo-600 outline-none"
              />
              <input
                type="text"
                value={flyerData.titleLine3}
                onChange={(e) => handleInputChange('titleLine3', e.target.value)}
                placeholder="Línea 3 (ej: i7 Intel Core)"
                className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-800 focus:border-indigo-600 outline-none"
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase text-slate-700">
              Especificaciones Principales (con icono ⭐)
            </label>
            <div className="space-y-2">
              <input
                type="text"
                value={flyerData.spec1}
                onChange={(e) => handleInputChange('spec1', e.target.value)}
                placeholder="Especificación 1 (ej: 32 RAM)"
                className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-semibold text-sm text-slate-800 focus:border-indigo-600 outline-none"
              />
              <input
                type="text"
                value={flyerData.spec2}
                onChange={(e) => handleInputChange('spec2', e.target.value)}
                placeholder="Especificación 2 (ej: 500 SSD)"
                className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-semibold text-sm text-slate-800 focus:border-indigo-600 outline-none"
              />
              <input
                type="text"
                value={flyerData.spec3}
                onChange={(e) => handleInputChange('spec3', e.target.value)}
                placeholder="Especificación 3 (ej: macOS Sequoia)"
                className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-semibold text-sm text-slate-800 focus:border-indigo-600 outline-none"
              />

              {/* Extra specs list */}
              {flyerData.specExtra && flyerData.specExtra.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {flyerData.specExtra.map((extra, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="flex-1 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700">
                        ⭐ {extra}
                      </span>
                      <button
                        onClick={() => removeExtraSpec(idx)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Extra Spec */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={extraSpecInput}
                  onChange={(e) => setExtraSpecInput(e.target.value)}
                  placeholder="Agregar otra especificación..."
                  onKeyDown={(e) => e.key === 'Enter' && addExtraSpec()}
                  className="flex-1 px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 outline-none"
                />
                <button
                  onClick={addExtraSpec}
                  className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl flex items-center gap-1 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Price & Guarantee & Condition */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Precio ($ Dólares)
              </label>
              <input
                type="number"
                value={flyerData.precio}
                onChange={(e) => handleInputChange('precio', e.target.value)}
                placeholder="500"
                className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-black text-slate-900 focus:border-indigo-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Meses de Garantía
              </label>
              <input
                type="text"
                value={flyerData.garantiaMeses}
                onChange={(e) => handleInputChange('garantiaMeses', e.target.value)}
                placeholder="3"
                className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-black text-slate-900 focus:border-indigo-600 outline-none"
              />
            </div>
          </div>

          {/* Condition Tag */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Etiqueta de Estado / Condición
            </label>
            <input
              type="text"
              value={flyerData.condicion}
              onChange={(e) => handleInputChange('condicion', e.target.value)}
              placeholder="SEMI NUEVO"
              className="w-full px-3.5 py-2 border-2 border-slate-200 rounded-xl font-bold text-slate-800 focus:border-indigo-600 outline-none"
            />
          </div>

          {/* Image Upload / URL */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-slate-700">
              Imagen de la Laptop
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 border-2 border-dashed border-indigo-300 hover:border-indigo-500 rounded-xl cursor-pointer text-indigo-700 font-bold text-xs transition">
                <Upload className="w-4 h-4" />
                <span>Subir Imagen de Laptop desde Archivo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <input
                type="text"
                value={flyerData.imagenUrl}
                onChange={(e) => handleInputChange('imagenUrl', e.target.value)}
                placeholder="O pega URL de imagen (https://...)"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs text-slate-700 outline-none"
              />
            </div>
          </div>

          {/* Address & Contact */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                value={flyerData.direccion}
                onChange={(e) => handleInputChange('direccion', e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  value={flyerData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="text"
                  value={flyerData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Export Action Buttons */}
          <div className="pt-4 space-y-2">
            <button
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              <span>{isExporting ? 'Procesando Imagen...' : 'Descargar Imagen PNG (Alta Calidad)'}</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <FileDown className="w-4 h-4" />
              <span>Descargar Flyer en PDF</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE CANVAS PREVIEW */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-800">
          <div className="w-full flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase text-cyan-400 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span>Vista Previa en Tiempo Real (Diseño Muestra 1)</span>
            </span>
            <span className="text-xs text-slate-400">Dimensiones: 800x1060px</span>
          </div>

          {/* Scaled Preview Wrapper */}
          <div className="w-full overflow-auto flex justify-center py-2">
            <div className="transform scale-[0.68] sm:scale-[0.8] md:scale-[0.9] lg:scale-[0.72] xl:scale-[0.85] origin-top my-0">
              <FlyerCanvas data={flyerData} canvasRef={canvasRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
