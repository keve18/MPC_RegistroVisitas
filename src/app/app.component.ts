import { Component, OnInit } from '@angular/core';



declare function CargarFuncionNuevamente():any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sistema';

  ngOnInit(): void {
    CargarFuncionNuevamente();
  }
}
