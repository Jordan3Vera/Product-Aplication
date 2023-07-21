import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStore } from '../models/interface/store.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private readonly controllerApi = API + "/store"; 
  constructor(private http: HttpClient) { }

  header: any = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  }); 

  getStore(): Observable<IStore>{
    return this.http.get<IStore>(this.controllerApi);
  }

  postStore(store: IStore): Observable<any>{
    return this.http.post<any>(this.controllerApi, JSON.stringify(store), {headers: this.header});
  }

  putStore(store: IStore): Observable<IStore>{
    return this.http.put<IStore>(this.controllerApi + `/${store.id}`, JSON.stringify(store), {headers: this.header});
  }

  deleteStore(id: number): Observable<IStore>{
    return this.http.delete<IStore>(this.controllerApi + `/${id}`);
  }
}
