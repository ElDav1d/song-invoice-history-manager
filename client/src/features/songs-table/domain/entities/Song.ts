export interface Song {
  id: string;
  name: string;
  author: string;
  progress: number;
  lastClickDate?: string;
  lastClickProgress?: number;
}
