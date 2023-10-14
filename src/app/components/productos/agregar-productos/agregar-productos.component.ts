import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css']
})
export class AgregarProductosComponent implements OnInit  {

  @Input() productos: Producto[] = [];
  @Input() mostrarAgregarProducto: boolean = true;
  @Output() clickCerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAgregar: EventEmitter<Producto> = new EventEmitter<Producto>();

  formProductos = this.fb.group({ // Creacion de reactiveForm
    id: [0, Validators.required], 
    nombre: ["", Validators.required],
    cantidad: [0, Validators.required], 
    precio: [0, Validators.required]
  });

  ngOnInit(): void {
    this.btn_limpiarFormulario();
  }

  constructor(private fb: FormBuilder, private peticionesService: PeticionesService) {

  }

  cerrarAgregarProducto(){
    this.clickCerrar.emit(true);
  }

  public btn_AgregarProducto(){

    let producto = new Producto(
      this.formProductos.get('id')!.value ?? 0, 
      this.formProductos.get('nombre')!.value ?? "",
      this.formProductos.get('cantidad')!.value ?? 0,
      this.formProductos.get('precio')!.value ?? 0
    );

    // Validar existencia de id
    if (this.productos.some(p => p.id === producto.id)) {
      alert("El ID del producto ya existe.");
      return;
    }

    this.peticionesService.PostProducto(producto).subscribe({
      next:(dato)=>{
        if(dato.ok){
          alert("Producto agregado");
          console.log("datos de respuesta: ", (dato.datos as Producto));
          // Emitir evento con el producto como argumento para enviarlo al padre
          this.clickAgregar.emit(dato.datos as Producto);
          this.formProductos.reset();
          this.clickCerrar.emit(true);
        }
        else {
          alert(dato.mensaje);
        }
      },
      error: (error) => {}
    });
  }

  public btn_limpiarFormulario() {
    this.formProductos.reset();
  }

}
