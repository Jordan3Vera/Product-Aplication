import { Component, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Title } from '@angular/platform-browser';
import { Router, UrlTree } from '@angular/router';
import { AuthenticateService } from '../../../../shared/auth/authenticate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              private page: Title,
              private router: Router,
              private auth: AuthenticateService) 
  { }

  // Vars 
  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.page.setTitle("Iniciar sesión");
    this.storage.set("isLoggedIn",this.isLoggedIn);
    this.storage.remove("username");
    this.storage.remove("token");
  }


  // Methods
  login(){
    this.isLoggedIn = false;

    if(this.email != '' || this.password != ''){
      this.auth.getUser().subscribe({
        next: (data) => {
          // Guardo el resultado en un variable 
          let users = Object.values(data);
          const result = users.filter(item => item.email ==this.email && item.password == this.password);

          Swal.fire({
            icon: 'error',
            text: 'El correo o la contraseña son incorrectos',
            showConfirmButton: false,
            timer: 1500
          });
          
          result.map(i => {
            Swal.fire({
                  icon: 'success',
                  text: 'Los datos son correctos',
                  showConfirmButton: false,
                  timer: 1500
              }).then((result) => {
                  if(result){
                    this.storage.set("isLoggedIn",true);
                    this.storage.set("token",i.token);
                    this.router.navigate(['/main/home']);
                  }
              });
          });

          /*const result = users.find(item => this.email == item.email && this.password == item.password);

          if(result){
            Swal.fire({
                icon: 'success',
                text: 'Los datos son correctos',
                showConfirmButton: false,
                timer: 1500
            }).then((res) => {
                if(res){      
                  this.storage.set("isLoggedIn",true);
                  this.router.navigate(['/main/home']);
                }
            });
          }*/
        },
        error: (err: any) => {
          throw new Error("Error" + err);
        }
      });
    }else{
      Swal.fire({
        icon: 'info',
        title: 'Advertencia',
        text: 'Ningún campo debe quedar vacío',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

}
