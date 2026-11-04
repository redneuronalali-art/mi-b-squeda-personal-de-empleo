import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cvData } from '../data/cvData';
import { 
  X, 
  Printer, 
  FileText, 
  Copy, 
  Check, 
  ShieldCheck, 
  ExternalLink,
  Download
} from 'lucide-react';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfModal: React.FC<PdfModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyAll = async () => {
    const lines = [
      cvData.personalInfo.name.toUpperCase(),
      `Ubicación: ${cvData.personalInfo.location}`,
      `Contacto: ${cvData.personalInfo.phone} · ${cvData.personalInfo.email}`,
      `Disponibilidad: ${cvData.personalInfo.availability[lang]} · ${cvData.personalInfo.drivingLicense[lang]} · ${cvData.personalInfo.vehicle[lang]}`,
      '',
      'HABILIDADES:',
      'Excel, Word, PowerPoint + Organización, planificación',
      '',
      'EDUCACIÓN:',
      ...cvData.education.map(e => `- ${e.title[lang]}, ${e.institution}: ${e.periodOrHours[lang]}`),
      '',
      'EXPERIENCIA PROFESIONAL:',
      ...cvData.experiences.map(exp => `${exp.period} ${exp.company}\n${exp.role[lang]}\n${exp.duties[lang].join('; ')}\n`)
    ];

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Control Bar (Hidden during print) */}
        <div className="no-print p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">
                {lang === 'es' ? 'Currículum Vitae — Versión Oficial para Selección' : 'Curriculum Vitae — Official HR Print Version'}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {lang === 'es' ? 'Formato adaptado para guardar en PDF o imprimir' : 'Formatted for PDF Export & Print'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono border border-white/10 transition-colors"
              title="Copiar texto para ATS"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar Texto'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Guardar como PDF / Imprimir' : 'Save as PDF / Print'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Cerrar vista previa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Container */}
        <div className="overflow-y-auto p-4 sm:p-10 bg-slate-900/60 print:bg-white print:text-black">
          
          {/* A4 Sheet Mockup for Recruiter Visual Quality */}
          <div className="max-w-3xl mx-auto bg-slate-950 print:bg-white text-slate-100 print:text-black p-6 sm:p-10 rounded-2xl border border-white/10 print:border-none shadow-xl font-sans text-xs sm:text-sm">
            
            {/* CV Header */}
            <div className="border-b border-white/15 print:border-black pb-5 mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white print:text-black font-display uppercase">
                {cvData.personalInfo.name} <span className="text-blue-400 print:text-black font-normal">({cvData.personalInfo.location.split(' ')[0]})</span>
              </h1>
              
              <div className="mt-2 text-xs font-mono text-emerald-400 print:text-black font-semibold">
                {cvData.personalInfo.availability[lang]}. {cvData.personalInfo.drivingLicense[lang]}, {cvData.personalInfo.vehicle[lang]}.
              </div>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300 print:text-black font-mono">
                <span><strong>Contacto:</strong> {cvData.personalInfo.phone}</span>
                <span>·</span>
                <span>{cvData.personalInfo.email}</span>
              </div>
            </div>

            {/* HABILIDADES (Strictly from CV) */}
            <div className="mb-6">
              <h2 className="text-xs font-mono uppercase font-bold tracking-wider text-blue-400 print:text-black border-b border-white/10 print:border-black/20 pb-1 mb-2">
                HABILIDADES
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 print:text-black">
                Excel, Word, PowerPoint + Organización, planificación
              </p>
            </div>

            {/* EDUCACIÓN (Strictly from CV) */}
            <div className="mb-6">
              <h2 className="text-xs font-mono uppercase font-bold tracking-wider text-blue-400 print:text-black border-b border-white/10 print:border-black/20 pb-1 mb-2">
                EDUCACIÓN
              </h2>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200 print:text-black list-disc list-inside">
                {cvData.education.map((item) => (
                  <li key={item.id}>
                    <strong>{item.title[lang]}</strong>, {item.institution}: {item.periodOrHours[lang]}.
                  </li>
                ))}
              </ul>
            </div>

            {/* EXPERIENCIA PROFESIONAL (Strictly from CV) */}
            <div>
              <h2 className="text-xs font-mono uppercase font-bold tracking-wider text-blue-400 print:text-black border-b border-white/10 print:border-black/20 pb-1 mb-3">
                EXPERIENCIA PROFESIONAL
              </h2>

              <div className="space-y-4">
                {cvData.experiences.map((exp) => (
                  <div key={exp.id} className="pb-3 border-b border-white/5 print:border-black/10 last:border-none">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <span className="font-bold text-white print:text-black text-xs sm:text-sm">
                        {exp.period} · {exp.company}
                      </span>
                    </div>

                    <div className="text-xs font-medium text-blue-300 print:text-black mt-0.5">
                      {exp.role[lang]}
                    </div>

                    <div className="text-[11px] sm:text-xs text-slate-300 print:text-black mt-1 leading-relaxed">
                      {exp.duties[lang].join(' · ')}
                    </div>

                    {exp.needsConfirmation && (
                      <div className="text-[10px] text-amber-300 print:text-black italic mt-1 font-mono">
                        * Puesto y funciones en documento original pendientes de ampliación con la candidata.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Document Footer */}
            <div className="mt-8 pt-4 border-t border-white/10 print:border-black/20 text-center text-[10px] text-slate-500 print:text-black font-mono">
              Documento transcrito fielmente del currículum original de Alicia Fernández Almendro.
            </div>

          </div>
        </div>

        {/* Modal Bottom Explanation */}
        <div className="no-print p-4 bg-slate-950 border-t border-white/10 text-center text-xs text-slate-400">
          <span>{lang === 'es' ? 'Consejo: En el diálogo de impresión, selecciona "Guardar como PDF" como destino para obtener el archivo oficial listo para archivar.' : 'Tip: In the print dialog, select "Save as PDF" to generate the official ready-to-archive file.'}</span>
        </div>

      </div>
    </div>
  );
};
