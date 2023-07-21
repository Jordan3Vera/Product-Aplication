import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticateService } from '../../../../shared/auth/authenticate.service';
import Swal from 'sweetalert2';
import { IUser } from '../../../../shared/models/interface/user.interface';
import { Router } from '@angular/router';
import * as Crypto from 'crypto-js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EncrDecrService } from '../../../../shared/hashed/encr-decr.service';
import { keySecret } from '../../../../shared/constant/secretKey.const';
import { map } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private page: Title,
              private authSvc: AuthenticateService,
              private router: Router,
              private hashed: EncrDecrService,
              private message: MessageService) { }

  ngOnInit(): void {
    this.page.setTitle("Registrarse");
    this.authSvc.getUser().pipe(map(x => console.log(x))).subscribe();
  }

  //Guardando datos con el modo de NgModels **************************/
  // username: any;
  // email: any;
  // password: any;
  // confirmPassword: any;
  // token: any;

  // Registrando un usuario con el ngmodel 
  // register(){

  //   let user: IUser = {
  //     username: this.username,
  //     email: this.email,
  //     password: this.password,
  //     confirmPassword: this.confirmPassword,
  //     token: this.token
  //   }

  //   if(this.username != '', this.email != '', this.password != '', this.confirmPassword != ''){
  //     if(this.password == this.confirmPassword){
  //       console.log(user)
  //       // this.authSvc.postUser(user).subscribe({
  //       //   next: () => {
  //       //     Swal.fire({
  //       //       icon: 'success',
  //       //       title: 'Exito',
  //       //       text: 'El registro se creó correctamente',
  //       //       showConfirmButton: false,
  //       //       timer: 1500
  //       //     }).then((res) => {
  //       //       if(res){
  //       //         this.router.navigate(['/']);
  //       //       }
  //       //     })
  //       //   },
  //       //   error: (err) => {
  //       //     Swal.fire({
  //       //       icon: 'error',
  //       //       title: 'Ups!',
  //       //       text: 'Fíjate en la consola el error',
  //       //       showConfirmButton: false,
  //       //       timer: 1500
  //       //     }).then((res) => {
  //       //       if(res){
  //       //         throw new Error("Erros" + err);
  //       //       }
  //       //     });
  //       //   }
  //       // });
  //     }else{
  //       Swal.fire({
  //         icon: 'error',
  //         text: 'Las contraseñas son distintas',
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //     }
  //   }else{
  //     Swal.fire({
  //       icon: 'info',
  //       text: 'Nigún campo puede quedar vacío',
  //       showConfirmButton: false,
  //       timer: 1500
  //     });
  //   }
  // }

  // Registrando un usarios con FormControl
  /****************************************************************** */

  // Variables 
  private clave = keySecret.key;
  users: IUser[] = [];

  // Utilizo el form control 
  form: any = new FormGroup({
    username: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    password: new FormControl('',[Validators.required,Validators.min(4)]),
    confirmPassword: new FormControl('',Validators.required),
    token: new FormControl('token')
  });
  
  register(){

    //Este modo es para encriptar desde el front -- Hay que revisar ya que solo se encrypta desde el servidor
    let encrypted = this.hashed.set(this.clave, this.form.value.password);
    let encryptedConfirm = this.hashed.set(this.clave, this.form.value.confirmPassword);
    // let token = this.hashed.set(this.clave, this.form.value.token)
    // let user: IUser = {
    //   username: this.form.value.username,
    //   email: this.form.value.email,
    //   password: encrypted,
    //   confirmPassword: encryptedConfirm,
    //   token: token
    // }
    /*********************************************** */

    // Guardo los valores ingresados 
    let user: IUser = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      confirmPassword: this.form.value.confirmPassword,
      token: this.form.value.token
    }

    // Para verificar si existe en el servidor 
    let verifyUsername = this.form.value.username;
    let verifyEmail = this.form.value.email;
    let respEmail: boolean, respUsername: boolean = false;

    if(this.form.value.username != '' || this.form.value.email != '' || this.form.value.password != '' || this.form.value.confirmPassword != ''){
      this.authSvc.getUser().subscribe((res: any) => {
        this.users = [];
        this.users = res;
  
        // Recorro y consulto si son iguales(exists)
        for(let user of this.users){
          if(user.email === verifyEmail){
            respEmail = true;
          }
  
          if(user.username === verifyUsername){
            respUsername = true;
          }
        }
  
        if(respUsername === true){
          Swal.fire({
            icon: 'error',
            title: 'Error de registro',
            text: 'Este usuario ya está en uso, elija otro...',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          }).then((res) => {
            if(res.value){
              this.form.reset();
            }
          });
        }

        //Verifico las respuestas
        if(respEmail === true){
          Swal.fire({
            icon: 'error',
            title: 'Error de registro',
            text: 'Este correo ya está en uso, elija otro...',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          }).then((res) => {
            if(res.value){
              this.form.reset();
            }
          });
        }
        else{//Si todo está correcto entonces los guardo
          if(this.form.value.password == this.form.value.confirmPassword){
            // console.log(user);
  
            // El servicio que recibe el objeto
            this.authSvc.postUser(user).subscribe({
              next: () => {
                Swal.fire({//Confirmo que el registro fue exitoso
                  icon: 'success',
                  title: 'Exito',
                  text: 'El registro se creó correctamente',
                  showConfirmButton: false,
                  timer: 1500
                }).then((res) => {
                  if(res){
                    this.router.navigate(['/']);
                  }
                })
              },
              error: (err) => {//Por si hay error con el servidor
                Swal.fire({
                  icon: 'error',
                  title: 'Ups!',
                  text: 'Fíjate en la consola el error',
                  showConfirmButton: false,
                  timer: 1500
                }).then((res) => {
                  if(res){
                    throw new Error("Erros" + err);
                  }
                });
              }
            });
          }else{
            Swal.fire({
              icon: 'error',
              text: 'Las contraseñas son distintas',
              showConfirmButton: false,
              timer: 1500
            });
          }
        }
    });
    }else{
      if(this.form.value.email == ''){
        Swal.fire({
          icon: 'info',
          title: 'Advertencia',
          text: 'El correo es requerido',
          showConfirmButton: false,
          timer: 1500
        });
      }
      Swal.fire({
        icon: 'info',
        title: 'Advertencia',
        text: 'Ningú campo debe quedar vacío',
        showConfirmButton: false,
        timer: 1500
      });
    }

    // Busca la lista de usuarios 
  
  }
}
