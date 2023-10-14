import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent {

  @Input() productoSeleccionado: any = null;
  @Input() productos: Producto[] = [];
  @Input() mostrarEditarProducto: boolean = true;
  @Output() clickCerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickEditar: EventEmitter<Producto> = new EventEmitter<Producto>();

  formProductos = this.fb.group({ // Creacion de reactiveForm
    id: [0, Validators.required], 
    nombre: ["", Validators.required],
    cantidad: [0, Validators.required], 
    precio: [0, Validators.required]
  });

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    if(this.productoSeleccionado) {
      this.formProductos.patchValue(this.productoSeleccionado);
    }
  }

  constructor(private fb: FormBuilder, private peticionesService: PeticionesService) {

  }

  cerrarEditarProducto(){
    this.clickCerrar.emit(true);
  }

  public btn_EditarProducto(){
    let producto = new Producto(
      this.formProductos.get('id')!.value ?? 0, 
      this.formProductos.get('nombre')!.value ?? "",
      this.formProductos.get('cantidad')!.value ?? 0,
      this.formProductos.get('precio')!.value ?? 0
    );
  
    // Validar existencia de id
    if (!this.productos.some(p => p.id === producto.id)) {
      alert("El ID del producto no existe.");
      return;
    }
  
    this.peticionesService.PutProducto(producto).subscribe({
      next:(dato)=>{
        if(dato.ok){
          alert("Producto actualizado");
          console.log("datos de respuesta: ", (dato.datos as Producto));
          // Emitir evento con el producto como argumento para enviarlo al padre
          this.clickEditar.emit(dato.datos as Producto);
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
