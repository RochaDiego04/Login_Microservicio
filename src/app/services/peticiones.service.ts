import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/response.model';
import { map, Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

    Url = environment.URL_Peticiones +"Peticiones/"; // Controlador

  constructor(private httpClient: HttpClient) { }

  public GetProductos(pagina:number):Observable<ResponseModel>{
    let direccion = this.Url + "productos?page=" + pagina;
    return this.httpClient.get<ResponseModel>(direccion);
  }

  public ValidaUsuario(usuario: Login){
    return this.httpClient.post<ResponseModel>(this.Url+"PeticionPost", usuario);
  }

  public CambiarContrasenia(usuario: Login){
    return this.httpClient.put<ResponseModel>(this.Url+"PeticionPut", usuario);
  }
  
}
