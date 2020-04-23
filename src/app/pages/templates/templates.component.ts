import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {


  usuario = {
    nombre: 'Tulsi',
    apellido: 'Guanipa',
    correo: 'tulsiguanipa@gmail.com',
    pais: 'ARG',
    genero: ' F '
  };

  paises: any[] = [];


  constructor( private paisService: PaisService) { }

  ngOnInit(): void {

    this.paisService.getPaises()
    .subscribe( paises => {
      this.paises = paises;
      this.paises.unshift ({
        nombre: '[Selecciona un pais]',
        codigo: ' '
      });
      console.log(this.paises);
    });
  }

  guardar(forma: NgForm) {


    if (forma.invalid) {

      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();

      });
      return;
    }

    console.log(forma);
    console.log(forma.value);

  }

}
