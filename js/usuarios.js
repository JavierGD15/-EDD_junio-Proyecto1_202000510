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

    //insertar usuario predeterminado
    insertar_predeterminado() {
        this.insertar(2354168452525, "WIlfred Perez", "Wilfred", "Wilfred@gmail.com", "Administrador", "123", "+502 (123) 123-4567");
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
        xhttp.open("GET", "../usuarios.json", true);
        xhttp.send();        
      

    }

    graficar_lista(){
        var codigodot = "digraph G{\nlabel=\" Clasificación Usuarios \";\nnode [shape=box];\n";
        var actual = this.primero.siguiente;
        var detener = this.primero;
        var recto = "";
        recto += detener.dpi + " [label=\"" + detener.nombre +"\n"+ detener.correo + "\"];";
        while (actual != detener) {
            codigodot += actual.dpi + " [label=\"" + actual.nombre +"\n"+ actual.correo + "\"];";
            recto += actual.dpi + " -> " + actual.siguiente.dpi+ ";";
            actual = actual.siguiente;
        }
        codigodot += "{rank=same;\n"+recto+"\n}\n";
        codigodot += "}";
        d3.select("#lienzo2").graphviz()
        .renderDot(codigodot)
    }
   
}

var formulario = document.getElementById("lienzo2");
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    
    //recibir documento de formulario
    
    let file = document.querySelector('#file');
    var lista = new Lista();
    if (file == null){
       
    
    //recibir datos de formulario
    var datos = new FormData(document.getElementById("formulario"));

    if(datos.get("user") == "" || datos.get("contraseña") == ""){
        alert("No se puede dejar campos vacios");
    }
    else if(datos.get("user") == "Wilfred" && datos.get("contraseña") == "123"){
        lista.insertar_predeterminado();
        //enviar nuevo html
        location.href = "/templates/admin.html";
    }
    else{
        var opcion = false;
        let json_usuarios = JSON.parse(localStorage.getItem("json_usuarios"));
        if(json_usuarios != null){
            for (var i = 0; i < json_usuarios.length; i++) {
                if(datos.get("user") == json_usuarios[i].nombre_usuario && datos.get("contraseña") == json_usuarios[i].contrasenia){  
                    if(json_usuarios[i].rol =="Administrador"){
                        location.href = "/templates/admin.html";
                        opcion = true;
                    }else{
                        opcion = true;
                    location.href = "/templates/libros_inicio.html";
                    }                     
                    
                }
            }
            if(opcion == false){
                alert("Usuario o contraseña incorrectos");
            }
            
        }else{
            alert("Usuario o contraseña incorrectos :(");
        }
        
    }

    }else{
        let reader = new FileReader();
        reader.readAsText(file.files[0]);
        reader.onload = function(e){
            let contenido = e.target.result;
            var json = JSON.parse(contenido);

            localStorage.setItem("json_usuarios", contenido);
            
    
            for (var i = 0; i < json.length; i++) {
                lista.insertar(json[i].dpi, json[i].nombre_completo, json[i].nombre_usuario, json[i].correo, json[i].rol, json[i].contrasenia, json[i].telefono);
            }
            lista.graficar_lista();
        }
    }


})

