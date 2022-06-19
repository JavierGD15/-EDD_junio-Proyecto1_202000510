class Nodo_arbol {
    constructor(dpi, nombre_autor, correo, telefono, direccion, biografia) {
        this.dpi = dpi;
        this.nombre_autor = nombre_autor;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
        this.biografia = biografia;
        this.izquierda = null;
        this.derecha = null;
    }
}

class Arbol{
    
    constructor() {
        this.raiz = null;
        this.texto = "";
    }
    insertar(dpi, nombre_autor, correo, telefono, direccion, biografia) {
        var nuevo = new Nodo_arbol(dpi, nombre_autor, correo, telefono, direccion, biografia);
        if (this.raiz == null) {
            this.raiz = nuevo;
        } else {
            var actual = this.raiz;
            var padre;
            while (true) {
                padre = actual;
                if (nombre_autor < actual.nombre_autor) {
                    actual = actual.izquierda;
                    if (actual == null) {
                        padre.izquierda = nuevo;
                        break;
                    }
                } else {
                    actual = actual.derecha;
                    if (actual == null) {
                        padre.derecha = nuevo;
                        break;
                    }
                }
            }
        }
    }
    preorden(raiz) {
        if (raiz != null) {
            console.log(raiz.nombre_autor);
            this.preorden(raiz.izquierda);
            this.preorden(raiz.derecha);
        }
    }
    inorden(raiz) {
        if (raiz != null) {
            this.inorden(raiz.izquierda);
            console.log(raiz.nombre_autor);
            this.inorden(raiz.derecha);
        }
    }
    postorden(raiz) {
        if (raiz != null) {
            this.postorden(raiz.izquierda);
            this.postorden(raiz.derecha);
            console.log(raiz.nombre_autor);
        }
    }
    buscar_Nodo_arbol(dpi) {
        var actual = this.raiz;
        while (actual != null) {
            if (dpi == actual.dpi) {
                return actual;
            } else if (dpi < actual.dpi) {
                actual = actual.izquierda;
            } else {
                actual = actual.derecha;
            }
        }   return null;
    }

    graficar(){
        this.texto = "";
        var codigodot = "digraph G{\n graph[size = \"11.70,6.25\" ] \nlabel=\" Autores-Arbol \";\n";
        
        var derecha = this.raiz;
       
        
        this.texto += derecha.dpi + " [label=\"" + derecha.nombre_autor + "\"];";
        this.texto += derecha.dpi + " -> " + derecha.izquierda.dpi+ ";";
        this.texto += derecha.dpi + " -> " + derecha.derecha.dpi+ ";";
        
        
        this.graficar_lados(derecha.izquierda);
        this.graficar_lados(derecha.derecha);
        
        codigodot += "\n"+this.texto+"\n";
        
        codigodot += "}";
        console.log(codigodot);
        d3.select("#lienzo4").graphviz()
        .renderDot(codigodot)
    }
    
    graficar_lados(nodo){
        console.log("entro");
        this.texto += nodo.dpi + " [label=\"" + nodo.nombre_autor + "\"];\n";
        if(nodo.izquierda != null){
            this.texto += nodo.dpi + " -> " + nodo.izquierda.dpi+ ";\n";
            this.graficar_lados(nodo.izquierda);
        }
        if(nodo.derecha != null){
            this.texto += nodo.dpi + " -> " + nodo.derecha.dpi+ ";\n";
            this.graficar_lados(nodo.derecha);
        }        


    }
    iniciar_lista(){
        let json_fantasia = JSON.parse(localStorage.getItem("json_autores"));
        if(json_fantasia != null){
            var arbol = new Arbol();
        for (var i = 0; i < json_fantasia.length; i++) {
            arbol.insertar(json_fantasia[i].dpi, json_fantasia[i].nombre_autor, json_fantasia[i].correo, json_fantasia[i].telefono, json_fantasia[i].direccion, json_fantasia[i].biografia);
        }
        arbol.graficar();
        }
        
    }

}

var formulario = document.getElementById("lienzo4");

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    console.log("Formulario enviado");
    //recibir documento de formulario
    let file = document.querySelector('#file4');
    let reader = new FileReader();
    reader.readAsText(file.files[0]);
    reader.onload = function(e){
        let contenido = e.target.result;
        var json = JSON.parse(contenido);
        localStorage.setItem("json_autores", contenido);
        var arbol = new Arbol();
        for (var i = 0; i < json.length; i++) {
            arbol.insertar(json[i].dpi, json[i].nombre_autor, json[i].correo, json[i].telefono, json[i].direccion, json[i].biografia);
        }
        arbol.graficar();
        
    }
})

var auto = new Arbol();
auto.iniciar_lista();



