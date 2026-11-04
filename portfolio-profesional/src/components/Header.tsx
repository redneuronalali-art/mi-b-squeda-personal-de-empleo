import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileDown, Menu, X, Globe } from 'lucide-react';

interface HeaderProps {
  onOpenPdf: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPdf }) => {
  const { lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#sobre-mi', label: lang === 'es' ? 'Sobre mí' : 'About me' },
    { href: '#experiencia', label: lang === 'es' ? 'Experiencia' : 'Experience' },
    { href: '#competencias', label: lang === 'es' ? 'Competencias' : 'Skills' },
    { href: '#testimonios', label: lang === 'es' ? 'Avales' : 'Reviews' },
    { href: '#calendar', label: lang === 'es' ? 'Calendar' : 'Calendar' },
    { href: '#contacto', label: lang === 'es' ? 'Contacto' : 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel border-b border-white/10 py-3 shadow-2xl shadow-black/60'
          : 'bg-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white font-mono text-sm font-semibold shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              AF
            </span>
            <span className="group-hover:text-blue-300 transition-colors">
              Alicia Fernández Almendro
            </span>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors relative py-1 text-slate-300 hover:text-white whitespace-nowrap shrink-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-blue-500 after:to-violet-500 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Language Switcher + Download CV CTA) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              aria-label={lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-slate-900/60 text-xs font-mono font-medium text-slate-300 hover:text-white hover:border-violet-500/50 hover:bg-slate-800/80 transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span className={lang === 'es' ? 'text-blue-400 font-bold' : 'text-slate-400'}>ES</span>
              <span className="text-slate-600">/</span>
              <span className={lang === 'en' ? 'text-violet-400 font-bold' : 'text-slate-400'}>EN</span>
            </button>

            {/* Download CV Modal Trigger */}
            <button
              onClick={onOpenPdf}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Descargar CV' : 'Download CV'}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-white/10 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 glass-panel rounded-xl p-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex justify-between items-center">
              <button
                onClick={() => {
                  onOpenPdf();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-blue-600/30"
              >
                <FileDown className="w-4 h-4" />
                <span>{lang === 'es' ? 'Descargar CV (PDF)' : 'Download CV (PDF)'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
