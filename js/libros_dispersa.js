class Nodo_thriller {
    constructor(isbn, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria) {
        this.isbn = isbn;
        this.nombre_autor = nombre_autor;
        this.nombre_libro = nombre_libro;
        this.cantidad = cantidad;
        this.fila = fila;
        this.columna = columna;
        this.paginas = paginas;
        this.categoria = categoria;
        this.izquierda = null;
        this.derecha = null;
        this.arriba = null;
        this.abajo = null;

    }
}

class Lista_thriller {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }
    insertar(fila, columna) {
        var nuevo = new Nodo_thriller(null, null, null, null, fila, columna, null, null);

        if (this.primero == null) {
            this.primero = nuevo;
            this.ultimo = nuevo; 
        } 

        else if( this.primero.derecha == null ){
            this.primero.derecha = nuevo;
            this.ultimo = nuevo;
        }

        else {

            this.ultimo.derecha = nuevo;
            this.ultimo = nuevo;
        
        }
    }


    //crear matriz
    crearMatriz(fila, columna) {
        for (var i = 1; i < fila+1; i++) {
            for (var j = 1; j < columna+1; j++) {
                this.insertar(i, j);
            }
        }
        
    }

    //imprimir matriz
    imprimirMatriz(fila, columna) {
        for (var i = 1; i < fila+1; i++) {
            for (var j = 1; j < columna+1; j++) {
                var Nodo_thriller = this.buscar_Nodo_thriller(i, j);

                if (Nodo_thriller.izquierda != null){
                    console.log("izquierda: " + Nodo_thriller.izquierda.fila + " " + Nodo_thriller.izquierda.columna );            
                }
                if(Nodo_thriller.derecha != null){
                    console.log("derecha: " + Nodo_thriller.derecha.fila + " " + Nodo_thriller.derecha.columna );
                }
                if(Nodo_thriller.arriba != null){
                    console.log("arriba: " + Nodo_thriller.arriba.fila + " " + Nodo_thriller.arriba.columna );  
                }
                if(Nodo_thriller.abajo != null){
                    console.log("abajo: " + Nodo_thriller.abajo.fila + " " + Nodo_thriller.abajo.columna );   
                }
                
            }
    }
}

