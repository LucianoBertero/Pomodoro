import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  modalVisible: boolean = false;
  tiempo: string = '25:00';
  orden = [1, 2, 1, 2, 1, 2, 1, 3];
  ordenOriginal = [1, 2, 1, 2, 1, 2, 1, 3];
  pausado = false;
  durationInSeconds: number = 1500; // Duración inicial del pomodoro en segundos (25 minutos)
  timeRemaining: number = this.durationInSeconds; // Tiempo restante del pomodoro, inicialmente igual a la duración
  activeItem = 'work';
  timerInterval: any = this.timeRemaining;
  enPausa = false;

  //TODO 1. Crear un método para actualizar el contador
  //TODO 2. Crear un método para iniciar el contador
  //TODO 3. Crear un método para detener el contador

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    localStorage.setItem('work', '25');
    localStorage.setItem('shortBreak', '5');
    localStorage.setItem('longBreak', '15');
  }
  // Variable para almacenar el tiempo restante

  actualizarContador(opcion: string) {
    this.enPausa = true;
    this.stopPomodoro();
    console.log(this.enPausa);
    this.modalVisible = false;
    switch (opcion) {
      case 'pomodoro':
        this.timeRemaining =
          parseInt(localStorage.getItem('work') || '15', 10) * 60;
        let index = this.orden.indexOf(2);
        console.log(this.orden);
        if (index !== -1) {
          // Si se encuentra, mueve todos los elementos que están antes de esta ocurrencia al final del array
          this.orden = this.orden
            .slice(index)
            .concat(this.orden.slice(0, index));
        }
        console.log(this.orden);
        this.cambiarContador('work');
        break;
      case 'short-break':
        this.timeRemaining =
          parseInt(localStorage.getItem('shortBreak') || '15', 10) * 60;
        let index2 = this.orden.indexOf(3);
        console.log(this.orden);
        if (index2 !== -1) {
          // Si se encuentra, mueve todos los elementos que están antes de esta ocurrencia al final del array
          this.orden = this.orden
            .slice(index2)
            .concat(this.orden.slice(0, index2));
        }
        console.log(this.orden);
        this.cambiarContador('short-break');
        break;
      case 'large-break':
        this.timeRemaining =
          parseInt(localStorage.getItem('longBreak') || '15', 10) * 60;
        const index3 = this.orden.indexOf(1);
        console.log(this.orden);
        if (index3 !== -1) {
          // Si se encuentra, mueve todos los elementos que están antes de esta ocurrencia al final del array
          this.orden = this.orden
            .slice(index3)
            .concat(this.orden.slice(0, index3));
        }
        this.cambiarContador('large-break');
        console.log(this.orden);
        break;
      default:
        break;
    }
  }
  // Variable para almacenar el intervalo del temporizador

  startPomodoro() {
    this.enPausa = false;
    if (this.pausado === true) {
      this.contar();
      this.pausado = false;
      return;
    }
    if (this.orden[0] === 1) {
      this.cambiarContador('work');
      console.log('trabajo');
      this.siguienteElemento();
      let longBreak = parseInt(localStorage.getItem('longBreak') || '15', 10);
      let work = parseInt(localStorage.getItem('work') || '15', 10);
      console.log(work);
      console.log(longBreak);
      this.timeRemaining = work * 60;
      this.contar();
      return;
    }

    if (this.orden[0] === 2) {
      this.cambiarContador('short-break');
      this.siguienteElemento();
      console.log('pausa corta');
      let shortBreak = parseInt(localStorage.getItem('shortBreak') || '15', 10);
      let work = parseInt(localStorage.getItem('work') || '15', 10);
      console.log(work);
      console.log(shortBreak);
      this.timeRemaining = shortBreak * 60;
      this.contar();
      return;
    }

    if (this.orden[0] === 3) {
      this.siguienteElemento();
      this.cambiarContador('large-break');
      console.log('pausa larga');
      let longBreak = parseInt(localStorage.getItem('longBreak') || '15', 10);

      console.log(longBreak);
      this.timeRemaining = longBreak * 60;
      this.contar();
      return;
    }

    // console.log('first');
    // this.timerInterval = setInterval(() => {
    //   if (this.timeRemaining > 0) {
    //     this.timeRemaining--;
    //   } else {
    //     clearInterval(this.timerInterval);
    //   }
    // }, 1000); // Intervalo de 1 segundo
  }
  siguienteElemento() {
    let primerElemento: number | undefined = this.orden.shift() as number;

    this.orden.push(primerElemento);
  }

  contar() {
    console.log('first');
    clearInterval(this.timerInterval); // Borra el intervalo anterior, si existe
    this.timerInterval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        clearInterval(this.timerInterval); // Borra el intervalo cuando el tiempo restante llega a cero
        this.startPomodoro();
      }
    }, 1000); // Intervalo de 1 segundo
  }

  stopPomodoro() {
    clearInterval(this.timerInterval);
    this.pausado = true;
    this.enPausa = true;
  }
  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    const formattedMinutes: string = ('0' + minutes).slice(-2); // Agrega un cero adelante si es necesario
    const formattedSeconds: string = ('0' + remainingSeconds).slice(-2); // Agrega un cero adelante si es necesario
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  openModal() {
    this.modalVisible = true;
  }

  saltarPomodoro() {
    this.startPomodoro();
  }

  cambiarContador(item: string) {
    this.activeItem = item;
    // Aquí puedes agregar la lógica adicional si es necesario
  }

  ocultarModal() {
    console.log('activo');
    this.modalVisible = false;
    this.timeRemaining = parseFloat(localStorage.getItem('work') || '15') * 60;
    console.log(this.timeRemaining);
  }
}

//12121213
