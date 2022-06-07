
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
        console.log(detener.dpi + " " + detener.nombre + " " + detener.usuario + " " + detener.correo + " " + detener.rol + " " + detener.contraseña + " " + detener.telefono);
        while (actual != detener) {
            console.log(actual.dpi + " " + actual.nombre + " " + actual.usuario + " " + actual.correo + " " + actual.rol + " " + actual.contraseña + " " + actual.telefono);
            actual = actual.siguiente;
            
        }
    }

    leerjson(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var json = JSON.parse(this.responseText);
                for (var i = 0; i < json.length; i++) {
                    lista.insertar(json[i].dpi, json[i].nombre_completo, json[i].nombre_usuario, json[i].correo, json[i].rol, json[i].contrasenia, json[i].telefono);
                    
                }
                lista.imprimir();
            }
        };
        xhttp.open("GET", "usuarios.json", true);
        xhttp.send();

        
      

    }
   
}





var lista = new Lista();

lista.leerjson();

//lista.imprimir();
