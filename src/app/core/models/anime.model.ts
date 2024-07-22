export interface Anime {
  id: number;
  name: string;
  genre: string;
  synopsis: string;
  uri: string | null;
  active: boolean;
  creationDate: Date;
  deletedDate: Date | null;
}
