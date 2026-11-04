import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building2, 
  Boxes, 
  Headphones, 
  FileSpreadsheet, 
  Check, 
  MapPin, 
  Compass, 
  Zap,
  Target
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { lang } = useLanguage();

  const highlights = [
    {
      icon: Building2,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/20',
      title: lang === 'es' ? 'Solidez Financiera y Administrativa' : 'Financial & Administrative Core',
      description: lang === 'es'
        ? 'Más de 10 años en Servicios Financieros Carrefour: desde análisis de solicitudes de préstamos personales y estudios de crédito hasta soporte a tiendas de primer nivel.'
        : 'Over 10 continuous years at Carrefour Financial Services: from loan application scoring and credit production to senior multi-store operational support.'
    },
    {
      icon: Boxes,
      color: 'text-violet-400',
      borderColor: 'border-violet-500/20',
      title: lang === 'es' ? 'Operaciones Logísticas de Alta Demanda' : 'High-Demand Logistics Operations',
      description: lang === 'es'
        ? 'Experiencia contrastada en Amazon Mad7 ejecutando roles críticos de Stow y Cartrunner en almacén robotizado, con terminales de radiofrecuencia y objetivos de productividad.'
        : 'Hands-on experience at Amazon Mad7 handling vital Stow and Cartrunner positions in robotics-assisted fulfillment centers with RF scanners and productivity goals.'
    },
    {
      icon: Headphones,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/20',
      title: lang === 'es' ? 'Atención al Cliente y Resolución' : 'Customer Service & Incident Resolution',
      description: lang === 'es'
        ? 'Doble vertiente de atención: soporte técnico de incidencias para empleados y directores de tienda, y asesoramiento directo a clientes particulares.'
        : 'Dual customer service expertise: internal incident escalation for retail store managers and direct client advisory for consumer finance.'
    },
    {
      icon: FileSpreadsheet,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/20',
      title: lang === 'es' ? 'Tratamiento Riguroso de Información' : 'Rigorous Data & Document Management',
      description: lang === 'es'
        ? 'Mecanografía certificada por la Real Sociedad Matritense, grabación masiva de datos en la Universidad Rey Juan Carlos y control administrativo de personal.'
        : 'Certified touch typing by the Real Sociedad Matritense, high-volume scholarship digitization at Rey Juan Carlos University, and staff oversight.'
    }
  ];

  return (
    <section id="sobre-mi" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-3">
            <Compass className="w-4 h-4" />
            <span>01. {lang === 'es' ? 'Perfil Profesional' : 'Professional Profile'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance">
            {lang === 'es' 
              ? 'Trayectoria probada en administración, operaciones y rigor analítico' 
              : 'Proven track record across administration, operations, and analytical rigor'}
          </h2>
          <p className="mt-3 text-slate-400 max-w-3xl text-base leading-relaxed">
            {lang === 'es'
              ? 'Con base en Illescas y disponibilidad total de incorporación y desplazamiento, aporto compromiso demostrado, solvencia operativa y capacidad inmediata de integración en equipos de trabajo.'
              : 'Based in Illescas with immediate availability and own mobility, bringing demonstrated commitment, operational dependability, and rapid team integration.'}
          </p>
        </div>

        {/* Bento Grid: Career Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="glass-panel p-7 rounded-2xl glass-panel-hover border border-white/5 relative overflow-hidden group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Executive Candidate Value Statement Card */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-950/30 via-slate-900/60 to-violet-950/30 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <Zap className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'Valor diferencial para responsables de selección' : 'Key value for hiring managers'}</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                {lang === 'es'
                  ? 'Fidelidad corporativa, versatilidad operativa y autonomía'
                  : 'Corporate loyalty, operational versatility, and independence'}
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed">
                {lang === 'es'
                  ? 'Pocas candidaturas combinan más de 10 años de estabilidad y desarrollo continuo en una gran multinacional financiera (Carrefour) con la agilidad y exigencia de centros logísticos de última generación (Amazon) y labores administrativas de alta precisión. Cada periodo de mi trayectoria está respaldado por hechos concretos y verificables.'
                  : 'Few profiles combine over 10 years of stability and progressive promotion in a major financial multinational (Carrefour) with the pace of next-gen automated logistics (Amazon) and high-precision administrative responsibilities. Every milestone in my resume is concrete and fully documented.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{lang === 'es' ? 'Incorporación inmediata sin preaviso' : 'Immediate availability without notice period'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{lang === 'es' ? 'Carnet de conducir B2 y vehículo propio' : 'B2 driving license and private vehicle'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{lang === 'es' ? 'Residencia en Illescas (Madrid Sur / Toledo)' : 'Resident in Illescas (South Madrid / Toledo)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{lang === 'es' ? 'Manejo ágil de Excel, Word y PowerPoint' : 'Fluent in Excel, Word, and PowerPoint'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-center lg:border-l lg:border-white/10 lg:pl-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/15 flex items-center justify-center mb-3">
                <Target className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-lg font-bold text-white font-display mb-1">
                {lang === 'es' ? 'Disponibilidad Plena' : 'Full Readiness'}
              </div>
              <div className="text-xs text-slate-400 mb-4 max-w-[200px]">
                {lang === 'es' ? 'Lista para entrevista presencial o telemática' : 'Ready for in-person or remote interview'}
              </div>
              <a
                href="#contacto"
                className="w-full max-w-[220px] py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold text-center transition-all border border-white/15"
              >
                {lang === 'es' ? 'Agendar Entrevista' : 'Schedule Interview'}
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
