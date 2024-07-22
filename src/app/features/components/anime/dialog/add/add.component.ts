import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Anime } from '../../../../../core/models/anime.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AnimeService } from '../../../../../core/services/anime.service';
import { NgFor, NgIf } from '@angular/common';
import { GenreService } from '../../../../../core/services/genre.service';
import { Genre } from '../../../../../core/models/genre.model';
import { SanitizerUriPipe } from '../../../../../shared/pipes/sanitizer.uri.pipe';
import { LoadingComponent } from '../../../../../shared/components/loading/loading.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    SanitizerUriPipe,
    LoadingComponent,
  ],
})
export class AddComponent implements OnInit {
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Input() selectedAnime: Anime | null = null;

  animes: Anime[] = [];
  anime: Anime | null = null;
  genres: Genre[] = [];
  loading: boolean = false;
  animeForm: FormGroup;

  constructor(
    private _service: AnimeService,
    private _genreService: GenreService,
    private _router: Router
  ) {
    this.animeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      genre: new FormControl('', [Validators.required]),
      synopsis: new FormControl('', [Validators.required]),
      uri: new FormControl('', [
        Validators.pattern(/^(https?:\/\/)?[^\s]+\.[^\s]+[\/|\?|#].*/),
      ]),
    });
  }

  ngOnInit() {
    this.genres = this._genreService.get();

    if (this.selectedAnime) {
      this.animeForm.patchValue({
        name: this.selectedAnime.name,
        genre: this.selectedAnime.genre,
        synopsis: this.selectedAnime.synopsis,
        uri: this.selectedAnime.uri,
      });
    }
  }

  onSave(): void {
    if (this.animeForm.valid) {
      this.loading = true;

      const anime: Anime = {
        id: this.selectedAnime != null ? this.selectedAnime.id : Date.now(),
        name: this.animeForm.value?.name as string,
        genre: this.animeForm.value?.genre as string,
        synopsis: this.animeForm.value?.synopsis as string,
        uri: this.animeForm.value?.uri as string,
        active: true,
        creationDate:
          this.selectedAnime != null
            ? this.selectedAnime.creationDate
            : new Date(),
        deletedDate: null,
      };
      try {
        const result =
          this.selectedAnime?.id != null
            ? this._service.update(anime)
            : this._service.add(anime);

        if (result) {
          this.save.emit();
          Swal.fire({
            icon: 'success',
            title:
              this.selectedAnime != null
                ? `Anime ${anime.name} actualizado`
                : `Anime ${anime.name} creado`,
            text:
              this.selectedAnime != null
                ? 'Actualizacion exitosa!'
                : 'Registro exitoso!',
            showConfirmButton: false,
            timer: 2000,
          });
          this.animeForm.reset();
          this._router.navigate(['/favorites-animes']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error mientras se intentaba guardar el anime',
            text: 'Error: Campos del formulario no validos!',
          });
        }
      } catch (error) {
        alert('Error al guardar el anime');
      } finally {
        this.loading = false;
      }
    } else {
      this.markAllAsTouched();
    }
  }
  private markAllAsTouched(): void {
    this.animeForm.markAllAsTouched();
  }
  onCancel(): void {
    this.cancel.emit();
  }
}
