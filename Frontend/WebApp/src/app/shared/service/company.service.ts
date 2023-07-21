import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompany } from '../models/interface/company.interface';
import { environment } from '../../../environments/environment';
import { Company } from '../models/class/company.clss';

//API
const ENVIROMENTSETED: string = environment.API;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly controllerApi = ENVIROMENTSETED + '/company';
  constructor(private http: HttpClient) { }

  header: any = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  }); 

  getCompany(): Observable<ICompany>{
    return this.http.get<ICompany>(this.controllerApi);
  }

  postCompany(company: ICompany): Observable<any>{
    return this.http.post<any>(this.controllerApi, JSON.stringify(company), {headers: this.header});
  } 

  putCompany(company: ICompany): Observable<ICompany>{
    return this.http.put<ICompany>(this.controllerApi + `/${company.id}`, JSON.stringify(company), {headers: this.header});
  }

  deleteCompany(id: number): Observable<ICompany>{
    return this.http.delete<ICompany>(this.controllerApi + `/${id}`);
  }
}
