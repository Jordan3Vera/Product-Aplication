import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../models/interface/product.interface';
import { environment } from 'src/environments/environment';
import { ICompany } from '../models/interface/company.interface';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly controller: string = API + "/product";
  constructor(private http: HttpClient) { }

  header: any = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  }); 

  getProduct(): Observable<IProduct>{
    return this.http.get<IProduct>(this.controller);
  }

  postProduct(product: IProduct): Observable<any>{
    return this.http.post<any>(this.controller, JSON.stringify(product), {headers: this.header});
  }

  putProduct(product: IProduct): Observable<IProduct>{
    return this.http.put<IProduct>(this.controller + `/${product.id}`, JSON.stringify(product), {headers: this.header});
  }

  deleteProduct(id: number): Observable<IProduct>{
    return this.http.delete<IProduct>(this.controller + `/${id}`);
  }
}
