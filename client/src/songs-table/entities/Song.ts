export interface Song {
  id: string;
  name: string;
  author: string;
  progress: number;
  last_click_date?: Date;
  last_click_progress?: number;
}
