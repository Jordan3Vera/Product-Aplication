import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISupplier } from '../models/interface/supplier.interface';


const ENVIROMENTSETED: string = environment.API;

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private readonly controllerApi = ENVIROMENTSETED + '/supplier';
  
  constructor(private http: HttpClient) { }

  header: any = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  }); 

  getSupplier(): Observable<ISupplier>{
    return this.http.get<ISupplier>(this.controllerApi);
  }

  postSupplier(supplier: ISupplier): Observable<any>{
    return this.http.post<any>(this.controllerApi, JSON.stringify(supplier), {headers: this.header});
  } 

  putSupplier(supplier: ISupplier): Observable<ISupplier>{
    return this.http.put<ISupplier>(this.controllerApi + `/${supplier.id}`, JSON.stringify(supplier), {headers: this.header});
  }

  deleteSupplier(id: number): Observable<ISupplier>{
    return this.http.delete<ISupplier>(this.controllerApi + `/${id}`);
  }
}
