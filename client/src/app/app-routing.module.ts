import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';
import {LoginComponent} from './components/Auth/login/login.component';
import {RegisterComponent} from './components/Auth/register/register.component';
import {ProductsComponent} from './components/products/products.component';
import {ProductPageComponent} from './components/product-page/product-page.component';
import {AdminIndexComponent} from './components/Auth/AdminPanel/admin-index/admin-index.component';
import {UserAdminService} from './services/user-admin.service';
import {UsersComponent} from './components/Auth/AdminPanel/users/users.component';
import {ProductsAdminComponent} from './components/Auth/AdminPanel/products-admin/products-admin.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductPageComponent },
  {
    path: 'admin',
    component: AdminIndexComponent,
    canActivate: [UserAdminService],
    children: [
      { path: 'users', component:  UsersComponent },
      { path: 'products', component:  ProductsAdminComponent },
      {path: '', redirectTo: 'users', pathMatch: 'full'},
      // { path: 'products/edit/:id', component:  ProductPageComponent, data: {edit: true} }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
