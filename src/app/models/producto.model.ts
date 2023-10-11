export class Persona {
    public id: number;
    public nombre: string;
    public categoria: string;
    public descripcion: string;
    public precio: number;

    constructor(id: number, nombre: string, categoria: string, descripcion: string, precio: number) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}