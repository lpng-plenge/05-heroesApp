

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  //referenciar a la variable de entorno de la intrface
  private baseUrl: string= environments.baseUrl;

  constructor(private http: HttpClient) { }


  //Servicio para obtener toda lista de heroes en el backend
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(
      `${this.baseUrl}/heroes`
    );
  }

  //Servicio para obtener información por ID
  getHeroById(id:string): Observable <Hero | undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      )
    ;
  }

  getSuggestions(query: string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);

  }

}
