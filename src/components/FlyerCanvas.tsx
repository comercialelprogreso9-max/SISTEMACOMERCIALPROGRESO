import React from 'react';
import { FlyerData } from '../types';
import { Search, Phone, Mail, MapPin, Star, Play } from 'lucide-react';

interface FlyerCanvasProps {
  data: FlyerData;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const FlyerCanvas: React.FC<FlyerCanvasProps> = ({ data, canvasRef, className = '' }) => {
  return (
    <div
      ref={canvasRef}
      id="flyer-poster-canvas"
      className={`relative w-[800px] h-[1060px] bg-[#070e20] text-white overflow-hidden font-sans select-none flex flex-col justify-between p-8 shrink-0 ${className}`}
      style={{
        background: 'radial-gradient(ellipse at 75% 20%, #0d224d 0%, #070e20 60%, #040711 100%)',
      }}
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-[20%] right-[10%] w-[420px] h-[420px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER BAR */}
      <div className="relative z-10 flex items-start justify-between w-full">
        {/* Left Search Pill */}
        <div className="flex items-center justify-between border-2 border-slate-200/90 rounded-full px-6 py-2.5 min-w-[340px] bg-[#070e20]/60 backdrop-blur-sm shadow-md">
          <span className="font-extrabold text-lg tracking-wider text-white">
            COMERCIAL EL PROGRESO
          </span>
          <Search className="w-6 h-6 text-white stroke-[2.5]" />
        </div>

        {/* Right Logo Stamp Badge */}
        <div className="w-[230px] rounded-2xl bg-gradient-to-b from-[#0e214d] via-[#091536] to-[#050b1f] border border-cyan-500/40 p-3 text-center shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#00d2ff_1px,transparent_1px)] [background-size:12px_12px] opacity-20 pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-white font-black text-sm tracking-wide uppercase leading-tight drop-shadow-sm">
              COMERCIAL <br />
              <span className="text-cyan-300">"EL PROGRESO"</span>
            </h2>
            <p className="text-[10px] text-slate-300 mt-1 font-medium leading-tight">
              Venta de Computadoras, Accesorios y Servicio Técnico
            </p>
            <p className="text-[9px] text-cyan-400 font-bold mt-1 tracking-wider uppercase">
              {data.logoSubtitulo || 'Especializado en Tecnología'}
            </p>

            {/* Phone Pill */}
            <div className="mt-2 inline-flex items-center justify-center gap-1.5 bg-[#0a3120] border border-emerald-500/60 rounded-full px-3 py-1 text-[11px] font-bold text-emerald-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{data.telefono.replace('+505 ', '')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER CONTENT GRID */}
      <div className="relative z-10 grid grid-cols-12 gap-4 my-auto items-center">
        
        {/* LEFT COLUMN: TITLE & SPECS */}
        <div className="col-span-6 flex flex-col justify-center space-y-6 pl-2">
          {/* Main Title */}
          <div className="space-y-0.5">
            <h1 className="text-[52px] font-black uppercase text-white tracking-tight leading-[1.05] drop-shadow-md">
              {data.titleLine1 || 'MACBOOK'}
            </h1>
            <h1 className="text-[52px] font-black uppercase text-white tracking-tight leading-[1.05] drop-shadow-md">
              {data.titleLine2 || 'PRO 15'}
            </h1>
            <h2 className="text-[36px] font-bold text-slate-100 tracking-normal leading-tight mt-1">
              {data.titleLine3 || 'i7 Intel Core'}
            </h2>
          </div>

          {/* Specs List with Star Icons & Cyan Play Circle Accent */}
          <div className="flex items-center justify-between pr-4 pt-2">
            <div className="space-y-3">
              {data.spec1 && (
                <div className="flex items-center gap-3 text-2xl font-bold text-white">
                  <Star className="w-7 h-7 text-yellow-400 fill-yellow-400 shrink-0 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                  <span>{data.spec1}</span>
                </div>
              )}
              {data.spec2 && (
                <div className="flex items-center gap-3 text-2xl font-bold text-white">
                  <Star className="w-7 h-7 text-yellow-400 fill-yellow-400 shrink-0 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                  <span>{data.spec2}</span>
                </div>
              )}
              {data.spec3 && (
                <div className="flex items-center gap-3 text-2xl font-bold text-white">
                  <Star className="w-7 h-7 text-yellow-400 fill-yellow-400 shrink-0 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                  <span>{data.spec3}</span>
                </div>
              )}
              {data.specExtra && data.specExtra.map((extra, idx) => (
                <div key={idx} className="flex items-center gap-3 text-2xl font-bold text-white">
                  <Star className="w-7 h-7 text-yellow-400 fill-yellow-400 shrink-0 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                  <span>{extra}</span>
                </div>
              ))}
            </div>

            {/* Cyan Play Button Accent */}
            <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,210,255,0.7)] shrink-0 self-center">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* Price Tag Box */}
          <div className="pt-4">
            <div className="inline-flex items-center bg-[#213269] border border-indigo-400/40 rounded-xl overflow-hidden shadow-lg">
              <div className="px-5 py-3 text-slate-200 text-sm font-semibold leading-tight border-r border-indigo-400/30">
                Precio <br /> Dolares
              </div>
              <div className="px-6 py-2.5 text-[44px] font-black text-white tracking-tight flex items-baseline gap-1">
                <span className="text-2xl font-bold">$</span>
                <span>{data.precio}</span>
              </div>
            </div>
          </div>

