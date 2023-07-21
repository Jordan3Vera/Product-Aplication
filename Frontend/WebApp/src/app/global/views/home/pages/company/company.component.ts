import { Component, OnInit } from '@angular/core';
import { ICompany } from '../../../../../shared/models/interface/company.interface';
import { CompanyService } from '../../../../../shared/service/company.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Company } from 'src/app/shared/models/class/company.clss';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  constructor(private companySvc: CompanyService, 
              private page: Title) 
  { }

  companys: ICompany[] = [];
  company!: ICompany;
  companyDialog: boolean = false;
  submitted!: boolean;
  selectedCompany: ICompany[] = [];
  flagTest: any = null; //Para el tema de almacnar o editar un dato

  ngOnInit(): void {
    this.page.setTitle("Registro de empresas");
    this.getAll();
  }

  getAll(){
    this.companySvc.getCompany().subscribe({
      next: (data) => {
        this.companys = Object.values(data);
      }
    });
  }

  // Method open dialog 
  openNew(){
    this.flagTest = "new";
    let val: any = {};
    this.company = val;

    // Para tener los valores en blanco 
    this.form.controls['name'].setValue(this.company.name);
    this.form.controls['city'].setValue(this.company.city);
    this.form.controls['region'].setValue(this.company.region);
    this.form.controls['country'].setValue(this.company.country);

    this.companyDialog = true;
  } 

  form: any = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Z\s]+$/)]),
    city: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Z\s]+$/)]),
    region: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Z\s]+$/)]),
    country: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z\s]+$/)])
  });

  // Mtethod for save a resource 
  saveCompany(company: ICompany){
    this.companyDialog = false;

    if(this.flagTest == "new"){
      //Para comprobar si existe este valor
      let val: any = {};
      this.company = val;

      if(this.company.name == company.name){
        Swal.fire({
          icon: 'error',
          text: 'Esta empresa ya existe'
        })
      }else{

      this.companySvc.postCompany(company).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            text: 'Los datos se guardaron correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.getAll();
        },
        error: (err) =>{
          Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: 'No se pudo guardar el dato',
            showConfirmButton: false,
            timer: 1700
          }).then((result) => {
            if(result){
              throw new Error("Error al guardar" + err);
            }
          })
        }
      });
    }
    }
    
    if(this.flagTest == "edit"){
      company.id= this.company.id
      this.companySvc.putCompany(company).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            text: 'Los datos se actualizaron correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.getAll();
        },
        error: (err) =>{
          Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: 'No se pudo actualizar el dato',
            showConfirmButton: false,
            timer: 1700
          }).then((result) => {
            if(result){
              throw new Error("Error al actualizar" + err);
            }
          })
        }
      });
    }

  }

  editCompany(company: ICompany){
    this.company = {...company};
    this.flagTest = "edit";

    this.form.controls['name'].setValue(this.company.name);
    this.form.controls['city'].setValue(this.company.city);
    this.form.controls['region'].setValue(this.company.region);
    this.form.controls['country'].setValue(this.company.country);

    this.companyDialog = true;
  }

  // Method for delete resource 
  deleteCompany(company: Company){
    Swal.fire({
      title: 'Esta seguro?',
      text: `Estas por eliminar el registro "${company.name}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.companys = this.companys.filter(val => val.id !== company.id);
        let values: any = {};
        this.company = values;
        this.companySvc.deleteCompany(company.id).subscribe();
        Swal.fire({
          title:'Eliminado!',
          text:'El registro fue eliminado con exito.',
          icon:'success',
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  hideDialog(){
    this.companyDialog = false,
    this.submitted = true;
  }

}
