import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyB5PiHB8p2p6WWwkXMvufkB6hXsaVgeVgM';
const CALENDAR_ID = 'primary';

// Google Calendar APIのエンドポイント
const CALENDAR_API_URL = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

interface Event {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
}

const GoogleCalendarAPI = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // APIからイベントを取得する
    const fetchEvents = async () => {
      try {
        const response = await axios.get(CALENDAR_API_URL);
        setEvents(response.data.items);
      } catch (error) {
        setError('Failed to fetch events');
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Upcoming Events</h1>
      {error && <p>{error}</p>}
      <ul>
        {events.length ? (
          events.map((event) => {
            const start = event.start.dateTime || event.start.date;
            return (
              <li key={event.id}>
                {start} - {event.summary}
              </li>
            );
          })
        ) : (
          <p>No events found</p>
        )}
      </ul>
    </div>
  );
};

export default GoogleCalendarAPI;
