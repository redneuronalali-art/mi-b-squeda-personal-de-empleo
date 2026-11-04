export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  htmlLink?: string;
  attendees?: Array<{
    email: string;
    displayName?: string;
    responseStatus?: string;
  }>;
}

export interface NewEventPayload {
  summary: string;
  description: string;
  location?: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  attendeeEmail?: string;
}

const CALENDAR_API_BASE = 'https://www.googleapis.com/calendar/v3';

export const listCalendarEvents = async (accessToken: string): Promise<CalendarEvent[]> => {
  const now = new Date().toISOString();
  const url = `${CALENDAR_API_BASE}/calendars/primary/events?timeMin=${encodeURIComponent(now)}&singleEvents=true&orderBy=startTime&maxResults=15`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Error al obtener eventos de Google Calendar: ${response.statusText}`);
  }

  const data = await response.json();
  return data.items || [];
};

export const createCalendarEvent = async (
  accessToken: string,
  payload: NewEventPayload
): Promise<CalendarEvent> => {
  const url = `${CALENDAR_API_BASE}/calendars/primary/events?sendUpdates=all`;

  const body: any = {
    summary: payload.summary,
    description: payload.description,
    start: {
      dateTime: payload.startTime,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Madrid',
    },
    end: {
      dateTime: payload.endTime,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Madrid',
    },
  };

  if (payload.location) {
    body.location = payload.location;
  }

  if (payload.attendeeEmail) {
    body.attendees = [
      { email: payload.attendeeEmail },
      { email: 'fernandezalmendroalicia@gmail.com', displayName: 'Alicia Fernández Almendro' }
    ];
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Error al crear evento en Google Calendar: ${response.statusText}`);
  }

  return await response.json();
};

export const deleteCalendarEvent = async (
  accessToken: string,
  eventId: string
): Promise<void> => {
  const url = `${CALENDAR_API_BASE}/calendars/primary/events/${encodeURIComponent(eventId)}?sendUpdates=all`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok && response.status !== 404) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Error al eliminar evento: ${response.statusText}`);
  }
};
