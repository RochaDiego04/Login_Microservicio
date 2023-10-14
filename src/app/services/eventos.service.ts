import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Mensaje } from '../models/mensaje.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  public cambioValor: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public mostrarMensaje: BehaviorSubject<Mensaje> = new BehaviorSubject<Mensaje>(new Mensaje());

  constructor() { }
}
