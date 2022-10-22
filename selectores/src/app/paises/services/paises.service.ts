import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _regiones: string[] = ['Africa','Americas','Asia','Europe','Oceania'];

  private _baseUrl = 'https://restcountries.com/v3.1/region';

  get regiones(): string[]{
    return [...this._regiones]
  }

  constructor(private http: HttpClient) { }


  getPaisesPorRegion(region:string): Observable<Country[]>{
    return this.http.get<Country[]>(`${this._baseUrl}/${region}?fields=cca3,name`);
  }


}
