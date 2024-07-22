import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddComponent } from '../../components/anime/dialog/add/add.component';
import { CardAnimeComponent } from '../../../shared/components/card.anime/card.anime.component';
import { Anime } from '../../../core/models/anime.model';
import { AnimeService } from '../../../core/services/anime.service';
import { NgFor } from '@angular/common';
import { PaginateComponent } from '../../../shared/components/paginate/paginate.component';
@Component({
  selector: 'app-favorite.anime',
  standalone: true,
  imports: [
    RouterLink,
    AddComponent,
    CardAnimeComponent,
    NgFor,
    PaginateComponent,
  ],
  templateUrl: './favorite.anime.component.html',
  styleUrl: './favorite.anime.component.css',
  providers: [NgbModalConfig, NgbModal],
})
export class FavoriteAnimeComponent implements OnInit {
  @Output() save = new EventEmitter<void>();
  @Output() deleteE = new EventEmitter<void>();
  @Output() editE = new EventEmitter<Anime>();
  @ViewChild('content') content: TemplateRef<any> | undefined; //Referencia

  title = 'Animes Favoritos';
  animes: Anime[] = [];
  selectedAnime: Anime | null = null;
  // pagination
  paginatedAnimes: Anime[] = [];
  currentPage = 1;
  itemsPerPage = 2;
  totalPages = 1;

  constructor(
    private config: NgbModalConfig,
    private modalService: NgbModal,
    private _service: AnimeService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  onSave(): void {
    this.save.emit();
    this.get();
  }

  onDeleted(): void {
    this.deleteE.emit();
    this.currentPage = 1;
    this.get();
  }
  onEdit(anime: Anime): void {
    this.selectedAnime = anime;
    this.open(this.content);
  }
  ngOnInit(): void {
    this.get();
  }
  get(): void {
    this.animes = this._service.get();
    this.totalPages = Math.ceil(this.animes.length / this.itemsPerPage);
    this.updatePaginatedAnimes();
  }
  updatePaginatedAnimes(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedAnimes = this.animes.slice(start, end);
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
  open(content: TemplateRef<any> | undefined) {
    this.modalService.open(content);
  }
}
