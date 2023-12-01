import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IRegistro } from 'src/app/interface/registro.interface';

import { RegistroServiceService } from 'src/app/services/registro/registro-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() actualizarRegistros: EventEmitter<void> = new EventEmitter<void>();
  
  FormRegistro!:FormGroup
  dataRegistro:any = []
  mostrarTrRegistro:boolean=false;
  mensajeRespuesta:string = '';
  
  constructor(private fb:FormBuilder,
              private _registroService: RegistroServiceService,
              public dialogRef: MatDialogRef<ModalComponent>){};
    

    
  ngOnInit(): void {
    this.FormularioRegistro();
    this.cargaDatosModal();
  }

  consultarDNI = (event: any) => {
    const dniControl = this.FormRegistro.get('tipo_doc');
    if (event.key === 'Enter') {
      event.preventDefault();
      if (dniControl && dniControl.value) {
        this._registroService.consultarDNI(dniControl.value).subscribe((data) => {
          const nroDNI = data.dni;
          const nomCompleto = data.nombres + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno;
          this.FormRegistro.patchValue({
            tipo_doc: nroDNI,
            visitante: nomCompleto
          });
        });
      } else {
        console.error('Número de DNI no válido');
      }
      return;
    }
  };

  resetForm() {
    this.FormRegistro.reset(); // Esto reseteará los valores del formulario
    this.cargaDatosModal();
  }

  cargaDatosModal = ()=>{
    
    // Obtener la fecha actual
  const fechaActual = new Date();
  const formatoFecha = fechaActual.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  const horaActual = fechaActual.getHours() + ':' + fechaActual.getMinutes(); // Formato HH:mm

  // Establecer la fecha actual en el control 'fecha' del formulario
  this.FormRegistro.patchValue({
    fecha: formatoFecha,
    h_ingreso: horaActual, // Asigna la hora actual al control 'h_ingreso' del formulario
  });
  }


  addRegistro = () => {
    console.log('guardar info desde modal');
  if (this.FormRegistro.valid) {
    const formulario = this.FormRegistro.value;
    this._registroService.insertRegistro(formulario).subscribe(
      (result) => {
        console.log('Se registró correctamente');
        this.closeModal(); // Llama a closeModal después de completar el registro
        this.resetForm();
        this.cargaRegistros();
      },
      (error) => {
        console.log('Consulte con el Administrador del sistema');
      }
    );
  } else {
    console.error('Formulario no válido. Por favor, complete todos los campos requeridos.');
  }
};
cargaRegistros = () => {
  this._registroService.cargarRegistros().subscribe(
    (data: IRegistro[]) => {
      if (data.length === 0) {
        this.mostrarTrRegistro=true;
        this.mensajeRespuesta = 'Esta tabla no contiene algun registro para mostar'
      } else {
        this.dataRegistro = data
        this.mostrarTrRegistro=false;
        console.log(this.dataRegistro);
      }
    },
    error => console.log('Hubo un error al mostrar los registros', error)
  );
}
closeModal = () => {
  this.dialogRef.close('Some data to return to the opener component');
  this.actualizarRegistros.emit(); // Emitir el evento al componente padre al cerrar el modal
};
  FormularioRegistro = ()=>{
    this.FormRegistro = this.fb.group({
      tipo_doc:['',Validators.required],
      visitante:[''],
      tipo_persona:['',Validators.required],
      fecha:['',Validators.required],
      h_ingreso:['',Validators.required],
      institucion:[''],
      emp_publico:['',Validators.required],
      of_visitada:['',Validators.required],
      mot_visita:['',Validators.required],
      h_salida:['00:00']
    });
  }

}
