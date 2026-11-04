import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cvData } from '../data/cvData';
import { 
  Car, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldAlert, 
  Compass, 
  Sparkles,
  Zap,
  Navigation
} from 'lucide-react';

export const AvailabilityCard: React.FC = () => {
  const { lang } = useLanguage();
  const { personalInfo } = cvData;

  const availabilityFactors = [
    {
      icon: Clock,
      title: lang === 'es' ? 'Incorporación Inmediata' : 'Immediate Availability',
      badge: lang === 'es' ? 'Disponibilidad Total' : '100% Ready',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      description: lang === 'es'
        ? 'Sin compromisos contractuales vigentes ni periodo de preaviso requerido. Preparada para inicio inmediato tras la formalización de la contratación.'
        : 'No outstanding notice periods or pending contract obligations. Ready for immediate onboarding upon agreement.'
    },
    {
      icon: Car,
      title: lang === 'es' ? 'Carnet B2 y Vehículo Propio' : 'B2 Driving License & Private Vehicle',
      badge: lang === 'es' ? 'Autonomía Total' : 'Full Mobility',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      description: lang === 'es'
        ? 'Permiso de conducción B2 en vigor y disponibilidad de vehículo propio para traslados diarios a centros de trabajo, turnos rotativos o desplazamientos intercentros.'
        : 'Valid driving license B2 and private vehicle available for daily commutes, shift work, and inter-facility mobility.'
    },
    {
      icon: Navigation,
      title: lang === 'es' ? 'Ubicación Estratégica: Illescas' : 'Strategic Location: Illescas Hub',
      badge: lang === 'es' ? 'Corredor A-42 / Madrid Sur' : 'A-42 Hub / South Madrid',
      badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
      description: lang === 'es'
        ? 'Residencia en Illescas (Toledo), nudo neurálgico logístico e industrial con conexión directa con Madrid capital, Getafe, Parla, Pinto, Fuenlabrada y Toledo.'
        : 'Resident in Illescas, a prime logistics and business hub directly connected via A-42 / AP-41 to Madrid metro area and Toledo.'
    }
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Glow ambient */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-blue-600/5 to-violet-600/5 blur-3xl pointer-events-none -z-10" 
          aria-hidden="true" 
        />

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-[#050816]">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
                <Zap className="w-4 h-4" />
                <span>05. {lang === 'es' ? 'Disponibilidad & Movilidad' : 'Availability & Mobility'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                {lang === 'es' 
                  ? 'Incorporación Inmediata, Carnet B2 y Vehículo Propio' 
                  : 'Immediate Start, B2 License, and Own Vehicle'}
              </h2>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
              <span>{lang === 'es' ? 'ESTADO: ACTIVO / DISPONIBLE' : 'STATUS: ACTIVE / AVAILABLE'}</span>
            </div>
          </div>

          {/* 3 Availability Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {availabilityFactors.map((factor, idx) => {
              const Icon = factor.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <Icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${factor.badgeColor}`}>
                        {factor.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-display mb-2">
                      {factor.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {factor.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] text-emerald-400/90 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{lang === 'es' ? 'Dato verificado en CV' : 'Verified CV Record'}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
