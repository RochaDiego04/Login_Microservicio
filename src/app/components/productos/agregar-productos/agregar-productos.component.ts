import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css']
})
export class AgregarProductosComponent {

  @Input() mostrarAgregarProducto: boolean = true;
  @Output() clickCerrar: EventEmitter<boolean> = new EventEmitter<boolean>();

  formProductos = this.fb.group({ // Creacion de reactiveForm
    id: ["", Validators.required], 
    nombre: ["", Validators.required],
    cantidad: [0, Validators.required], 
    precio: [0, Validators.required]
  });

  constructor(private fb: FormBuilder) {

  }

  cerrarAgregarProducto(){
    this.clickCerrar.emit(true);
  }

  agregarProducto() {
    console.log(this.formProductos);
  }
}
