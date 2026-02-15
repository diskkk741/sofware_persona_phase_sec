import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title = 'birkelime.';
  @Input() subtitle = 'Her gün 1 kelime • CRUD + LocalStorage';
  @Input() logoUrl: string | null = null;
}
