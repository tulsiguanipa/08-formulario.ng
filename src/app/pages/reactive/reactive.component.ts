import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarData();
    this.crearListeners();
   }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }
  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }


  get usuarioNovalido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  
  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }
  get barrioNoValido() {
    return this.forma.get('direccion.barrio').invalid && this.forma.get('direccion.barrio').touched;
  }

  get calleNoValido() {
    return this.forma.get('direccion.calle').invalid && this.forma.get('direccion.calle').touched;
  }

  get pass1Novalido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2Novalido() {
    const pass1 =  this.forma.get('pass1').value;
    const pass2 =  this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;
  }



  crearFormulario() {

  this.forma = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]],
    apellido: ['', [Validators.required, Validators.minLength(5), this.validadores.noGuanipa]],
    correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    pass1: ['', [Validators.required]],
    pass2: ['', [Validators.required]],
    usuario: ['', , this.validadores.existeUsuario],
    direccion: this.formBuilder.group({
      ciudad: ['', Validators.required],
      barrio: ['', Validators.required],
      calle: ['', Validators.required],
    }),
    pasatiempos: this.formBuilder.array([])
  },{
    validators: this.validadores.passwordsIguales('pass1', 'pass2')
  });
}

crearListeners(){
  //valuechange es un observable que reusleve 
  // this.forma.valueChanges.subscribe( valor => {
  //   console.log(valor);
  // });

  // this.forma.statusChanges.subscribe( status => {
  //   console.log(status);
  // })

  this.forma.get('nombre').valueChanges.subscribe( console.log);
}

  cargarData() {
    // this.forma.setValue
    this.forma.reset({
      nombre: 'Juanita',
      apellido: 'Perez',
      correo: 'jp@gmail.com',
      direccion: {
        ciudad: 'Buenos aires',
        barrio: 'chacarita',
        calle: 'Olleros'     },
      pass1: '',
      pass2: ''
    });
}

agregarPasatiempo() {
  this.pasatiempos.push( this.formBuilder.control(' '));
}

borrarPasatiempo( i: number) {
  this.pasatiempos.removeAt(i);
}

  guardar() {

    if (this.forma.invalid) {

      Object.values(this.forma.controls).forEach(control => {

        if ( control instanceof FormGroup ) {
          Object.values(control.controls).forEach( control => {control.markAllAsTouched(); } );
        } else {
          control.markAsTouched();

        }

      });
      return;
    }
    console.log(this.forma);

    // reset de los campos

    this.forma.reset({

    });
  }
}
