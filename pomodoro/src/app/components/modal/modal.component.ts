import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @ViewChild('modalBackground') modalBackground?: ElementRef;
  @Output() ocultarModal = new EventEmitter<string>();
  work: number = 25;
  shortBreak: number = 5;
  longBreak: number = 15;
  mostrar = true;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.work = parseInt(localStorage.getItem('work') || '25', 10);
    this.shortBreak = parseInt(localStorage.getItem('shortBreak') || '5', 10);
    this.longBreak = parseInt(localStorage.getItem('longBreak') || '15', 10);
  }

  cerrarModal() {
    this.mostrar = false;
    this.ocultarModal.emit('true');
  }
  guardarConfiguracion() {
    const workValue = (document.getElementById('work') as HTMLInputElement)
      .value;
    const shortBreakValue = (
      document.getElementById('short-break') as HTMLInputElement
    ).value;
    const longBreakValue = (
      document.getElementById('long-break') as HTMLInputElement
    ).value;

    // Verificar si los campos están vacíos
    if (!workValue || !shortBreakValue || !longBreakValue) {
      // Si alguno de los campos está vacío, resaltar en rojo y salir
      this.marcarCamposInvalidos();
      return;
    }

    // Verificar si los campos contienen solo números
    if (
      !this.esNumero(workValue) ||
      !this.esNumero(shortBreakValue) ||
      !this.esNumero(longBreakValue)
    ) {
      // Si alguno de los campos contiene caracteres no numéricos, resaltar en rojo y salir
      this.marcarCamposInvalidos();
      return;
    }

    // Guardar los valores en el localStorage
    localStorage.setItem('work', workValue);
    localStorage.setItem('shortBreak', shortBreakValue);
    localStorage.setItem('longBreak', longBreakValue);
    this.cerrarModal();
  }

  marcarCamposInvalidos() {
    // Marcar los campos en rojo
    const workInput = document.getElementById('work');
    const shortBreakInput = document.getElementById('short-break');
    const longBreakInput = document.getElementById('long-break');

    if (workInput) workInput.classList.add('invalid');
    if (shortBreakInput) shortBreakInput.classList.add('invalid');
    if (longBreakInput) longBreakInput.classList.add('invalid');
  }

  esNumero(valor: string): boolean {
    return !isNaN(Number(valor));
  }
}
