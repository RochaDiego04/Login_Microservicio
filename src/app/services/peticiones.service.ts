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

  public GetProductos(pagina: number):Observable<ResponseModel>{
    let direccion = this.Url + "productos?page=" + pagina;
    return this.httpClient.get<ResponseModel>(direccion);
  }

  public PostProducto(datosPost: any) {
    return this.httpClient.post<ResponseModel>(this.Url+"PeticionProductoPost", datosPost);
  }

  public ValidaUsuario(usuario: Login){
    return this.httpClient.post<ResponseModel>(this.Url+"PeticionPost", usuario);
  }

  public CambiarContrasenia(usuario: Login){
    return this.httpClient.put<ResponseModel>(this.Url+"PeticionPut", usuario);
  }

  public eliminarProducto(idProducto: number): Observable<ResponseModel> {
    const url = `${this.Url}PeticionDelete?idProducto=${idProducto}`;
    return this.httpClient.delete<ResponseModel>(url);
  }
  
  public PutProducto(producto: Producto): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.Url+"PeticionProductoPut", producto);
  }
  
  
}
