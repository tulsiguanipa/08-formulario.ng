import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noGuanipa( control: FormControl): {[s: string]: boolean} {
    if ( control.value.toLowerCase() === 'guanipa') {
      return {noGuanipa: true};
    }
    return null;
  }
}
