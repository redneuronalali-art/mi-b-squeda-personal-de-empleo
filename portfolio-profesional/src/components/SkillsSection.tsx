import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cvData } from '../data/cvData';
import { 
  Cpu, 
  FileSpreadsheet, 
  FileText, 
  Presentation, 
  FolderKanban, 
  CalendarRange, 
  Keyboard, 
  Receipt, 
  LifeBuoy, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { lang } = useLanguage();
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);

  const officialSkillsCV = [
    {
      name: 'Microsoft Excel',
      icon: FileSpreadsheet,
      badge: lang === 'es' ? 'Ofimática' : 'Office Suite',
      provenance: lang === 'es' ? 'Sección HABILIDADES' : 'SKILLS Section',
      desc: lang === 'es' 
        ? 'Manejo operativo de hojas de cálculo, gestión de datos tabulares, filtrado de operaciones crediticias y fórmulas administrativas.'
        : 'Spreadsheet management, tabular data handling, credit operation filtering, and administrative formulas.'
    },
    {
      name: 'Microsoft Word',
      icon: FileText,
      badge: lang === 'es' ? 'Ofimática' : 'Office Suite',
      provenance: lang === 'es' ? 'Sección HABILIDADES' : 'SKILLS Section',
      desc: lang === 'es'
        ? 'Redacción de informes oficiales, plantillas de contratos de financiación, circulares administrativas y correspondencia formal.'
        : 'Drafting official reports, loan financing templates, administrative notices, and formal correspondence.'
    },
    {
      name: 'Microsoft PowerPoint',
      icon: Presentation,
      badge: lang === 'es' ? 'Ofimática' : 'Office Suite',
      provenance: lang === 'es' ? 'Sección HABILIDADES' : 'SKILLS Section',
      desc: lang === 'es'
        ? 'Estructuración de diapositivas claras para soporte procedimental, presentación de proyectos y resúmenes operativos.'
        : 'Designing clear slides for procedure support, project walk-throughs, and operational briefs.'
    },
    {
      name: lang === 'es' ? 'Organización' : 'Organization',
      icon: FolderKanban,
      badge: lang === 'es' ? 'Gestión' : 'Management',
      provenance: lang === 'es' ? 'Sección HABILIDADES' : 'SKILLS Section',
      desc: lang === 'es'
        ? 'Sistematización de expedientes, archivo documental físico y digital, orden riguroso en flujos de expedientes bancarios y de personal.'
        : 'Systematizing files, physical and digital record-keeping, strict order across banking and HR documentation pipelines.'
    },
    {
      name: lang === 'es' ? 'Planificación' : 'Planning',
      icon: CalendarRange,
      badge: lang === 'es' ? 'Gestión' : 'Management',
      provenance: lang === 'es' ? 'Sección HABILIDADES' : 'SKILLS Section',
      desc: lang === 'es'
        ? 'Priorización efectiva de tareas, cumplimiento estricto de plazos operativos y coordinación metódica de cargas de trabajo.'
        : 'Effective task prioritization, adherence to operational deadlines, and methodical workload coordination.'
    }
  ];

  const certifiedPracticalCompetencies = [
    {
      name: lang === 'es' ? 'Mecanografía al Tacto' : 'Touch Typing Mastery',
      icon: Keyboard,
      source: 'Real Sociedad Matritense',
      desc: lang === 'es'
        ? 'Alta velocidad de pulsaciones por minuto con nula tasa de error. Clave en la grabación de becas universitarias y bases de datos.'
        : 'High-speed keystroke rate with zero error margin. Key to university scholarship entry and transactional databases.'
    },
    {
      name: lang === 'es' ? 'Gestión de Nóminas' : 'Payroll Administration',
      icon: Receipt,
      source: 'Consejería de Empleo (35h)',
      desc: lang === 'es'
        ? 'Conocimiento normativo de nóminas, cotizaciones a la Seguridad Social, IRPF y trámites contractuales laborales.'
        : 'Regulatory knowledge in payslip calculation, Social Security contributions, personal income tax, and labor contracts.'
    },
    {
      name: lang === 'es' ? 'Resolución de Incidencias & Soporte' : 'Incident Resolution & Store Support',
      icon: LifeBuoy,
      source: 'Carrefour Servicios Financieros (10 años)',
      desc: lang === 'es'
        ? 'Desescalado de problemas en TPV, incidencias bancarias, conciliación de operaciones y soporte diario a directores y empleados de tienda.'
        : 'POS escalation handling, banking anomalies, transaction reconciliations, and daily support to store directors.'
    }
  ];

  return (
    <section id="competencias" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-widest mb-3">
            <Cpu className="w-4 h-4" />
            <span>03. {lang === 'es' ? 'Competencias Profesionales' : 'Professional Skills'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            {lang === 'es' ? 'Habilidades Verificadas en el Currículum' : 'Verified Skills & Core Strengths'}
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-2xl">
            {lang === 'es'
              ? 'Conjunto de capacidades informáticas, organizativas y operativas extraídas de manera transparente de su CV y respaldadas por titulaciones oficiales y experiencia laboral.'
              : 'Software, organizational, and operational competencies extracted with transparency from the candidate resume and validated through certifications and tenure.'}
          </p>
        </div>

        {/* Primary Row: Skills Stated in the "HABILIDADES" Header of CV */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'es' ? 'Habilidades destacadas en el CV' : 'Highlighted in Resume'}</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Excel · Word · PowerPoint · Organización · Planificación
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {officialSkillsCV.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-violet-500/40 hover:bg-slate-900/60 transition-all group relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600/20 to-violet-600/20 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white font-display mb-2 group-hover:text-blue-300 transition-colors">
                    {item.name}
                  </h4>
                  
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {lang === 'es' ? 'Verificado en CV' : 'Verified in CV'}
                    </span>
                    <span>{item.provenance}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Secondary Row: Practical Competencies Proven by Training & Experience */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'es' ? 'Competencias acreditadas por titulación y experiencia' : 'Competencies Backed by Certification & Track Record'}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifiedPracticalCompetencies.map((comp, idx) => {
              const Icon = comp.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white font-display mb-1">
                    {comp.name}
                  </h4>
                  <div className="text-xs font-mono text-emerald-400 mb-3">
                    {comp.source}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {comp.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
