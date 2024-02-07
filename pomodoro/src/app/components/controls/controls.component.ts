import { Component, Output, EventEmitter, Input } from '@angular/core';
@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent {
  @Output() start = new EventEmitter<void>();
  @Output() skip = new EventEmitter<void>();
  @Output() stop = new EventEmitter<void>();
  @Input() pausa?: boolean; // Variable de estado para controlar si el cronómetro está en pausa
  primero = true;
  enPausa: boolean = true; // Variable de estado para controlar si el cronómetro está en pausa
  constructor() {
    this.pausa = true;
  }
  startPomodoro() {
    this.start.emit();
    this.primero = false;
  }

  skipPomodoro() {
    this.skip.emit();
  }

  pausePomodoro(): void {
    // Cambia el estado al pausar el pomodoro

    this.stop.emit();
    // Lógica para pausar el pomodoro...
  }
}
