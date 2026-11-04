import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cvData } from '../data/cvData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  Building2, 
  User, 
  MessageSquare, 
  HelpCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { lang } = useLanguage();
  const { personalInfo } = cvData;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    reason: 'oferta', // 'oferta' | 'entrevista' | 'consulta'
    message: ''
  });

  const [copiedContact, setCopiedContact] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [formSubmittedToMailto, setFormSubmittedToMailto] = useState(false);

  const reasons = [
    { id: 'oferta', label: lang === 'es' ? 'Oferta de empleo formal' : 'Formal job offer' },
    { id: 'entrevista', label: lang === 'es' ? 'Convocatoria de entrevista' : 'Interview invitation' },
    { id: 'consulta', label: lang === 'es' ? 'Consulta de disponibilidad' : 'Availability query' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyContactInfo = async () => {
    const text = `Alicia Fernández Almendro\nTeléfono: ${personalInfo.phone}\nEmail: ${personalInfo.email}\nUbicación: ${personalInfo.location}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedContact(true);
      setTimeout(() => setCopiedContact(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleCopyDraft = async () => {
    const draftText = `Estimada Alicia,\n\nLe contacto en nombre de ${formData.company || '[Empresa]'} en relación a: ${formData.reason}.\n\n${formData.message || '[Mensaje]'}\n\nAtentamente,\n${formData.name || '[Nombre]'}\nEmail: ${formData.email || '[Email]'}`;
    try {
      await navigator.clipboard.writeText(draftText);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2500);
    } catch (err) {
      console.error('Failed to copy draft', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subjectMap: Record<string, string> = {
      oferta: `[Oferta Laboral] Contacto de ${formData.company || 'Empresa'} para Alicia Fernández`,
      entrevista: `[Convocatoria Entrevista] ${formData.company || 'Empresa'} - Alicia Fernández`,
      consulta: `[Consulta Profesional] Información de disponibilidad - Alicia Fernández`
    };

    const subject = encodeURIComponent(subjectMap[formData.reason] || 'Contacto Profesional - Alicia Fernández');
    const bodyContent = `Hola Alicia,\n\nMi nombre es ${formData.name || ''} de la empresa ${formData.company || ''}.\n\nMotivo del contacto: ${formData.reason}\n\nDetalle del mensaje:\n${formData.message}\n\nPuede responder a este correo o contactarme en:\nEmail: ${formData.email}\n\nSaludos cordiales,\n${formData.name}`;
    
    const body = encodeURIComponent(bodyContent);

    // Open real native mailto client
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setFormSubmittedToMailto(true);
  };

  return (
    <section id="contacto" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-3">
            <Mail className="w-4 h-4" />
            <span>06. {lang === 'es' ? 'Contacto & Selección' : 'Recruiter Contact'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            {lang === 'es' ? 'Contacto Directo para Empresas' : 'Direct Recruiter Inquiry'}
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-2xl">
            {lang === 'es'
              ? 'Canal preparado para selección de personal, agendamiento de entrevistas o propuestas de contratación con incorporación inmediata.'
              : 'Direct channel for HR recruiters, interview scheduling, and hiring proposals with immediate availability.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Official Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-7 rounded-2xl border border-white/5 space-y-6">
              <h3 className="text-lg font-bold text-white font-display">
                {lang === 'es' ? 'Datos Oficiales del Currículum' : 'Official Resume Contact Info'}
              </h3>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/60 border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-400">{lang === 'es' ? 'Teléfono directo' : 'Direct Phone'}</div>
                    <a 
                      href={`tel:${personalInfo.phone}`}
                      className="text-base font-bold text-white font-mono hover:text-emerald-400 transition-colors block truncate"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/60 border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/15 text-violet-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-400">{lang === 'es' ? 'Correo electrónico' : 'Email Address'}</div>
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm font-semibold text-white font-mono hover:text-violet-400 transition-colors block truncate"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/60 border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">{lang === 'es' ? 'Residencia & Zona de influencia' : 'Location & Area'}</div>
                    <div className="text-sm font-semibold text-white">
                      {personalInfo.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Copy all contact data button */}
              <button
                onClick={handleCopyContactInfo}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl glass-panel text-xs font-mono font-medium text-slate-200 hover:text-white hover:border-blue-400/50 transition-all cursor-pointer"
              >
                {copiedContact ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'es' ? '¡Datos copiados al portapapeles!' : 'Contact info copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>{lang === 'es' ? 'Copiar todos los datos de contacto' : 'Copy all contact details'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Verification badge */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                {lang === 'es'
                  ? 'Todos los datos de contacto provienen exactamente de la cabecera del documento facilitado, sin intermediarios.'
                  : 'All contact details are strictly taken from the provided physical curriculum, without third-party intermediaries.'}
              </p>
            </div>
          </div>

          {/* Right Column: Functional Form for Companies */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-7 sm:p-8 rounded-2xl border border-white/10 relative">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <h3 className="text-lg font-bold text-white font-display">
                  {lang === 'es' ? 'Enviar Propuesta o Convocatoria' : 'Send Proposal or Invitation'}
                </h3>
                <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {lang === 'es' ? 'Formulario Preparado' : 'Form Ready'}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Recruiter Name */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      {lang === 'es' ? 'Nombre o Responsable de Selección *' : 'Recruiter / Contact Name *'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={lang === 'es' ? 'Ej. Carmen Ruiz' : 'e.g. Sarah Jenkins'}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      {lang === 'es' ? 'Empresa u Organización *' : 'Company / Organization *'}
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder={lang === 'es' ? 'Ej. Empresa Logística / Financiera' : 'e.g. Logistics / Financial Corp'}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      {lang === 'es' ? 'Email Corporativo de Contacto *' : 'Work Email *'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={lang === 'es' ? 'rrhh@empresa.com' : 'hr@company.com'}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      {lang === 'es' ? 'Motivo del contacto *' : 'Purpose *'}
                    </label>
                    <select
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      {reasons.map((r) => (
                        <option key={r.id} value={r.id} className="bg-slate-900 text-white">
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    {lang === 'es' ? 'Descripción de la oferta o propuesta *' : 'Job details or proposal *'}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={lang === 'es' 
                      ? 'Indica puesto ofertado, ubicación, jornada o fecha propuesta de entrevista...'
                      : 'Specify role offered, location, work shift, or proposed interview date...'}
                    className="w-full p-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'es' ? 'Abrir en mi Gestor de Correo (Mailto)' : 'Open in Email Client (Mailto)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl glass-panel text-xs font-mono text-slate-300 hover:text-white hover:border-violet-500/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {copiedDraft ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>{lang === 'es' ? '¡Borrador copiado!' : 'Draft copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-400" />
                        <span>{lang === 'es' ? 'Copiar Borrador' : 'Copy Draft'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Transparency Notice (strictly adhering to user request) */}
                <div className="mt-4 p-3.5 rounded-xl bg-slate-950/70 border border-white/5 text-[11px] text-slate-400 leading-relaxed font-mono flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'es'
                      ? 'Arquitectura preparada: Al hacer clic se transfiere el asunto y cuerpo directamente a su cliente de correo sin simular envíos falsos no configurados. Listo para integración con backend SMTP en producción.'
                      : 'Production-ready architecture: Clicking opens your local email client with pre-filled content without fake simulation. Ready for SMTP backend hook in production.'}
                  </span>
                </div>

                {formSubmittedToMailto && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center font-mono">
                    {lang === 'es'
                      ? 'Se ha generado el correo en su aplicación predeterminada para fernandezalmendroalicia@gmail.com'
                      : 'Email draft generated in your default client for fernandezalmendroalicia@gmail.com'}
                  </div>
                )}

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
