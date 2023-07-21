import { Component, Inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticateService } from '../../../shared/auth/authenticate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              private router: Router,
              private cookies: CookieService,
              private authSvc: AuthenticateService) 
  { }

  // Vars, Objecs and Arrays 
  userReadonly: any;

  items: MenuItem[] = [
    { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: '/main/home'},
    { 
      label: 'Listas',
      icon: 'pi pi-fw pi-database',
      items: [
        { label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: '/main/user'},
        { label: 'Proveedores', icon: 'fa-solid fa-users-line', routerLink: '/main/supplier'},
        { label: 'Almacenes', icon: 'pi pi-fw pi-shopping-cart', routerLink: '/main/store'},
        { label: 'Empresas', icon: 'fa-fw fa-regular fa-building', routerLink: '/main/company'},
        { label: 'Productos', icon: 'fa-fw fa-solid fa-box-open', routerLink: '/main/product'}
      ]
    }

  ];

  ngOnInit(): void {
    this.authSvc.getUser().subscribe({
      next: (data) => {
        let user: any = Object.values(data);
        let token = this.storage.get("token");
        user.map((x: any) => {
          if(x.token === token){
            this.userReadonly = x.username;
          }
        })
      }
    })
  }

  // Methods 
  buttonCloseSession(){ //Este es para cerrar la sesión 
    Swal.fire({
      title: '¿Está seguro que quieres cerrar sesión?',
      showDenyButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Sesión cerrada!',
          icon: 'success',
          text: 'No dudes en regresar',
          timer: 2000,
          showConfirmButton: false,
        }).then((result) => {
          if(result){
            this.storage.remove("isLogguedIn");
            this.cookies.delete("token");
            this.router.navigate(['/']);
          }
        });
      } 
    });
  }

}
