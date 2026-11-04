import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  googleSignIn, 
  getAccessToken, 
  logout, 
  initAuth 
} from '../lib/firebaseAuth';
import { 
  listCalendarEvents, 
  createCalendarEvent, 
  deleteCalendarEvent, 
  CalendarEvent,
  NewEventPayload 
} from '../services/calendarService';
import { cvData } from '../data/cvData';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MapPin, 
  PhoneCall, 
  Plus, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  ShieldCheck, 
  Sparkles,
  CalendarDays,
  UserCheck
} from 'lucide-react';
import { User } from 'firebase/auth';

export const CalendarSection: React.FC = () => {
  const { lang } = useLanguage();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Calendar State
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [activeTab, setActiveTab] = useState<'schedule' | 'events'>('schedule');

  // New Event Form State
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [formState, setFormState] = useState({
    title: lang === 'es' ? 'Entrevista de selección - Alicia Fernández' : 'Job Interview - Alicia Fernández',
    company: '',
    date: defaultDateStr,
    time: '10:00',
    durationMinutes: 45,
    type: 'meet', // 'meet' | 'phone' | 'onsite'
    locationOrLink: 'Google Meet',
    notes: ''
  });

  // Modals for confirmation
  const [isConfirmCreateOpen, setIsConfirmCreateOpen] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [createSuccessMsg, setCreateSuccessMsg] = useState<string | null>(null);

  const [eventToDelete, setEventToDelete] = useState<CalendarEvent | null>(null);
  const [isDeletingEvent, setIsDeletingEvent] = useState(false);

  // Initialize Auth state listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
        loadEvents(token);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
        setEvents([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setAccessToken(result.accessToken);
        await loadEvents(result.accessToken);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setAuthError(err.message || 'Error al conectar con Google Calendar.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    setAccessToken(null);
    setEvents([]);
  };

  const loadEvents = async (token: string) => {
    setLoadingEvents(true);
    try {
      const items = await listCalendarEvents(token);
      setEvents(items);
    } catch (err) {
      console.error('Failed to load calendar events', err);
    } finally {
      setLoadingEvents(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: name === 'durationMinutes' ? Number(value) : value
    }));
  };

  const handleTypeChange = (type: string) => {
    let loc = 'Google Meet';
    if (type === 'phone') loc = `${lang === 'es' ? 'Llamada telefónica a' : 'Phone call to'} ${cvData.personalInfo.phone}`;
    if (type === 'onsite') loc = 'Illescas / Oficinas de empresa';

    setFormState(prev => ({
      ...prev,
      type,
      locationOrLink: loc
    }));
  };

  const handleSubmitSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmCreateOpen(true);
  };

  // Perform create event
  const confirmCreateEvent = async () => {
    if (!accessToken) return;
    setIsCreatingEvent(true);
    setCreateSuccessMsg(null);

    try {
      const startDateTime = new Date(`${formState.date}T${formState.time}:00`);
      const endDateTime = new Date(startDateTime.getTime() + formState.durationMinutes * 60 * 1000);

      const payload: NewEventPayload = {
        summary: formState.title,
        description: `Entrevista programada para Alicia Fernández Almendro (${cvData.personalInfo.phone} · ${cvData.personalInfo.email}).\nEmpresa: ${formState.company || 'Selección'}\nModalidad: ${formState.type}\nNotas: ${formState.notes || 'Ninguna'}`,
        location: formState.locationOrLink,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        attendeeEmail: currentUser?.email || undefined
      };

      await createCalendarEvent(accessToken, payload);
      setCreateSuccessMsg(lang === 'es' ? '¡Reunión programada con éxito en Google Calendar!' : 'Event scheduled successfully in Google Calendar!');
      setIsConfirmCreateOpen(false);
      await loadEvents(accessToken);
      setActiveTab('events');
      setTimeout(() => setCreateSuccessMsg(null), 5000);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Error al crear evento');
    } finally {
      setIsCreatingEvent(false);
    }
  };

  // Perform delete event
  const confirmDeleteEvent = async () => {
    if (!accessToken || !eventToDelete) return;
    setIsDeletingEvent(true);

    try {
      await deleteCalendarEvent(accessToken, eventToDelete.id);
      setEvents(prev => prev.filter(e => e.id !== eventToDelete.id));
      setEventToDelete(null);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Error al cancelar evento');
    } finally {
      setIsDeletingEvent(false);
    }
  };

  return (
    <section id="calendar" className="py-20 relative">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-violet-600/10 blur-[130px] pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-3">
              <CalendarDays className="w-4 h-4 text-blue-400" />
              <span>07. Google Workspace · Google Calendar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              {lang === 'es' ? 'Agendar Entrevista en Google Calendar' : 'Schedule Interview via Google Calendar'}
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl">
              {lang === 'es'
                ? 'Conecta directamente con tu cuenta de Google para agendar una entrevista laboral, videollamada o consulta técnica con Alicia Fernández Almendro, sincronizándola en tu propio calendario oficial.'
                : 'Connect with your Google account to book a job interview, video meeting, or call directly with Alicia Fernández Almendro, synchronized on your official Google Calendar.'}
            </p>
          </div>

          {/* User state badge if logged in */}
          {currentUser && (
            <div className="flex items-center gap-3 p-2.5 rounded-xl glass-panel border-emerald-500/30">
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || 'Google User'} 
                  className="w-9 h-9 rounded-full border border-emerald-400/50"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center font-mono text-sm">
                  {currentUser.displayName ? currentUser.displayName[0] : 'G'}
                </div>
              )}
              <div className="min-w-0 pr-2">
                <div className="text-xs font-bold text-white truncate max-w-[150px]">
                  {currentUser.displayName || 'Usuario Google'}
                </div>
                <div className="text-[11px] font-mono text-emerald-400 truncate max-w-[150px]">
                  {currentUser.email}
                </div>
              </div>
              <button
                onClick={handleLogout}
                title={lang === 'es' ? 'Cerrar sesión' : 'Sign out'}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Not Authenticated State: Official Google Sign-in Prompt */}
        {!currentUser ? (
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 text-center max-w-3xl mx-auto relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-[#040817]">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-violet-600/20 border border-white/10 flex items-center justify-center mx-auto mb-6 text-blue-400 shadow-lg shadow-blue-500/10">
              <CalendarIcon className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white font-display mb-3">
              {lang === 'es' ? 'Sincronización Directa de Entrevistas' : 'Direct Calendar Interview Sync'}
            </h3>

            <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
              {lang === 'es'
                ? 'Para coordinar una reunión oficial, inicia sesión con Google. Podrás seleccionar fecha, hora y modalidad (Google Meet, telefónica o presencial) y el evento se registrará automáticamente en tu Google Calendar con invitación a la candidata.'
                : 'To book an interview, sign in with your Google account. You will be able to select date, time, and format (Google Meet, phone, or in-person) and the event will be automatically created on your Google Calendar.'}
            </p>

            {/* Official Google Sign In Button */}
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleGoogleLogin}
                disabled={isSigningIn}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm shadow-xl shadow-blue-500/10 hover:shadow-blue-500/25 transition-all cursor-pointer group disabled:opacity-50"
              >
                {/* Official Google "G" Logo SVG */}
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>
                  {isSigningIn 
                    ? (lang === 'es' ? 'Conectando con Google...' : 'Connecting to Google...') 
                    : (lang === 'es' ? 'Iniciar sesión con Google para agendar' : 'Sign in with Google to schedule')}
                </span>
              </button>

              {authError && (
                <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 px-4 py-2 rounded-lg border border-rose-500/20 font-mono mt-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  {lang === 'es' 
                    ? 'Conexión segura oficial mediante Google OAuth y Firebase Authentication' 
                    : 'Official secure connection via Google OAuth and Firebase Authentication'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated State: Schedule Console */
          <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 bg-slate-900/70">
            
            {/* Success notification banner */}
            {createSuccessMsg && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>{createSuccessMsg}</span>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all cursor-pointer ${
                  activeTab === 'schedule'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'es' ? '1. Agendar Nueva Entrevista' : '1. Schedule New Interview'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('events');
                  if (accessToken) loadEvents(accessToken);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all cursor-pointer ${
                  activeTab === 'events'
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <CalendarIcon className="w-4 h-4" />
                <span>
                  {lang === 'es' ? '2. Próximos Eventos en Calendar' : '2. Upcoming Calendar Events'} ({events.length})
                </span>
              </button>
            </div>

            {/* Tab 1: Schedule Form */}
            {activeTab === 'schedule' && (
              <form onSubmit={handleSubmitSchedule} className="space-y-6 max-w-4xl">
                
                {/* Meeting Mode Selector */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    {lang === 'es' ? 'Modalidad de la entrevista *' : 'Interview Format *'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => handleTypeChange('meet')}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        formState.type === 'meet'
                          ? 'border-blue-500 bg-blue-500/10 text-white shadow-md shadow-blue-500/20'
                          : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Video className="w-5 h-5 text-blue-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">Google Meet</div>
                        <div className="text-[11px] text-slate-400">Videollamada online</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTypeChange('phone')}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        formState.type === 'phone'
                          ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-md shadow-emerald-500/20'
                          : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">{lang === 'es' ? 'Telefónica' : 'Phone Call'}</div>
                        <div className="text-[11px] text-slate-400">{cvData.personalInfo.phone}</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTypeChange('onsite')}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        formState.type === 'onsite'
                          ? 'border-violet-500 bg-violet-500/10 text-white shadow-md shadow-violet-500/20'
                          : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      <MapPin className="w-5 h-5 text-violet-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">{lang === 'es' ? 'Presencial' : 'In-Person'}</div>
                        <div className="text-[11px] text-slate-400">Illescas / Oficinas</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Event Title & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      {lang === 'es' ? 'Título del evento en Calendar *' : 'Event Title in Calendar *'}
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formState.title}
                      onChange={handleFormChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      {lang === 'es' ? 'Empresa / Entidad convocante *' : 'Hiring Company / Entity *'}
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      placeholder={lang === 'es' ? 'Ej. Dpto. Selección de Personal' : 'e.g. HR Talent Acquisition'}
                      value={formState.company}
                      onChange={handleFormChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Date, Time & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      {lang === 'es' ? 'Fecha de la reunión *' : 'Meeting Date *'}
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formState.date}
                      onChange={handleFormChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      {lang === 'es' ? 'Hora de inicio *' : 'Start Time *'}
                    </label>
                    <input
                      type="time"
                      name="time"
                      required
                      value={formState.time}
                      onChange={handleFormChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      {lang === 'es' ? 'Duración estimada *' : 'Duration *'}
                    </label>
                    <select
                      name="durationMinutes"
                      value={formState.durationMinutes}
                      onChange={handleFormChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    >
                      <option value={30} className="bg-slate-900">30 minutos</option>
                      <option value={45} className="bg-slate-900">45 minutos</option>
                      <option value={60} className="bg-slate-900">60 minutos (1 hora)</option>
                    </select>
                  </div>
                </div>

                {/* Location / Meeting link */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    {lang === 'es' ? 'Ubicación o enlace de reunión' : 'Location or Meeting Link'}
                  </label>
                  <input
                    type="text"
                    name="locationOrLink"
                    value={formState.locationOrLink}
                    onChange={handleFormChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    {lang === 'es' ? 'Notas o temática de la reunión' : 'Meeting Notes / Agenda'}
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder={lang === 'es' ? 'Detalles de la posición, personas que asistirán, etc.' : 'Position details, attendees, etc.'}
                    value={formState.notes}
                    onChange={handleFormChange}
                    className="w-full p-3 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-slate-400 font-mono">
                    {lang === 'es' ? 'Se registrará en tu calendario principal con permiso explícito.' : 'Will be created in your primary calendar with your permission.'}
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    <span>{lang === 'es' ? 'Revisar y Agendar en Google Calendar' : 'Review & Schedule in Google Calendar'}</span>
                  </button>
                </div>

              </form>
            )}

            {/* Tab 2: Existing Calendar Events List */}
            {activeTab === 'events' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-white font-display">
                    {lang === 'es' ? 'Eventos y Reuniones Próximas' : 'Upcoming Calendar Events'}
                  </h4>
                  <button
                    onClick={() => accessToken && loadEvents(accessToken)}
                    disabled={loadingEvents}
                    className="text-xs font-mono text-blue-400 hover:text-blue-300 disabled:opacity-50"
                  >
                    {loadingEvents ? (lang === 'es' ? 'Actualizando...' : 'Refreshing...') : (lang === 'es' ? 'Actualizar' : 'Refresh')}
                  </button>
                </div>

                {events.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-slate-950/50 border border-white/5 text-center">
                    <CalendarIcon className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <div className="text-sm text-slate-300 font-semibold mb-1">
                      {lang === 'es' ? 'No hay eventos próximos registrados' : 'No upcoming events found'}
                    </div>
                    <p className="text-xs text-slate-500 mb-4">
                      {lang === 'es' ? 'Agenda tu primera entrevista utilizando la pestaña "Agendar Nueva Entrevista".' : 'Schedule your first interview using the Schedule tab.'}
                    </p>
                    <button
                      onClick={() => setActiveTab('schedule')}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium"
                    >
                      {lang === 'es' ? 'Ir al formulario' : 'Go to form'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {events.map((evt) => {
                      const startTime = evt.start.dateTime 
                        ? new Date(evt.start.dateTime).toLocaleString(lang === 'es' ? 'es-ES' : 'en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          })
                        : evt.start.date;

                      return (
                        <div
                          key={evt.id}
                          className="p-4 rounded-xl bg-slate-950/60 border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                              <span>{evt.summary}</span>
                            </div>
                            <div className="text-xs text-blue-400 font-mono flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{startTime}</span>
                            </div>
                            {evt.location && (
                              <div className="text-xs text-slate-400 flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-violet-400" />
                                <span>{evt.location}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            {evt.htmlLink && (
                              <a
                                href={evt.htmlLink}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
                                title="Ver en Google Calendar"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Google Calendar</span>
                              </a>
                            )}

                            <button
                              onClick={() => setEventToDelete(evt)}
                              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
                              title={lang === 'es' ? 'Eliminar evento' : 'Delete event'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>

      {/* Confirmation Modal for Creating Event (Mandatory User Confirmation) */}
      {isConfirmCreateOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-2xl max-w-lg w-full border border-blue-500/30 shadow-2xl bg-slate-900">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  {lang === 'es' ? 'Confirmar cita en Google Calendar' : 'Confirm Google Calendar Event'}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {lang === 'es' ? 'Operación de escritura con tu permiso' : 'Calendar write operation with your consent'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2 mb-6 text-xs text-slate-300">
              <div><strong>{lang === 'es' ? 'Título:' : 'Title:'}</strong> {formState.title}</div>
              <div><strong>{lang === 'es' ? 'Empresa:' : 'Company:'}</strong> {formState.company}</div>
              <div><strong>{lang === 'es' ? 'Fecha y Hora:' : 'Date & Time:'}</strong> {formState.date} a las {formState.time} ({formState.durationMinutes} min)</div>
              <div><strong>{lang === 'es' ? 'Modalidad:' : 'Format:'}</strong> {formState.type.toUpperCase()} ({formState.locationOrLink})</div>
              <div><strong>{lang === 'es' ? 'Asistentes:' : 'Attendees:'}</strong> {currentUser?.email} y {cvData.personalInfo.email}</div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsConfirmCreateOpen(false)}
                disabled={isCreatingEvent}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
              >
                {lang === 'es' ? 'Cancelar' : 'Cancel'}
              </button>

              <button
                onClick={confirmCreateEvent}
                disabled={isCreatingEvent}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isCreatingEvent ? (
                  <span>{lang === 'es' ? 'Registrando en Calendar...' : 'Creating in Calendar...'}</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{lang === 'es' ? 'Confirmar y Agendar' : 'Confirm & Schedule'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Deleting Event (Mandatory User Confirmation for Destructive Action) */}
      {eventToDelete && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-2xl max-w-md w-full border border-rose-500/30 shadow-2xl bg-slate-900">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  {lang === 'es' ? '¿Cancelar este evento de Google Calendar?' : 'Cancel Google Calendar Event?'}
                </h3>
                <p className="text-xs text-rose-400 font-mono">
                  {lang === 'es' ? 'Esta acción eliminará el evento de tu calendario' : 'This action will delete the event from your calendar'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-6">
              {lang === 'es'
                ? `¿Estás seguro de que deseas eliminar permanentemente "${eventToDelete.summary}" de tu cuenta de Google Calendar?`
                : `Are you sure you want to permanently remove "${eventToDelete.summary}" from your Google Calendar account?`}
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setEventToDelete(null)}
                disabled={isDeletingEvent}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
              >
                {lang === 'es' ? 'Volver' : 'Keep Event'}
              </button>

              <button
                onClick={confirmDeleteEvent}
                disabled={isDeletingEvent}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isDeletingEvent ? (
                  <span>{lang === 'es' ? 'Eliminando...' : 'Deleting...'}</span>
                ) : (
                  <span>{lang === 'es' ? 'Sí, eliminar evento' : 'Yes, Delete Event'}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
