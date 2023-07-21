import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './global/views/session/login/login.component';
import { ResetPassComponent } from './global/views/session/reset-pass/reset-pass.component';
import { PageNotFoundComponent } from './global/views/page-not-found/page-not-found.component';
import { ProtectRouteGuard } from './shared/guard/protect-route.guard';
import { MainComponent } from './global/layout/main/main.component';
import { UserComponent } from './global/views/home/pages/user/user.component';
import { SupplierComponent } from './global/views/home/pages/supplier/supplier.component';
import { ProductComponent } from './global/views/home/pages/product/product.component';
import { StoreComponent } from './global/views/home/pages/store/store.component';
import { CompanyComponent } from './global/views/home/pages/company/company.component';
import { HomeComponent } from './global/views/home/home.component';
import { RegisterComponent } from './global/views/session/register/register.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-pass', component: ResetPassComponent },
  { 
    path: 'main', 
    component: MainComponent, 
    canActivate: [ProtectRouteGuard],
    children: [
      { path: 'home', component: HomeComponent},
      { path: 'user', component: UserComponent},
      { path: 'supplier', component: SupplierComponent},
      { path: 'product', component: ProductComponent},
      { path: 'store', component: StoreComponent},
      { path: 'company', component: CompanyComponent}
    ] 
  },
  { path: '**', component: PageNotFoundComponent, canActivate: [ProtectRouteGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
