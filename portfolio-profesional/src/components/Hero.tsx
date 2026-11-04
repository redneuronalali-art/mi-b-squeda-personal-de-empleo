import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cvData } from '../data/cvData';
import { 
  CheckCircle2, 
  Car, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Award,
  Layers,
  CalendarDays
} from 'lucide-react';

interface HeroProps {
  onOpenPdf: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPdf }) => {
  const { lang } = useLanguage();
  const { personalInfo, keyStats } = cvData;

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background radial spotlight glows */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-r from-blue-600/15 via-violet-600/15 to-cyan-500/10 blur-[120px] pointer-events-none -z-10" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-violet-600/10 blur-[140px] pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Hierarchy & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Live Availability Pill / Executive Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-blue-500/30 text-xs font-mono text-blue-300 w-fit mb-6 shadow-sm shadow-blue-500/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span>{personalInfo.availability[lang]}</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-slate-300">{personalInfo.drivingLicense[lang]}</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-violet-300">{personalInfo.vehicle[lang]}</span>
            </div>

            {/* Candidate Name - Impactful Modern Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 text-balance font-display leading-[1.1]">
              Alicia <br className="hidden sm:inline" />
              <span className="text-gradient">Fernández Almendro</span>
            </h1>

            {/* Subtitle / Role Focus */}
            <p className="text-xl sm:text-2xl font-medium text-slate-200 mb-6 font-display">
              {personalInfo.title[lang]}
            </p>

            {/* Profile Brief */}
            <p className="text-base text-slate-400 max-w-2xl leading-relaxed mb-8">
              {personalInfo.summary[lang]}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#experiencia"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-medium text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all group"
              >
                <span>{lang === 'es' ? 'Explorar Experiencia' : 'Explore Experience'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#calendar"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl glass-panel text-blue-300 hover:text-white border-blue-500/30 hover:border-blue-400 text-sm font-medium transition-all hover:-translate-y-0.5"
              >
                <CalendarDays className="w-4 h-4 text-blue-400" />
                <span>{lang === 'es' ? 'Agendar en Calendar' : 'Book on Calendar'}</span>
              </a>

              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl glass-panel text-slate-200 hover:text-white hover:border-violet-500/40 text-sm font-medium transition-all hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4 text-violet-400" />
                <span>{lang === 'es' ? 'Contactar' : 'Get in Touch'}</span>
              </a>

              <button
                onClick={onOpenPdf}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl border border-white/10 hover:border-blue-400/40 bg-white/[0.02] text-slate-300 hover:text-white text-sm font-medium transition-all"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>{lang === 'es' ? 'CV Imprimible' : 'Printable CV'}</span>
              </button>
            </div>

            {/* Fast Contact Signals */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 pt-4 border-t border-white/5 font-mono">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href={`tel:${personalInfo.phone}`} className="hover:text-white transition-colors">
                  {personalInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-violet-400" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors truncate max-w-[220px]">
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech Glassmorphic Identity & Credentials Beacon (NO PERSONAL PHOTO) */}
          <div className="lg:col-span-5">
            <div className="relative p-1 rounded-3xl bg-gradient-to-b from-blue-500/20 via-violet-500/20 to-transparent shadow-2xl shadow-blue-900/20">
              <div className="glass-panel rounded-[22px] p-6 sm:p-8 relative overflow-hidden border border-white/10">
                
                {/* Decorative circuit line accents */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl" />

                {/* Identity Header */}
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-mono text-2xl font-bold shadow-lg shadow-indigo-500/30 border border-white/20">
                      AF
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-blue-400 font-mono mb-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                        <span>{lang === 'es' ? 'Perfil Verificado 100%' : '100% Verified Profile'}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white font-display">
                        Alicia Fernández A.
                      </h3>
                      <p className="text-xs text-slate-400">
                        {lang === 'es' ? 'FP Grado Superior Finanzas' : 'Higher Degree in Finance'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobility & Key Readiness Matrix */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-emerald-500/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">{lang === 'es' ? 'Disponibilidad' : 'Availability'}</div>
                        <div className="text-sm font-semibold text-emerald-300">
                          {personalInfo.availability[lang]}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">{lang === 'es' ? 'Movilidad & Conducción' : 'Mobility & Driving'}</div>
                        <div className="text-sm font-semibold text-slate-100">
                          {personalInfo.drivingLicense[lang]} · {personalInfo.vehicle[lang]}
                        </div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-violet-500/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/15 text-violet-400 flex items-center justify-center">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">{lang === 'es' ? 'Especialización Central' : 'Core Specialty'}</div>
                        <div className="text-sm font-semibold text-violet-200">
                          Servicios Financieros Carrefour (10+ Años)
                        </div>
                      </div>
                    </div>
                    <Layers className="w-4 h-4 text-violet-400" />
                  </div>
                </div>

                {/* Micro Verified Skills Bar */}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs text-slate-400 font-mono mb-2 flex items-center justify-between">
                    <span>{lang === 'es' ? 'Herramientas & Certificaciones' : 'Tools & Certifications'}</span>
                    <span className="text-slate-500">CV Oficial</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {['Excel', 'Word', 'PowerPoint', 'Organización', 'Planificación', 'Mecanografía', 'Nóminas'].map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-slate-300 font-mono text-[11px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Full-width KPI / Track Record Strip (Adhering to §2.B of Frontend Guidelines) */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {keyStats.map((stat, idx) => (
              <div 
                key={idx}
                className="glass-panel p-5 rounded-2xl border-white/5 hover:border-blue-500/30 transition-all group"
              >
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-gradient mb-1 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                  {stat.label[lang]}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
