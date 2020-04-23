import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private formBuilder: FormBuilder) {
    this.crearFormulario();
    this.cargarData();
   }

  ngOnInit(): void {
  }
  
  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  
  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }
  get barrioNoValido(){
    return this.forma.get('direccion.barrio').invalid && this.forma.get('direccion.barrio').touched;
  }
  
  get calleNoValido(){
    return this.forma.get('direccion.calle').invalid && this.forma.get('direccion.calle').touched;
  }
  
  


  crearFormulario() {

  this.forma = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]],
    apellido: ['', [Validators.required, Validators.minLength(5)]],
    correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    direccion: this.formBuilder.group({
      ciudad: ['', Validators.required],
      barrio: ['', Validators.required],
      calle: ['', Validators.required],


    })
  });
  

  }

  cargarData(){
    //this.forma.setValue
    this.forma.reset({
      nombre: 'Juanita',
      apellido: 'Perez',
      correo: 'jp@gmail.com',
      direccion: {
        ciudad: 'Buenos aires',
        barrio: 'chacarita',
        calle: "Olleros"
        }
    });
}

  guardar(){

    if (this.forma.invalid) {

      Object.values(this.forma.controls).forEach(control => {

        if( control instanceof FormGroup ){
          Object.values(control.controls).forEach(control => {control.markAllAsTouched();})
        }else{
          control.markAsTouched();

        }

      });
      return;
    }
    console.log(this.forma);

    //reset de los campos

    this.forma.reset({
      
    });
  }
}
