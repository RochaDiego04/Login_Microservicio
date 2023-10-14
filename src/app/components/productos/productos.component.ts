import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { Producto } from 'src/app/models/producto.model';
import { PeticionesService } from 'src/app/services/peticiones.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit  {

  productos: Producto[];
  mostrarAgregarProducto = false;

  constructor(
    private peticionesService: PeticionesService,
    private http: HttpClient,
    private router: Router,
    private confirmationService: ConfirmationService){
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

  editarProducto(producto: Producto) {
    
  }

  eliminarProducto(producto: Producto) {
    this.confirmationService.confirm({
      message: 'Seguro quiere eliminar este producto?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Llamar al método deleteProducto del servicio ProductoService
        this.peticionesService.eliminarProducto(producto.id).subscribe(respuesta => {
          if (respuesta.ok) {
            // Buscar el producto eliminado por su id en el arreglo de productos
            const index = this.productos.findIndex(p => p.id == producto.id);
            this.productos.splice(index, 1);
            alert("El producto ha sido eliminado correctamente");
          }
          else {
            alert(respuesta.mensaje);
          }
        });
      }
    });
  }

}
