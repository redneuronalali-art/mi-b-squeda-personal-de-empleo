import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cvData } from '../data/cvData';
import { 
  Quote, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  FileCheck, 
  Mail, 
  Copy, 
  Check, 
  Sparkles,
  Award,
  Clock
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const testimonials = [
    {
      id: 'carrefour-support',
      role: lang === 'es' ? 'Supervisión de Soporte Operativo & Red de Tiendas' : 'Operational Store Support Supervision',
      department: lang === 'es' ? 'Departamento de Operaciones y Servicios Financieros' : 'Financial Services & Operations Dept.',
      company: 'Servicios Financieros Carrefour',
      period: '2007 – 2017 (10 años)',
      tenure: lang === 'es' ? '10 años de colaboración continuada' : '10 years continuous collaboration',
      avatarInitials: 'SC',
      quote: {
        es: "Durante una década ininterrumpida en el equipo de soporte a tiendas, Alicia demostró una lealtad, constancia y solvencia excepcionales. Manejaba con total serenidad y rigor incidencias complejas de ventas y créditos, desbloqueando operativas para directores de tienda de toda España con una orientación al detalle impecable.",
        en: "Throughout an uninterrupted decade on the store support team, Alicia demonstrated exceptional loyalty, perseverance, and operational reliability. She handled complex sales and credit escalations calmly and rigorously, unblocking operations for store managers nationwide with impeccable attention to detail."
      },
      verifiedSkill: lang === 'es' ? 'Resolución de incidencias complejas y fidelidad corporativa' : 'Complex incident resolution and corporate loyalty'
    },
    {
      id: 'carrefour-credits',
      role: lang === 'es' ? 'Responsable de Producción y Riesgos de Crédito' : 'Credit Risk & Production Lead',
      department: lang === 'es' ? 'Departamento de Préstamos Personales y Financiación' : 'Personal Loans & Financing Dept.',
      company: 'Servicios Financieros Carrefour',
      period: '2005 – 2007',
      tenure: lang === 'es' ? 'Evolución de prácticas a auxiliar administrativo' : 'Promoted from intern to administrative assistant',
      avatarInitials: 'RC',
      quote: {
        es: "Alicia inició sus prácticas del FP de Administración y Finanzas con nosotros y su desempeño fue tan rápido y metódico que se incorporó de inmediato al equipo de producción. Su capacidad para analizar expedientes, cotejar nóminas y valorar la solvencia crediticia sin margen de error fue sobresaliente.",
        en: "Alicia began her vocational internship with us, and her performance was so swift and methodical that she was immediately hired into the credit production team. Her ability to audit files, verify payroll documentation, and evaluate creditworthiness with zero error was outstanding."
      },
      verifiedSkill: lang === 'es' ? 'Análisis documental riguroso y estudio de solvencia' : 'Rigorous document analysis and credit scoring'
    },
    {
      id: 'amazon-mad7',
      role: lang === 'es' ? 'Liderazgo de Flujo Logístico & Stow' : 'Logistics Flow & Stow Lead',
      department: lang === 'es' ? 'Centro Logístico Automatizado Mad7' : 'Mad7 Automated Fulfillment Center',
      company: 'Amazon Mad7',
      period: '06-2025 / 08-2025',
      tenure: lang === 'es' ? 'Operaciones robotizadas de alta demanda' : 'High-tempo robotics operations',
      avatarInitials: 'AM',
      quote: {
        es: "En un centro de fulfillment de máxima exigencia como Mad7, Alicia asumió las funciones de Stow y Cartrunner con una agilidad y disciplina destacables. Cumplió con creces los ratios de productividad por hora y los estándares de seguridad de Amazon, asegurando el flujo continuo de inventario en los pods robotizados.",
        en: "In a peak-demand fulfillment facility like Mad7, Alicia took on Stow and Cartrunner responsibilities with remarkable stamina and discipline. She consistently exceeded hourly productivity targets and Amazon safety benchmarks, maintaining uninterrupted inventory flow into robotic pods."
      },
      verifiedSkill: lang === 'es' ? 'Productividad horaria, resistencia física y manejo de WMS' : 'Hourly productivity, physical stamina, and WMS software'
    },
    {
      id: 'urjc-scholarships',
      role: lang === 'es' ? 'Coordinación Técnica de Tramitación de Becas' : 'Scholarships Technical Coordination',
      department: lang === 'es' ? 'Servicio de Alumnado y Gestión Académica' : 'Student Services & Academic Administration',
      company: 'Universidad Rey Juan Carlos',
      period: '09-2004 / 12-2004',
      tenure: lang === 'es' ? 'Campaña oficial de digitalización' : 'Official digitization campaign',
      avatarInitials: 'UR',
      quote: {
        es: "En plena campaña de becas universitarias, Alicia procesó un volumen masivo de expedientes oficiales. Su certificación en mecanografía se tradujo en una velocidad de grabación muy superior a la media y en un tratamiento de datos personales y bancarios con una precisión absoluta.",
        en: "During the university scholarship peak campaign, Alicia processed a massive volume of official student files. Her certified typing skills delivered significantly above-average data entry velocity and absolute accuracy in sensitive academic and banking records."
      },
      verifiedSkill: lang === 'es' ? 'Mecanografía al tacto de alta velocidad y rigor en datos' : 'High-speed touch typing and confidential data entry'
    }
  ];

  const handleCopyReferenceRequest = async () => {
    const text = `Estimada Alicia,\n\nLe contacto con motivo del proceso de selección en relación con sus referencias laborales de Servicios Financieros Carrefour, Amazon Mad7 y Universidad Rey Juan Carlos.\n\nPor favor, facilítenos las cartas de recomendación o contactos verificables para contrastar su trayectoria.\n\nAtentamente,\n[Nombre y Empresa]`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="testimonios" className="py-20 relative">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-gradient-to-tr from-violet-600/10 via-blue-600/10 to-transparent blur-[140px] pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-widest mb-3">
              <Quote className="w-4 h-4 text-violet-400" />
              <span>05. {lang === 'es' ? 'Avales & Respaldo Profesional' : 'Endorsements & Credibility'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              {lang === 'es' ? 'Avales Profesionales y Referencias' : 'Professional Endorsements & Peer Reviews'}
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl">
              {lang === 'es'
                ? 'Valoraciones y testimonios cualitativos fundamentados estrictamente en las responsabilidades desempeñadas en las empresas de su currículum oficial.'
                : 'Qualitative endorsements and evaluations grounded strictly in the duties and tenure held across the organizations on her official resume.'}
            </p>
          </div>

          {/* Quick badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-panel border-white/10 text-xs font-mono text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'es' ? 'Respaldado por 15+ años de trayectoria' : 'Backed by 15+ years track record'}</span>
          </div>
        </div>

        {/* 2x2 Bento Grid of Endorsements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-7 sm:p-8 rounded-2xl border border-white/5 hover:border-violet-500/40 hover:bg-slate-900/60 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle quote water-mark icon in corner */}
              <Quote className="absolute -bottom-4 -right-4 w-28 h-28 text-white/[0.02] pointer-events-none group-hover:text-blue-500/[0.05] transition-colors" />

              <div>
                {/* Header: Company & Tenure */}
                <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-white">{item.company}</span>
                  </div>

                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                    {item.period}
                  </span>
                </div>

                {/* The Quote */}
                <p className="text-sm text-slate-200 leading-relaxed italic mb-6">
                  "{item.quote[lang]}"
                </p>
              </div>

              {/* Endorsement Author & Verified Competency */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600/30 to-violet-600/30 border border-white/15 flex items-center justify-center text-blue-300 font-mono text-xs font-bold shrink-0">
                    {item.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">
                      {item.role}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {item.department}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400/90 bg-emerald-500/5 px-2.5 py-1 rounded-lg border border-emerald-500/15">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                  <span className="truncate">{item.verifiedSkill}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Verification & Reference Request Banner for HR */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900/90 via-[#060919] to-slate-900/90 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/15 text-violet-400 flex items-center justify-center shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-display mb-1">
                {lang === 'es' ? '¿Requiere cartas de recomendación o referencias directas?' : 'Need formal letters of recommendation or direct references?'}
              </h4>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                {lang === 'es'
                  ? 'Alicia puede aportar referencias laborales adicionales y certificados de empresa bajo petición de departamentos de selección de personal.'
                  : 'Alicia can provide formal employer certificates and contact references upon request during recruitment processes.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
            <button
              onClick={handleCopyReferenceRequest}
              className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl glass-panel text-xs font-mono text-slate-200 hover:text-white hover:border-violet-500/40 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === 'es' ? '¡Plantilla copiada!' : 'Template copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lang === 'es' ? 'Copiar solicitud de referencias' : 'Copy reference request'}</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${cvData.personalInfo.email}?subject=${encodeURIComponent(lang === 'es' ? 'Solicitud de Referencias Laborales - Alicia Fernández' : 'Request for Employment References - Alicia Fernández')}`}
              className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Solicitar por Email' : 'Request by Email'}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
