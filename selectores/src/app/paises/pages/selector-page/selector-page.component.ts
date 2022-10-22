import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/paises.interfaces';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['',Validators.required],
    pais: ['']
  })

  // para llenar el selector de regiones
  regiones: string[] = [];

  // pa[ises
  paises: Country[] = [];

  constructor(private fb: FormBuilder,
              private paisesService:PaisesService) { }


  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    /**
    this.miFormulario.get('region')?.valueChanges
      .subscribe( region => {
        this.paisesService.getPaisesPorRegion(region)
            .subscribe(paises => {
              console.log(paises);
              this.paises = paises
            })
      })
      */

      this.miFormulario.get('region')?.valueChanges
        .pipe(
          tap ( (_) => { // (_) significa que no me importa lo que venga
            // reseteo el pa[is al cambiar la regi[on]
            this.miFormulario.get('pais')?.reset('')
          }),
          switchMap(region => this.paisesService.getPaisesPorRegion(region))
        )
        .subscribe(paises => {this.paises=paises})


  }

  guardar(){
    console.log(this.miFormulario.value);
  }

}
