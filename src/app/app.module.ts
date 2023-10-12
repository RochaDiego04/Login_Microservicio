import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutInterceptor } from './services/aut.interceptor';
import { LoginComponent } from './components/login/login.component';
import { ProductosComponent } from './components/productos/productos.component';
import { FormsModule } from '@angular/forms';

//Angular material
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ComunicacionComponent } from './components/comunicacion/comunicacion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductosComponent,
    ComunicacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
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