          {/* Address Box */}
          <div className="w-[340px] border-2 border-white/90 rounded-2xl p-3.5 bg-slate-900/40 backdrop-blur-sm shadow-md">
            <p className="text-white font-semibold text-center text-[13px] leading-snug">
              Visítanos en {data.direccion}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: LAPTOP IMAGE & GUARANTEE SEAL */}
        <div className="col-span-6 flex flex-col items-center justify-center relative min-h-[460px]">
          {/* Laptop Image */}
          <div className="relative w-full max-w-[420px] h-[340px] flex items-center justify-center">
            <img
              src={data.imagenUrl}
              alt="Laptop"
              className="max-h-[320px] max-w-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Bottom Right Area: Starburst Guarantee Seal & Condition Tag */}
          <div className="w-full flex items-center justify-end gap-4 pr-2 mt-4">
            {/* Guarantee Seal Badge */}
            <div className="relative flex items-center justify-center shrink-0">
              {/* Starburst SVG Shape */}
              <div className="w-[125px] h-[125px] relative flex items-center justify-center filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]">
                <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400 fill-current">
                  <path d="M50 0 L56 12 L69 4 L71 18 L85 15 L82 29 L96 32 L89 45 L100 50 L89 55 L96 68 L82 71 L85 85 L71 82 L69 96 L56 88 L50 100 L44 88 L31 96 L29 82 L15 85 L18 71 L4 68 L11 55 L0 50 L11 45 L4 32 L18 29 L15 15 L29 18 L31 4 L44 12 Z" />
                </svg>
                {/* Inner Circle Content */}
                <div className="absolute inset-2.5 rounded-full bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 border-2 border-dashed border-amber-600 flex flex-col items-center justify-center text-center p-1 shadow-inner">
                  <span className="text-[34px] font-black text-slate-900 leading-none tracking-tight">
                    {data.garantiaMeses}
                  </span>
                  <span className="text-[9px] font-black text-slate-900 tracking-wider uppercase leading-tight mt-0.5">
                    MESES DE <br /> GARANTIA
                  </span>
                </div>
              </div>
            </div>

            {/* Condition Label */}
            <div className="flex flex-col items-start justify-center">
              <span className="text-[28px] font-black text-[#00e5ff] tracking-wider uppercase drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]">
                {data.condicion || 'SEMI NUEVO'}
              </span>
              <div className="w-full h-1 bg-[#00e5ff] rounded-full shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER CONTACT BANNER */}
      <div className="relative z-10 w-full mt-auto pt-4">
        <div className="w-full bg-[#0d233e]/90 border border-cyan-400/40 rounded-full py-3.5 px-8 flex items-center justify-around shadow-[0_0_20px_rgba(0,229,255,0.15)] backdrop-blur-md">
          {/* Phone Cotiza */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white text-[#0d233e] flex items-center justify-center shrink-0 shadow-md">
              <Phone className="w-5 h-5 fill-current stroke-none" />
            </div>
            <div>
              <p className="text-[11px] text-cyan-200 font-medium">Cotiza al</p>
              <p className="text-lg font-black text-white tracking-wide">{data.telefono}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-9 w-[1.5px] bg-cyan-400/40" />

          {/* Email Cotiza */}
          <div className="flex items-center gap-3">
            <div>
              <p className="text-[11px] text-cyan-200 font-medium text-right">Cotiza en</p>
              <p className="text-base font-bold text-white tracking-tight">{data.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
