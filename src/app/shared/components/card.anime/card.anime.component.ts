import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Anime } from '../../../core/models/anime.model';
import Swal from 'sweetalert2';
import { AnimeService } from '../../../core/services/anime.service';

@Component({
  selector: 'app-card-anime',
  standalone: true,
  imports: [],
  templateUrl: './card.anime.component.html',
  styleUrl: './card.anime.component.css',
})
export class CardAnimeComponent {
  @Input() anime: Anime | undefined;
  @Output() editE = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  loading: boolean = false;

  constructor(private _service: AnimeService) {}

  edit(anime: Anime | undefined): void {
    this.editE.emit(anime);
  }

  deleted(anime: any): void {
    Swal.fire({
      title: `Eliminar ${anime?.name}?`,
      text: 'Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        try {
          const result = this._service.delete(anime?.id);
          this.delete.emit(anime);
          if (result) {
            Swal.fire({
              icon: 'success',
              title: `Anime ${anime.name} eliminado`,
              text: 'Borrado exitoso!',
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrio un error mientras se intentaba eliminar el anime',
              text: 'Error!',
            });
          }
        } catch (error) {
          alert('Error al guardar el anime');
        } finally {
          this.loading = false;
        }
      }
    });
  }
}
