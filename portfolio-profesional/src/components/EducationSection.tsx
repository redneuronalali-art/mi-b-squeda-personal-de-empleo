import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cvData } from '../data/cvData';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Clock, 
  Building, 
  CheckCircle,
  FileBadge
} from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { lang } = useLanguage();
  const { education } = cvData;

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'degree':
        return {
          label: lang === 'es' ? 'Titulación Oficial Superior' : 'Official Higher Degree',
          className: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
        };
      case 'course':
        return {
          label: lang === 'es' ? 'Especialización Formativa' : 'Specialized Course',
          className: 'text-violet-400 bg-violet-500/10 border-violet-500/20'
        };
      case 'certification':
        return {
          label: lang === 'es' ? 'Certificación de Destreza' : 'Official Certification',
          className: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
        };
      default:
        return {
          label: type,
          className: 'text-slate-400 bg-white/5 border-white/10'
        };
    }
  };

  return (
    <section id="formacion" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>04. {lang === 'es' ? 'Formación y Acreditaciones' : 'Education & Credentials'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            {lang === 'es' ? 'Formación Académica y Complementaria' : 'Academic & Complementary Education'}
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-2xl">
            {lang === 'es'
              ? 'Títulos oficiales, cursos especializados y certificaciones que sustentan mi cualificación en gestión financiera, tributaria y operativa.'
              : 'Official degrees, advanced courses, and certifications underpinning my qualifications in financial, administrative, and operational management.'}
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((item) => {
            const badge = getTypeBadge(item.type);

            return (
              <div
                key={item.id}
                className="glass-panel p-7 rounded-2xl border border-white/5 hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all relative overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded border ${badge.className}`}>
                      {badge.label}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      {item.periodOrHours[lang]}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title[lang]}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-slate-300 font-medium mb-4">
                    <Building className="w-4 h-4 text-violet-400 shrink-0" />
                    <span>{item.institution}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {item.details[lang]}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {lang === 'es' ? 'Consta en CV' : 'Listed in CV'}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">
                    ID: {item.id}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
