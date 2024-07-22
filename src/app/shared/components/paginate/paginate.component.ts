import { Component, Input, OnInit } from '@angular/core';
import { Anime } from '../../../core/models/anime.model';
import { CardAnimeComponent } from '../card.anime/card.anime.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-paginate',
  standalone: true,
  imports: [CardAnimeComponent, NgFor],
  templateUrl: './paginate.component.html',
  styleUrl: './paginate.component.css',
})
export class PaginateComponent implements OnInit {
  @Input() animes: Anime[] = [];
  paginatedAnimes: Anime[] = [];

  currentPage = 1;
  itemsPerPage = 2;
  totalPages = 1;

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.animes.length / this.itemsPerPage);
    this.updatePaginatedAnimes();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedAnimes();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedAnimes();
    }
  }

  updatePaginatedAnimes(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedAnimes = this.animes.slice(start, end);
  }
}
