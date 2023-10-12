import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  constructor(private router: Router){

  }

  logOut() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('contrasenia');
    this.router.navigate(['login']);
  }
}
