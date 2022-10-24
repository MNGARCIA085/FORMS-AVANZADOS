import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country, CountryComplete, Name } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _regiones: string[] = ['Africa','Americas','Asia','Europe','Oceania'];

  private _baseUrl = 'https://restcountries.com/v3.1';

  get regiones(): string[]{
    return [...this._regiones]
  }

  constructor(private http: HttpClient) { }


  getPaisesPorRegion(region:string): Observable<Country[]>{
    return this.http.get<Country[]>(`${this._baseUrl}/region/${region}?fields=cca3,name`);
  }


  // pa[is por code
  getPaisPorCodigo(codigo:string): Observable<Country>{
    const url = `${this._baseUrl}/alpha/${codigo}?fields=cca3,name`;
    return this.http.get<CountryComplete>(url);
  }

  // countries given the codes
  getPaisesPorCodigos(borders:string[]): Observable<Country[]>{

    if (!borders){
      return of([])
    }

    const peticiones: Observable<Country>[] = [];

    borders.forEach(codigo => {
      const peticion = this.getPaisPorCodigo(codigo);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);

  }


}
