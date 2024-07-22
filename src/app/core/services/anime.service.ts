import { Injectable } from '@angular/core';
import { IBaseInterface } from '../interfaces/base.interfaces';
import { Anime } from '../models/anime.model';

@Injectable({
  providedIn: 'root',
})
export class AnimeService implements IBaseInterface<Anime> {
  private storageKey = 'animeDb';

  constructor() {}

  get(): Anime[] {
    const items = localStorage.getItem(this.storageKey);
    const animes = items
      ? JSON.parse(items).filter((anime: Anime) => anime.active)
      : [];
    return animes.sort(
      (a: Anime, b: Anime) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    );
  }
  getById(id: number): Anime | null {
    const items = this.get();
    return items.find((item) => item.id === id && item.active) || null;
  }

  add(item: Anime): boolean {
    try {
      const items = this.get();
      item.active = true;
      item.creationDate = new Date();
      item.deletedDate = null;
      items.push(item);
      localStorage.setItem(this.storageKey, JSON.stringify(items));
      return true;
    } catch (error) {
      return false;
    }
  }
  update(item: Anime): boolean {
    try {
      const items = this.get();
      const index = items.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        items[index] = item;
        localStorage.setItem(this.storageKey, JSON.stringify(items));
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  delete(id: number): boolean {
    try {
      const items = this.get();
      const index = items.findIndex((item) => item.id === id);

      if (index !== -1) {
        items[index].active = false;
        items[index].deletedDate = new Date();
        localStorage.setItem(this.storageKey, JSON.stringify(items));
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
