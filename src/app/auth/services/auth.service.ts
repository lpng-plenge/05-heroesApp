import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, tap , of, map, catchError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User| undefined{
    if(!this.user) return undefined;
    //StructuredClone realizara un clon del usuario.
    return structuredClone(this.user);
  }


  login(email:string, password:string): Observable<User>{
    /*http.post()  */
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', user.id.toString()))
      );
  }

  checkAuthentication():Observable<boolean>{
    if (!localStorage.getItem('token') ) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap(user => this.user = user),
      map(user => !!user ),
      catchError(error => of(false))
    );

  }

  logout(){
    //dejar el user limpio
    this.user = undefined;
    //limpiar el local storage
    localStorage.clear();
  }
}
