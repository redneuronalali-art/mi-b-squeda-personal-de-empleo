import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cvData, ExperienceItem } from '../data/cvData';
import { 
  Briefcase, 
  Search, 
  Calendar, 
  Building, 
  CheckCircle, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Tag, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const { lang } = useLanguage();
  const [activeSector, setActiveSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('telepizza'); // First expanded by default

  const sectors = [
    { id: 'all', label: lang === 'es' ? 'Todas las etapas' : 'All stages' },
    { id: 'finance', label: lang === 'es' ? 'Banca & Servicios Financieros' : 'Banking & Finance' },
    { id: 'logistics', label: lang === 'es' ? 'Logística & Centros de Distribución' : 'Logistics & Warehousing' },
    { id: 'retail', label: lang === 'es' ? 'Comercio & Retail' : 'Retail & Operations' },
    { id: 'admin', label: lang === 'es' ? 'Administración & Sector Público' : 'Admin & Public Sector' },
  ];

  const filteredExperiences = useMemo(() => {
    return cvData.experiences.filter((item) => {
      const matchesSector = activeSector === 'all' || item.sector === activeSector;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesSector;

      const matchesSearch =
        item.company.toLowerCase().includes(q) ||
        item.role[lang].toLowerCase().includes(q) ||
        item.period.toLowerCase().includes(q) ||
        item.duties[lang].some((d) => d.toLowerCase().includes(q));

      return matchesSector && matchesSearch;
    });
  }, [activeSector, searchQuery, lang]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getSectorBadge = (sector: string) => {
    switch (sector) {
      case 'finance':
        return {
          label: lang === 'es' ? 'Servicios Financieros' : 'Financial Services',
          className: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
        };
      case 'logistics':
        return {
          label: lang === 'es' ? 'Logística' : 'Logistics',
          className: 'text-violet-400 bg-violet-500/10 border-violet-500/20'
        };
      case 'retail':
        return {
          label: lang === 'es' ? 'Atención / Tienda' : 'Retail / Store',
          className: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
        };
      case 'admin':
        return {
          label: lang === 'es' ? 'Administración' : 'Administration',
          className: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
        };
      default:
        return {
          label: sector,
          className: 'text-slate-400 bg-white/5 border-white/10'
        };
    }
  };

  return (
    <section id="experiencia" className="py-20 relative">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-3">
              <Briefcase className="w-4 h-4" />
              <span>02. {lang === 'es' ? 'Trayectoria Laboral' : 'Work History'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              {lang === 'es' ? 'Experiencia Profesional Completa' : 'Complete Professional Experience'}
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl">
              {lang === 'es'
                ? 'Línea temporal detallada extraída con total fidelidad del currículum original, con nombres reales de empresas y responsabilidades verificables.'
                : 'Detailed interactive timeline extracted strictly from official resume, featuring real company names and verifiable roles.'}
            </p>
          </div>

          {/* Search Input for HR */}
          <div className="relative min-w-[260px] sm:min-w-[300px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'es' ? 'Buscar empresa, puesto o función...' : 'Search company, role or duty...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Interactive Filter Tabs (Zero-pill compliant functional buttons) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 glass-panel rounded-2xl mb-12 border border-white/5 w-fit">
          {sectors.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSector(tab.id)}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeSector === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Glowing Timeline Line */}
          <div 
            className="hidden md:block absolute left-8 top-4 bottom-8 w-[2px] bg-gradient-to-b from-blue-500 via-violet-500 to-transparent opacity-30" 
            aria-hidden="true" 
          />

          <div className="space-y-6">
            {filteredExperiences.map((item, index) => {
              const isExpanded = expandedId === item.id;
              const badge = getSectorBadge(item.sector);

              return (
                <div
                  key={item.id}
                  className="relative md:pl-20 transition-all duration-200"
                >
                  {/* Glowing Node on Timeline Line */}
                  <div 
                    className="hidden md:flex absolute left-6 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-[#030712] border-2 border-blue-500 items-center justify-center shadow-[0_0_12px_#3b82f6]"
                    aria-hidden="true"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>

                  {/* Experience Card */}
                  <div
                    className={`glass-panel rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isExpanded
                        ? 'border-blue-500/40 bg-slate-900/80 shadow-xl shadow-blue-950/30'
                        : 'border-white/5 hover:border-white/20 hover:bg-slate-900/40'
                    }`}
                  >
                    {/* Card Header clickable */}
                    <div
                      onClick={() => toggleExpand(item.id)}
                      className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {/* Sector Badge */}
                          <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-md border ${badge.className}`}>
                            {badge.label}
                          </span>

                          {/* Period */}
                          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            {item.period}
                          </span>

                          {/* Confirmation Alert if applicable */}
                          {item.needsConfirmation && (
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {lang === 'es' ? 'Datos a confirmar' : 'To confirm'}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                          <span>{item.role[lang]}</span>
                        </h3>

                        <div className="text-sm font-medium text-blue-300 flex items-center gap-1.5 mt-1">
                          <Building className="w-4 h-4 text-blue-400" />
                          <span>{item.company}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 hidden sm:inline">
                          {isExpanded ? (lang === 'es' ? 'Ocultar detalle' : 'Hide details') : (lang === 'es' ? 'Ver funciones' : 'View duties')}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white border border-white/10">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Content */}
                    {isExpanded && (
                      <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/5 bg-black/20">
                        {/* Brief explanation */}
                        <p className="text-sm text-slate-300 mb-4 italic">
                          "{item.details[lang]}"
                        </p>

                        {/* List of concrete duties */}
                        <div className="space-y-2 mb-5">
                          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                            {lang === 'es' ? 'Responsabilidades y Funciones Principales:' : 'Key Duties & Responsibilities:'}
                          </div>
                          {item.duties[lang].map((duty, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{duty}</span>
                            </div>
                          ))}
                        </div>

                        {/* Transparency footer */}
                        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                          <span>
                            {item.needsConfirmation 
                              ? (lang === 'es' ? 'Nota: La información se ampliará con la candidata.' : 'Note: Details will be expanded with candidate.')
                              : (lang === 'es' ? 'Registro fiel al currículum original' : 'Faithfully recorded from resume')}
                          </span>
                          <span className="text-blue-400">
                            {item.company}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredExperiences.length === 0 && (
              <div className="glass-panel p-10 rounded-2xl text-center">
                <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white mb-1">
                  {lang === 'es' ? 'No se encontraron registros' : 'No records found'}
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  {lang === 'es'
                    ? 'Prueba a cambiar el filtro de sector o a limpiar el término de búsqueda.'
                    : 'Try changing the sector filter or clearing your search term.'}
                </p>
                <button
                  onClick={() => {
                    setActiveSector('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white"
                >
                  {lang === 'es' ? 'Restablecer filtros' : 'Reset filters'}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
