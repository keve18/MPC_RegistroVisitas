import { Component, OnInit } from '@angular/core';

import { RegistroServiceService } from 'src/app/services/registro/registro-service.service';

import { IHoraSalida, IRegistro } from 'src/app/interface/registro.interface.js';

import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ModalComponent } from '../modal/modal.component';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


export class RegistroComponent implements OnInit{
  
  dataRegistro:any = []
  modalSwitch:boolean=false;
  mostrarTrRegistro:boolean=false;
  mensajeRespuesta:string = '';
  hraSalida:string='';

  constructor( private _registroService: RegistroServiceService,
               public dialog: MatDialog){}

  ngOnInit(): void {
    
    this.cargaRegistros();
  }
  
  cargaRegistros = () => {
    this._registroService.cargarRegistros().subscribe(
      (data: IRegistro[]) => {
        if (data.length === 0) {
          this.mostrarTrRegistro=true;
          this.mensajeRespuesta = 'Esta tabla no contiene algun registro para mostar'
        } else {
          this.dataRegistro = data.map(registro => {
            registro.btnCheck = registro.h_salida !== '00:00:00';
            registro.btnSalida = registro.h_salida === '00:00:00';
            return registro;
          });
          this.mostrarTrRegistro=false;
        }
      },
      error => console.log('Hubo un error al mostrar los registros', error)
    );
  }

  abrirModal = () => {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.cargaRegistros();
    });
  }
  
  actualizarHraSalida = (registro: IRegistro) => {
    const fechaActual = new Date();
    const horaActual = fechaActual.getHours() + ':' + fechaActual.getMinutes(); // Formato HH:mm
  
    const modificaSalida: IHoraSalida = {
      h_salida: horaActual,
    };
  
    const codigo = registro.item;
  
    if (codigo !== undefined) {
      this._registroService.actualizarSalida(codigo, modificaSalida).subscribe(
        (resul) => {
          console.log('Se actualizó la hora de salida correctamente');
          this.cargaRegistros();
        },
        (error) => {
          console.log('Consulte con el Administrador del sistema');
        }
      );
    }
  };
  
}

