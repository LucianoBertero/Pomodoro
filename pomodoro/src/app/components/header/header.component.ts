import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() contadorCambiado = new EventEmitter<string>();

  @Input() activeItem: string | undefined;

  cambiarContador(opcion: string) {
    this.contadorCambiado.emit(opcion);
  }
}
