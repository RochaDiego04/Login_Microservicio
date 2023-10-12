import { Component } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { Login } from 'src/app/models/login.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mostrarProductos: boolean;
  
  loginForm = this.fb.group({
    usuario: ['', [Validators.required]],
    contrasenia: ['', [Validators.required]]
  })

  constructor(private peticionesService: PeticionesService, private fb: FormBuilder, private router: Router){ // Inyeccion de dependencias
    this.mostrarProductos = false;
  }

  public btnActualizar_Click(){
    let usuario = new Login();
    usuario.usuario = this.loginForm.get('usuario')!.value ?? ""; // ! para indicar que no puede ser null
    usuario.contrasenia = this.loginForm.get('contrasenia')!.value ?? ""; // ?? para asignar un valor "" vacío por defecto

    
    this.peticionesService.CambiarContrasenia(usuario).subscribe({
      next:(dato) => {
        if(dato.ok) {
          alert("La contraseña se cambió a: "+ (dato.datos as Login).contrasenia);
        }
        else {
          alert(dato.mensaje);
        }
      },
      error:(error) => {
        console.log("error: ", error.message);
        alert("Error comunicación: "+ error.message);
      }
    });
  }

  public btn_ValidarUsuario(){

    let usuario = new Login();
    usuario.usuario = this.loginForm.get('usuario')!.value ?? ""; // ! para indicar que no puede ser null
    usuario.contrasenia = this.loginForm.get('contrasenia')!.value ?? ""; // ?? para asignar un valor "" vacío por defecto

    this.peticionesService.ValidaUsuario(usuario).subscribe({
      next:(dato)=>{
        if(dato.ok){
          debugger;
          alert("usuario válido");
          this.mostrarProductos = true;
          //Convertir usuario a cadena (JSON)
          let usuarioStr = JSON.stringify(dato.datos as Login);
          localStorage.setItem("usuario", usuarioStr);
          this.router.navigate(['/productos']); //Navigate to home page
          console.log("datos de respuesta: ", (dato.datos as Login));
        }
        else {
          alert(dato.mensaje);
        }
      },
      error: (error) => {}
    });
  }

  public eventoOcultarHijo(mostrar: boolean){
    this.mostrarProductos = mostrar;
  }

  get usuario() { // Hacer el html mas legible
    return this.loginForm.controls['usuario'];
  }

  get contrasenia() { // Hacer el html mas legible
    return this.loginForm.controls['contrasenia'];
  }
}

