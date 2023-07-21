import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import  Swal  from 'sweetalert2';

// Service 
import { SupplierService } from 'src/app/shared/service/supplier.service';

// Models 
import { ISupplier } from 'src/app/shared/models/interface/supplier.interface';
import { Supplier } from 'src/app/shared/models/class/supplier.class';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  constructor(private supplierSvc: SupplierService,
              private page: Title)
  { }

  // Variables 
  suppliers: ISupplier[] = [];
  supplier!: ISupplier;
  supplierDialog: boolean = false;
  flagTest: any = null;
  submitted: boolean = false;

  form: any = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z\s]+$/)]),
    lastname: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z\s]+$/)]),
    date: new FormControl('', [Validators.required]),
    phone: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(10)])
  });

  ngOnInit(): void {
    this.page.setTitle("Registro de proveedores");
    this.getAll();

    this.supplierSvc.getSupplier().subscribe({
      next: (data) => {
        console.log(data)
      }
    })
  }

  getAll(){
    this.supplierSvc.getSupplier().subscribe(data => { this.suppliers = Object.values(data)});
  }

  openNew(){
    this.flagTest = "new";
    let val: any = {};
    this.supplier = val;
    this.submitted = false;

    // Para que deje las cajas vacías 
    this.form.controls['name'].setValue(this.supplier.name);
    this.form.controls['lastname'].setValue(this.supplier.lastname);
    this.form.controls['date'].setValue(this.supplier.date);
    this.form.controls['phone'].setValue(this.supplier.phone);

    this.supplierDialog = true;
  }

  
  // Mtethod for save a resource 
  saveSupplier(supplier: ISupplier){
    this.supplierDialog = false;
    let val: any = {};
    this.supplier = val;

    if(this.flagTest == "new"){
      this.supplierSvc.postSupplier(supplier).subscribe({
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
    
    if(this.flagTest == "edit"){
      supplier.id= this.supplier.id

      this.supplierSvc.putSupplier(supplier).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            text: 'Los datos se actualizó correctamente',
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

  editSupplier(supplier: ISupplier){
    this.supplier = {...supplier};
    this.flagTest = "edit";

    // Para filtrar los datos 
    this.form.controls['name'].setValue(this.supplier.name);
    this.form.controls['lastname'].setValue(this.supplier.lastname);
    this.form.controls['date'].setValue(this.supplier.date);
    this.form.controls['phone'].setValue(this.supplier.phone);

    this.supplierDialog = true;
  }

  // Method for delete resource 
  deleteSupplier(supplier: Supplier){
    Swal.fire({
      title: 'Esta seguro?',
      text: `Estas por eliminar el registro "${supplier.name}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.suppliers = this.suppliers.filter(val => val.id !== supplier.id);
        let values: any = {};
        this.supplier = values;
        this.supplierSvc.deleteSupplier(supplier.id).subscribe();
        Swal.fire({
          title:'Eliminado!',
          text:'El registro fue eliminado con exito.',
          icon:'success',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  hideDialog(){
    this.supplierDialog = false
  }

}
