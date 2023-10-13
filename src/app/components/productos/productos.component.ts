import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { Producto } from 'src/app/models/producto.model';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { Table } from 'primeng/table'; 

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit  {

  productos: Producto[];
  mostrarAgregarProducto = false;

  constructor(private peticionesService: PeticionesService, private http: HttpClient , private router: Router){
    this.productos = []
  }

  ngOnInit() {
    // Llama a la función peticionGet cuando se inicializa el componente
    this.peticionGet();
  }
  
  public peticionGet() { // Obtener lista de productos
    this.peticionesService.GetProductos(1).subscribe(data =>{
      if (data.ok) {
        this.productos = data.datos;
      }
      else {
        alert(data.mensaje);
      }
    })
  }
  

  logOut() {
    localStorage.removeItem('usuario');
    this.router.navigate(['login']);
  }

  mostrarComponenteAgregarProducto() {
    this.mostrarAgregarProducto = true;
  }

  ocultarAgregarProducto(estaCerrada: boolean){
    this.mostrarAgregarProducto = !estaCerrada;
  }

  agregarProductoALista(producto: Producto) {
    this.productos = [...this.productos, producto];
    console.log(this.productos);
  }

  

}
