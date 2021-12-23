import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {

  texto: string;
  mostrar = false;
  suscription: Subscription;

  constructor(private _imagenService: ImagenService) { 
    this.texto = '';
    this.suscription = this._imagenService.getError().subscribe(data => {
     this.mostrarImagen();
      this.texto = data;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  

  mostrarImagen(){
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 2000);
  }

}
