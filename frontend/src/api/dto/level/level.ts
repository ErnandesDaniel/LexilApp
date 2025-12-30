export interface Level {
  id: string;
  name: string; // Название уровня, напр. "Уровень 1"
  interval_minutes: number;
  interval_hours: number;
  interval_days: number;
  order: number; // Порядок уровня
  user_id: string;
  created_at: string;
  updated_at: string;
}
