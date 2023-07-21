import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routes 
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Forms 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Libraries 
import { PrimengModule } from './global/libraries/primeng.module';
import { MaterialModule } from './global/libraries/material.module';

// Components 
import { AppComponent } from './app.component';
import { HomeComponent } from './global/views/home/home.component';

// Session components 
import { LoginComponent } from './global/views/session/login/login.component';
import { ResetPassComponent } from './global/views/session/reset-pass/reset-pass.component';

// Layouts components
import { NavbarComponent } from './global/layout/navbar/navbar.component';
import { MainComponent } from './global/layout/main/main.component';
import { FooterComponent } from './global/layout/footer/footer.component';

// Component always redirect injection 
import { PageNotFoundComponent } from './global/views/page-not-found/page-not-found.component';
import { AuthenticateService } from './shared/auth/authenticate.service';
import { CompanyComponent } from './global/views/home/pages/company/company.component';
import { SupplierComponent } from './global/views/home/pages/supplier/supplier.component';
import { ProductComponent } from './global/views/home/pages/product/product.component';
import { StoreComponent } from './global/views/home/pages/store/store.component';
import { CookieService } from 'ngx-cookie-service';
import { FormCompanyComponent } from './shared/widget/form-company/form-company.component';
import { FormProductComponent } from './shared/widget/form-product/form-product.component';
import { FormSupplierComponent } from './shared/widget/form-supplier/form-supplier.component';
import { FormStoreComponent } from './shared/widget/form-store/form-store.component';
import { UserComponent } from './global/views/home/pages/user/user.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { RegisterComponent } from './global/views/session/register/register.component';
import { NavbarSessionComponent } from './global/views/session/navbar-session/navbar-session.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ResetPassComponent,
    NavbarComponent,
    MainComponent,
    FooterComponent,
    PageNotFoundComponent,
    CompanyComponent,
    SupplierComponent,
    ProductComponent,
    StoreComponent,
    FormCompanyComponent,
    FormProductComponent,
    FormSupplierComponent,
    FormStoreComponent,
    UserComponent,
    RegisterComponent,
    NavbarSessionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [AuthenticateService,CookieService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