unir_Nodo_thriller_libross(fila, columna) {
        for (var i = 1; i < fila+1; i++) {
            for (var j = 1; j < columna+1; j++) {

                var Nodo_thriller1 = this.buscar_Nodo_thriller(i, j);

                //izquierda
                try{
                    
                    var Nodo_thriller2 = this.buscar_Nodo_thriller(i, j-1);
                    if(Nodo_thriller2 != null){
                    Nodo_thriller1.izquierda = Nodo_thriller2;}
                }catch(e){
                    Nodo_thriller1.izquierda = null;
                }
                //derecha
                try{
                    var Nodo_thriller2 = this.buscar_Nodo_thriller(i, j+1);
                    if(Nodo_thriller2 != null){
                    Nodo_thriller1.derecha = Nodo_thriller2;}
                }catch(e){
                    Nodo_thriller1.derecha = null;
                }
                //arriba
                try{
                    var Nodo_thriller2 = this.buscar_Nodo_thriller(i-1, j);
                    if(Nodo_thriller2 != null){
                    Nodo_thriller1.arriba = Nodo_thriller2;}
                }catch(e){
                    Nodo_thriller1.arriba = null;
                }
                //abajo
                try{
                    var Nodo_thriller2 = this.buscar_Nodo_thriller(i+1, j);
                    if(Nodo_thriller2 != null){
                    Nodo_thriller1.abajo = Nodo_thriller2;}
                }catch(e){
                    Nodo_thriller1.abajo = null;
                }
                
            }
        }

}
    eliminar_finales(columna){
        var Nodo_thriller = this.primero;
        for (var j = 1; j < columna; j++) {
            Nodo_thriller = Nodo_thriller.derecha;
        }
        while(Nodo_thriller.abajo != null){
            Nodo_thriller.derecha = null;
            Nodo_thriller = Nodo_thriller.abajo;
        }

    }

    buscar_Nodo_thriller(fila, columna) {
        var actual = this.primero;
        while (actual != null) {
            if (actual.fila == fila && actual.columna == columna) {
                return actual;
            }
            actual = actual.derecha;
        }
        return null;
    }

    graficar_octogonal(fila, columna){
        var codigodot = "digraph G{\nlabel=\" Clasificación Fantasia \";\nnode [shape=box];\n";        
        var conexiones ="";
        var Nodo_thrillers ="";
        

        for (var i = 1; i < fila+1; i++) {
            //filas
            for (var j = 1; j < columna+1; j++) {
                var Nodo_thriller = this.nueva_busqueda(i, j);
                if(Nodo_thriller == null){
                    continue;
                }else{
                    Nodo_thrillers+=  "N" + Nodo_thriller.fila+""+ Nodo_thriller.columna+ "[label=\"" + Nodo_thriller.fila+""+ Nodo_thriller.columna + "\" ];\n";

                    if(Nodo_thriller.izquierda != null){
                    
                        conexiones += "N" + Nodo_thriller.fila+""+ Nodo_thriller.columna + " -> N" + Nodo_thriller.izquierda.fila+""+ Nodo_thriller.izquierda.columna + ";\n"
                    }
                    if(Nodo_thriller.derecha != null){
                        conexiones += "N" + Nodo_thriller.fila+""+ Nodo_thriller.columna + " -> N" + Nodo_thriller.derecha.fila+""+ Nodo_thriller.derecha.columna + ";\n"
                    }
                    

                }
                
                
            }
            
            codigodot += "{rank=same;\n"+conexiones+"\n}\n";
            var conexiones ="";

            //columnas
            for (var j = 1; j < columna+1; j++) {
                var Nodo_thriller = this.nueva_busqueda(i, j);
                if(Nodo_thriller == null){
                    continue;
                }else{
                    Nodo_thrillers+=  "N" + Nodo_thriller.fila+""+ Nodo_thriller.columna+ "[label=\"" + Nodo_thriller.fila+""+ Nodo_thriller.columna + "\" ];\n";

                    
                    if(Nodo_thriller.arriba != null){
                        conexiones += "N" + Nodo_thriller.fila+""+ Nodo_thriller.columna + " -> N" + Nodo_thriller.arriba.fila+""+ Nodo_thriller.arriba.columna + ";\n"
                    }
                    if(Nodo_thriller.abajo != null){
                        conexiones += "N" + Nodo_thriller.fila+""+ Nodo_thriller.columna + " -> N" + Nodo_thriller.abajo.fila+""+ Nodo_thriller.abajo.columna + ";\n"
                    }
                    
                    codigodot += "\n"+conexiones+"\n"
                    var conexiones ="";

                }
                
                
            }
            
            var conexiones ="";
        }
        
        //agregando Nodo_thrillers
        codigodot += Nodo_thrillers+"\n"
        
        //agregando conexiones
        codigodot += "\n}"
        console.log(codigodot)
        d3.select("#lienzo3").graphviz()
        .renderDot(codigodot)
        
    }

    nueva_busqueda(fila, columna){
        var Nodo_thriller = this.primero;
        for (var j = 1; j < columna; j++) {
            Nodo_thriller = Nodo_thriller.derecha;
        }
        for (var i = 1; i < fila; i++) {
            Nodo_thriller = Nodo_thriller.abajo;
        }
        return Nodo_thriller;
           
    }

    leerJson(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            

        
    }
}
agregar_Nodo_thriller_libros(isbm, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria){
    var ayuda = this.primero;
    for (var j = 1; j < columna; j++) {
        ayuda = ayuda.derecha;
    }
    for (var i = 1; i < fila; i++) {
        ayuda = ayuda.abajo;
    }
    ayuda.isbn = isbm;
    ayuda.nombre_autor = nombre_autor;
    ayuda.nombre_libro = nombre_libro;
    ayuda.cantidad = cantidad;
    ayuda.fila = fila;
    ayuda.columna = columna;
    ayuda.paginas = paginas;
    ayuda.categoria = categoria;
    
}
}
var formulario = document.getElementById("lienzo3");

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    console.log("Formulario enviado");
    //recibir documento de formulario
    let file = document.querySelector('#file2');
    let reader = new FileReader();
    reader.readAsText(file.files[0]);
    reader.onload = function(e){
        let contenido = e.target.result;
        var json = JSON.parse(contenido);
        var Lista_thriller_libross = new Lista_thriller();

        Lista_thriller_libross.crearMatriz(25,25);
        Lista_thriller_libross.unir_Nodo_thriller_libross(25,25);
        Lista_thriller_libross.eliminar_finales(25);

        for (var i = 0; i < json.length; i++) {
            if(json[i].categoria == "Thriller"){
                console.log("entro");
                Lista_thriller_libross.agregar_Nodo_thriller_libros(json[i].isbm, json[i].nombre_autor, json[i].nombre_libro, json[i].cantidad, json[i].fila, json[i].columna, json[i].paginas, json[i].categoria);                   
            }
        }
        Lista_thriller_libross.graficar_octogonal(25,25);
        
    }
})
