import { Injectable } from '@angular/core';
import { Genre } from '../models/genre.model';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private genres: Genre[] = [
    { value: 'Drama', label: 'Drama' },
    { value: 'Comedia', label: 'Comedia' },
    { value: 'Accion', label: 'Accion' },
  ];

  get(): Genre[] {
    return this.genres;
  }
}
