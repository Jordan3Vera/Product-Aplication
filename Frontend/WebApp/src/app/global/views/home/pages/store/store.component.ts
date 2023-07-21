import { Component, OnInit } from '@angular/core';
import { IStore } from 'src/app/shared/models/interface/store.interface';
import { Title } from '@angular/platform-browser';
import { StoreService } from '../../../../../shared/service/store.service';
import { IProduct } from '../../../../../shared/models/interface/product.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../../../shared/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor(private page: Title, 
              private storeSvc: StoreService,
              private productSvc: ProductService) { }

   // Vars 
   stores: IStore[] = [];
   cols: any[] = [];
   store!: IStore;
   flagTest: any = null;
   storeDialog: boolean = false;

   products: IProduct[] = [];
   selectedProduct!: IProduct;
 
   ngOnInit(): void {
     this.page.setTitle("Home");
     this.getStores();
   }

   form: any = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.maxLength(30)]),
    id_product: new FormControl('',[Validators.required])
   });
 
   getStores(){
    this.storeSvc.getStore().subscribe(data => this.stores = Object.values(data));
    this.productSvc.getProduct().subscribe(data => this.products = Object.values(data));
   }

   openNew(){
    this.flagTest = "new";
    let val: any = {};
    this.store = val;

    this.form.controls['name'].setValue(this.store.name);
    this.form.controls['id_product'].setValue(this.store.id_product);

    this.storeDialog = true;
   }

   saveStore(store: IStore){
    this.storeDialog = false;

    if(this.flagTest == "new"){
      this.storeSvc.postStore(store).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            text: 'Los datos se guardaron correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          
          this.getStores();
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
      store.id = this.store.id;
      this.storeSvc.putStore(store).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            text: 'Los datos se actualizaron correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          
          this.getStores();
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
 
   editStore(store: IStore){
    this.store = {...store}
    this.flagTest = "edit";

    this.form.controls['name'].setValue(this.store.name);
    this.form.controls['id_product'].setValue(this.store.id_product);

    this.storeDialog = true;
   }
 
   deleteStore(store: IStore){
    Swal.fire({
      title: 'Esta seguro?',
        text: `Estas por eliminar el registro "${store.name}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.stores = this.stores.filter(val => val.id !== store.id);
        let values: any = {};
        this.store = values;
        this.storeSvc.deleteStore(store.id).subscribe();
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
    this.storeDialog = false;
   }

}
