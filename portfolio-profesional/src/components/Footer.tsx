import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cvData } from '../data/cvData';
import { ArrowUp, FileDown, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenPdf: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPdf }) => {
  const { lang } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#02050e] py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white font-mono text-sm font-semibold">
              AF
            </span>
            <div>
              <div className="text-white font-bold font-display text-sm">
                Alicia Fernández Almendro
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {lang === 'es' ? 'Portfolio Profesional · Illescas' : 'Professional Portfolio · Illescas'}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-400 font-medium">
            <a href="#sobre-mi" className="hover:text-white transition-colors">
              {lang === 'es' ? 'Sobre mí' : 'About me'}
            </a>
            <a href="#experiencia" className="hover:text-white transition-colors">
              {lang === 'es' ? 'Experiencia' : 'Experience'}
            </a>
            <a href="#competencias" className="hover:text-white transition-colors">
              {lang === 'es' ? 'Competencias' : 'Skills'}
            </a>
            <a href="#formacion" className="hover:text-white transition-colors">
              {lang === 'es' ? 'Formación' : 'Education'}
            </a>
            <a href="#testimonios" className="hover:text-white transition-colors">
              {lang === 'es' ? 'Avales' : 'Endorsements'}
            </a>
            <a href="#calendar" className="hover:text-white transition-colors">
              Calendar
            </a>
            <a href="#contacto" className="hover:text-white transition-colors">
              {lang === 'es' ? 'Contacto' : 'Contact'}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel hover:border-violet-500/40 text-slate-300 hover:text-white transition-all cursor-pointer font-mono"
            >
              <FileDown className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'es' ? 'Descargar CV' : 'Download CV'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg glass-panel hover:border-blue-500/40 text-slate-400 hover:text-white transition-all cursor-pointer"
              aria-label="Volver arriba"
              title="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {lang === 'es'
                ? 'Currículum digital creado con estricta fidelidad al documento original.'
                : 'Digital portfolio designed with strict fidelity to the physical CV.'}
            </span>
          </div>

          <div>
            © {new Date().getFullYear()} Alicia Fernández Almendro. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
