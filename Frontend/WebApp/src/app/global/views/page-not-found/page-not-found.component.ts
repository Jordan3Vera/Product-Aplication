import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              private page: Title, private router: Router) 
  { }

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.page.setTitle("Página no encontrada");

    // this.isLoggedIn = false;

    if(!this.isLoggedIn){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Página no econtrada',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/main/home']);
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Página no encontrada',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
