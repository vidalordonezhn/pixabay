import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {

  termino: string;
  suscription: Subscription;
  listImagenes: any[] = [];
  loading = false;
  imagensPorPagina = 28;
  paginaActual = 1;
  calcularTotalPaginas = 0;

  constructor(private _imagenService: ImagenService) {
    this.termino = '';
    this.suscription = this._imagenService.getTerminoBusqueda().subscribe(data => {
      this.termino = data;
      this.paginaActual = 1;
      this.loading = true;
     this.obtenerImagenes();
    })
   
   }

  ngOnInit(): void {
  }


  obtenerImagenes() {
   
    this.loading = false;
    
     this._imagenService.getImagenes(this.termino, this.imagensPorPagina, this.paginaActual).subscribe(data => {
       if(data.hits.length === 0){
         this._imagenService.setError('Opps.. no encontramos ningun resultado');
         return;
       }

       this.calcularTotalPaginas = Math.ceil(data.totalHits / this.imagensPorPagina);

       this.listImagenes = data.hits;
     }, error => {
       this._imagenService.setError('Opps... ah ocurrido un error intenta mas tarde');
       this.loading = false;
     })
  }

  paginaAnterior(){
    this.paginaActual--;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

  paginaSiguiente(){
    this.paginaActual++;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

  paginaAnteriorClass(){
    if(this.paginaActual === 1){
      return false;
    }else{
      return true;
    }
  }

  paginaSiguienteClass(){
    if(this.paginaActual === this.calcularTotalPaginas){
      return false;
    }else{
      return true;
    }
  }

}
