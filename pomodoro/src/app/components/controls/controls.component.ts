import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent {
  @Output() start = new EventEmitter<void>();
  @Output() skip = new EventEmitter<void>();
  @Output() stop = new EventEmitter<void>();
  enPausa: boolean = true; // Variable de estado para controlar si el cronómetro está en pausa

  startPomodoro() {
    this.enPausa = false;
    this.start.emit();
  }

  skipPomodoro() {
    this.skip.emit();
  }

  pausePomodoro(): void {
    // Cambia el estado al pausar el pomodoro
    this.enPausa = true;
    this.stop.emit();
    // Lógica para pausar el pomodoro...
  }
}
