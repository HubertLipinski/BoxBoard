import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './components/alert/alert.component';
import { ProductsComponent } from './components/products/products.component';
import { TokenInterceptor } from './components/Auth/TokenInterceptor';
import { ProductItemComponent } from './components/product-item/product-item.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminIndexComponent } from './components/Auth/AdminPanel/admin-index/admin-index.component';
import { UsersComponent } from './components/Auth/AdminPanel/users/users.component';
import { ProductsAdminComponent } from './components/Auth/AdminPanel/products-admin/products-admin.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AddUserComponent } from './components/Auth/add-user/add-user.component';
import { AddProductComponent } from './components/Auth/add-product/add-product.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    FooterComponent,
    AlertComponent,
    ProductsComponent,
    ProductItemComponent,
    ProductPageComponent,
    ProductFormComponent,
    AdminIndexComponent,
    UsersComponent,
    ProductsAdminComponent,
    UserFormComponent,
    AddUserComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
