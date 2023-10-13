import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AutInterceptor } from './services/aut.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Components
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ComunicacionComponent } from './components/comunicacion/comunicacion.component';
import { EditarProductosComponent } from './components/productos/editar-productos/editar-productos.component';
import { AgregarProductosComponent } from './components/productos/agregar-productos/agregar-productos.component';
//Angular material
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
//Ng Prime
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductosComponent,
    ComunicacionComponent,
    EditarProductosComponent,
    AgregarProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputNumberModule
  ],
  providers: [
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
