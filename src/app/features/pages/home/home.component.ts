import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LuffyComponent } from '../../../shared/components/luffy/luffy.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddComponent } from '../../components/anime/dialog/add/add.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, LuffyComponent, AddComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [NgbModalConfig, NgbModal],
})
export class HomeComponent {
  title = 'Animes Favoritos';
  constructor(private config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  open(content: any) {
    this.modalService.open(content);
  }
}
