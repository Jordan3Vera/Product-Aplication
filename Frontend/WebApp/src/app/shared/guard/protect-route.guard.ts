import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../auth/authenticate.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProtectRouteGuard implements CanActivate {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              private auth: AuthenticateService,
              private router: Router)
  {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(!this.storage.get("isLoggedIn")){
        Swal.fire({
          icon: 'info',
          title: 'Advertencia',
          text: 'Debes loguearte',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/']);
        return false;
      }
      return true;
  }
  
}
