alert("hola mundo");
class Nodo {
    constructor(dpi, nombre, usuario, correo, rol, contraseña, telefono) {
        this.dpi = dpi;
        this.nombre = nombre;
        this.usuario = usuario;
        this.correo = correo;
        this.rol = rol;
        this.contraseña = contraseña;
        this.telefono = telefono;
        this.siguiente = null;
    }
}

class Lista {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }

   //insertar usuario
   insertar(dpi, nombre, usuario, correo, rol, contraseña, telefono) {
       var nuevo = new Nodo(dpi, nombre, usuario, correo, rol, contraseña, telefono);
         if (this.primero == null) {
                this.primero = nuevo;
                this.ultimo = nuevo;
            } 
            
            
            else {
                this.ultimo.siguiente = nuevo;
                this.ultimo = nuevo;
                this.ultimo.siguiente = this.primero;
            }
   }

   //imprimir lista
    imprimir() {
        var actual = this.primero.siguiente;
        var detener = this.primero;

        while (actual != detener) {
            console.log(actual.dpi + " " + actual.nombre + " " + actual.usuario + " " + actual.correo + " " + actual.rol + " " + actual.contraseña + " " + actual.telefono);
            actual = actual.siguiente;

        }
    }

    //leer json
    leerJson() {
        
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
            else{
                console.log("error");
                console.log(this.readyState);
                console.log(this.status);
            }
        };
        xhttp.open("GET", "usuarios.json", true);
       
        
    }
}

var lista = new Lista();
lista.leerJson();

//lista.imprimir();
