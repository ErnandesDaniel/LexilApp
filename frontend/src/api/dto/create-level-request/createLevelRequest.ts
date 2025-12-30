export interface CreateLevelRequest {
  name: string;
  interval_minutes: number;
  interval_hours: number;
  interval_days: number;
  order?: number; // Опционально, если auto-assign
}
