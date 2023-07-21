import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/service/product.service';
import { IProduct } from '../../../../../shared/models/interface/product.interface';
import { Title } from '@angular/platform-browser';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ISupplier } from '../../../../../shared/models/interface/supplier.interface';
import { SupplierService } from '../../../../../shared/service/supplier.service';
import { CompanyService } from '../../../../../shared/service/company.service';
import { ICompany } from '../../../../../shared/models/interface/company.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private productSvc: ProductService,
              private supplierSvc: SupplierService,
              private companySvc: CompanyService,
              private page: Title) { }

  products: IProduct[] = [];
  product!: IProduct;
  productDialog: boolean = false;
  selectedProduct: IProduct[] = [];
  flagTest: any = null;

  suppliers: ISupplier[] = [];
  selectedSupplier!: ISupplier;
  companys: ICompany[] = [];
  selectedCompany!: ICompany;

  ngOnInit(): void {
    this.page.setTitle("Registro de productos");
    this.getProducts();


    // Ejemplo para ver que tiene el controlador 
    this.productSvc.getProduct().subscribe({
      next: data => {
        console.log("API controller product",data)
        for(let i of Object.values(data)){
          console.log(i.companys)
        }
      }
    });
  }

  form: any = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.maxLength(30),Validators.pattern(/^[a-zA-Z\s]+$/)]),
    gamma: new FormControl('',[Validators.required,Validators.maxLength(20),Validators.pattern(/^[a-zA-Z\s]+$/)]),
    description: new FormControl('',[Validators.required,Validators.maxLength(350)]),
    stock: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]+$/),Validators.min(0),Validators.maxLength(4)]),
    price: new FormControl('',Validators.required),
    suppliers: new FormControl('',[Validators.required]),
    companys: new FormControl('',[Validators.required])
  });

  getProducts(){
    this.productSvc.getProduct().subscribe((data) => this.products = Object.values(data));
    this.supplierSvc.getSupplier().subscribe((data) => this.suppliers = Object.values(data));
    this.companySvc.getCompany().subscribe((data) => this.companys = Object.values(data));
  }

  openNew(){
    this.flagTest = "new";
    let val: any = {}; //Para dejar los campos vacíos
    this.product = val;

    // Para que el furmlario quede vacío
    this.form.controls['name'].setValue(this.product.name);
    this.form.controls['gamma'].setValue(this.product.gamma);
    this.form.controls['description'].setValue(this.product.description);
    this.form.controls['stock'].setValue(this.product.stock);
    this.form.controls['price'].setValue(this.product.price);
    this.form.controls['suppliers'].setValue(this.product.supplierId);
    this.form.controls['companys'].setValue(this.product.companyId);

    this.productDialog = true;
  }

  saveProduct(product: IProduct){
    this.productDialog = false;

    if(this.flagTest == "new"){
      this.productSvc.postProduct(product).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            text: 'Los datos se guardaron correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          
          this.getProducts();
        },
        error: (err) => { 
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
          });
        }
      });
    }

    if(this.flagTest == "edit"){
      product.id = this.product.id;
      this.productSvc.putProduct(product).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            text: 'Los datos se actualizaron correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          
          this.getProducts();
        },
        error: (err) => { 
          Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: 'No se pudo actualizar el dato',
            showConfirmButton: false,
            timer: 1700
          }).then((result) => {
            if(result){
              throw new Error("Error al guardar" + err);
            }
          });
        }
      });
    }
  }

  editProduct(product: IProduct){
    this.product = {...product}
    this.flagTest = "edit";

    // Traigo y muestro los valores en el formulario 
    this.form.controls['name'].setValue(this.product.name);
    this.form.controls['gamma'].setValue(this.product.gamma);
    this.form.controls['description'].setValue(this.product.description);
    this.form.controls['stock'].setValue(this.product.stock);
    this.form.controls['price'].setValue(this.product.price);
    this.form.controls['suppliers'].setValue(this.product.supplierId);
    this.form.controls['companys'].setValue(this.product.companyId);

    this.productDialog = true;
  }

  deleteProduct(product: IProduct){
    Swal.fire({
      title: 'Esta seguro?',
        text: `Estas por eliminar el registro "${product.name}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.products = this.products.filter(val => val.id !== product.id);
        let values: any = {};
        this.product = values;
        this.productSvc.deleteProduct(product.id).subscribe();
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
    this.productDialog = false;
  }
}
