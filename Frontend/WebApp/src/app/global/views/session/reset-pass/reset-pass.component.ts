import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AuthenticateService } from '../../../../shared/auth/authenticate.service';
import Swal from 'sweetalert2';
import { IUser } from '../../../../shared/models/interface/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              private page: Title,
              private auth: AuthenticateService,
              private router: Router) 
  { }

  ngOnInit() {
    this.page.setTitle("Restablecer contraseña");
    this.storage.remove("email");
    this.storage.remove("id");
    this.storage.remove("token");
  }

  // Vars
  email: any;
  password: string = '';
  confirmPass: string = '';
  formPass: boolean = false;

  // Methods 
  EmailConfirm(){
    if(this.email == ''){
      Swal.fire({
        icon: 'info',
        text: 'El campo está vacío',
        timer: 1500,
        showConfirmButton: false
      });
    }else{
      this.auth.getUser().subscribe({
        next: (data) => {
          let user = Object.values(data);
          let res = user.filter(item => this.email === item.email);

          Swal.fire({
            icon: 'error',
            text: 'El correo electrónico es incorrecto',
            showConfirmButton: false,
            timer: 1500
          });

          res.map((item) => {
            Swal.fire({
              icon: 'success',
              text: 'El dato es correcto',
              showConfirmButton: false,
              timer: 1500
            }).then((result: any) => {
              if(result){
                this.formPass = true;
                this.storage.set("id",item.id);
              }
            });
          });
        },
        error: (err) => {
          throw new Error("Error al hacer la peticíon de usuario" + err)
        }
      })
    }
  }

  ChangePassword(){
    if(this.password != '' || this.confirmPass != ''){
      if(this.password == this.confirmPass){
        this.auth.getUser().subscribe((data) => {
          let user = Object.values(data);
          
          
          // Abtengo los valores de session 
          let id = this.storage.get("id");

          // let passChange = user.find(item => email == item.email && token == item.token);

          let change: IUser = {
            id: id,
            password: this.password
          }

 
              this.auth.putPassword(change).subscribe({
                next: (data) => {
                  Swal.fire({
                    icon: 'success',
                    text: 'La contraseña se cambió correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  }).then((res) => {
                    if(res){
                      this.storage.remove("id");
                      this.router.navigate(['/']);
                    }
                  });
                },
                error: (err) => {
                  Swal.fire({
                    icon: 'error',
                    title: "Alerta",
                    showConfirmButton: false,
                    timer: 1500
                  }).then((e) => {
                    if(e){
                      throw new Error(err);
                    }
                  })
                }
              });
      
          
        });
      
        
      }else{
        Swal.fire({
          icon: 'error',
          text: 'Las contraseñas no son iguales',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }else{
      Swal.fire({
        icon: 'info',
        title: 'Advertencia',
        text: 'Los campos siguen vacíos',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
