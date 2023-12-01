import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

/* modulo propios del sistema*/
import { SharedModule } from '../shared/shared.module';

/*componentes del sistema */
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistroComponent } from './registro/registro.component';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    DashboardComponent,
    RegistroComponent,
    ModalComponent
  ],
  exports: [
    DashboardComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ComponentsModule { }
