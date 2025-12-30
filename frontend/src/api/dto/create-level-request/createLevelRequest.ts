export interface CreateLevelRequest {
  interval_minutes: number;
  interval_hours: number;
  interval_days: number;
  order?: number; // Авто присвоится если не указано
}
