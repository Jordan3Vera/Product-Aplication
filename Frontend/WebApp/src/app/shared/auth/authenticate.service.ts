import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../models/interface/user.interface';

// API route 
const ENVIROMENTSETED = environment.API;

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient,
              private cookies: CookieService) 
  { }

  public readonly header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
    'scope': '...lo que sea...',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE'
  });

  //Para crear un token JWT
  setToken(token: string){
    this.cookies.set(`${token}`,token);
  }

  getToken(){
    return console.log(this.cookies.get("token"));
  }

  getUser(){
    return this.http.get(ENVIROMENTSETED + '/user',);
  }

  postUser(user: any): Observable<IUser>{
    return this.http.post<IUser>(ENVIROMENTSETED + '/user', JSON.stringify(user), {headers: this.header});
  }

  putPassword(user: any): Observable<IUser>{
    return this.http.put<IUser>(ENVIROMENTSETED + `/user/${user.id}`, JSON.stringify(user), {headers: this.header} );
  }

  getUserLogged(){
    const token = this.getToken();
    //Aquí iría el endpoint para devolver el usuario para el token
  }
}
