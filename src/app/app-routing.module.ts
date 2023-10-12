import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductosComponent } from './components/productos/productos.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'productos', component: ProductosComponent, canActivate: [authGuard]}, // Agregando guard
  {path: '', redirectTo: 'productos', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
