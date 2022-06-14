
class Nodo {
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

class Lista {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }
    insertar(fila, columna) {
        var nuevo = new Nodo("", "", "", "", fila, columna, "", "");
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
                var nodo = this.buscar_nodo(i, j);

                if (nodo.izquierda != null){
                    console.log("izquierda: " + nodo.izquierda.fila + " " + nodo.izquierda.columna );            
                }
                if(nodo.derecha != null){
                    console.log("derecha: " + nodo.derecha.fila + " " + nodo.derecha.columna );
                }
                if(nodo.arriba != null){
                    console.log("arriba: " + nodo.arriba.fila + " " + nodo.arriba.columna );  
                }
                if(nodo.abajo != null){
                    console.log("abajo: " + nodo.abajo.fila + " " + nodo.abajo.columna );   
                }
                
            }
    }
}

    unir_nodos(fila, columna) {
        for (var i = 1; i < fila+1; i++) {
            for (var j = 1; j < columna+1; j++) {

                var nodo1 = this.buscar_nodo(i, j);

                //izquierda
                try{
                    
                    var nodo2 = this.buscar_nodo(i, j-1);
                    if(nodo2 != null){
                    nodo1.izquierda = nodo2;}
                }catch(e){
                    nodo1.izquierda = null;
                }
                //derecha
                try{
                    var nodo2 = this.buscar_nodo(i, j+1);
                    if(nodo2 != null){
                    nodo1.derecha = nodo2;}
                }catch(e){
                    nodo1.derecha = null;
                }
                //arriba
                try{
                    var nodo2 = this.buscar_nodo(i-1, j);
                    if(nodo2 != null){
                    nodo1.arriba = nodo2;}
                }catch(e){
                    nodo1.arriba = null;
                }
                //abajo
                try{
                    var nodo2 = this.buscar_nodo(i+1, j);
                    if(nodo2 != null){
                    nodo1.abajo = nodo2;}
                }catch(e){
                    nodo1.abajo = null;
                }
                
            }
        }

}
    eliminar_finales(columna){
        var nodo = this.primero;
        for (var j = 1; j < columna; j++) {
            nodo = nodo.derecha;
        }
        console.log(nodo.fila + " " + nodo.columna);
        
        while(nodo.abajo != null){

            nodo.derecha = null;
            nodo = nodo.abajo;
            
        }

    }

    buscar_nodo(fila, columna) {
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
        var nodos ="";
        
        for (var i = 1; i < fila+1; i++) {
            
            //filas
            for (var j = 1; j < columna+1; j++) {
                var nodo = this.nueva_busqueda(i, j);
               
                
                if(nodo == null){
                    continue;
                }else{
                    
                        nodos += "N" + (nodo.fila+50) + ""+nodo.columna + "[label=\"" + nodo.nombre_libro + "\"];\n";
                    
                    if(nodo.izquierda != null){
                    
                        conexiones += "N" + (nodo.fila+50)+""+ nodo.columna + " -> N" + (nodo.izquierda.fila+50)+""+ nodo.izquierda.columna + ";\n"
                    }
                    if(nodo.derecha != null){
                        conexiones += "N" + (nodo.fila+50)+""+ nodo.columna + " -> N" + (nodo.derecha.fila+50)+""+ nodo.derecha.columna + ";\n"
                    }                    

                }                
                
            }
            
            codigodot += "{rank=same;\n"+conexiones+"\n}\n";
            var conexiones ="";

            //columnas
            for (var j = 1; j < columna+1; j++) {
                var nodo = this.nueva_busqueda(i, j);
                
                if(nodo == null){
                    continue;
                }else{
                    
                    if(nodo.arriba != null){
                        conexiones += "N" + (nodo.fila+50)+""+ nodo.columna + " -> N" + (nodo.arriba.fila+50)+""+ nodo.arriba.columna + ";\n"
                    }
                    if(nodo.abajo != null){
                        conexiones += "N" + (nodo.fila+50)+""+ nodo.columna + " -> N" + (nodo.abajo.fila+50)+""+ nodo.abajo.columna + ";\n"
                    }                    
                    codigodot += "\n"+conexiones+"\n"
                    var conexiones ="";

                }
                
                
            }
            
            var conexiones ="";
        }
        
        //agregando nodos
        codigodot += nodos+"\n"
        
        //agregando conexiones
        codigodot += "\n}"
        console.log(codigodot)

        d3.select("#lienzo1").graphviz()
        .renderDot(codigodot)
        
    }

    nueva_busqueda(fila, columna){

        var nodo = this.primero;        
        for (var j = 1; j < columna; j++) {
            nodo = nodo.derecha;
        }
        for (var i = 1; i < fila; i++) {
            nodo = nodo.abajo;
        }
        return nodo;
           
    }

    agregar_libros(isbn, nombre_autor, nombre_libro, cantidad, fila_json, columna_json, paginas, categoria){

        var nodo = this.primero;
        for (var j = 1; j < columna_json; j++) {
            nodo = nodo.derecha;
        }
        for (var i = 1; i < fila_json; i++) {
            nodo = nodo.abajo;
        }

        nodo.isbn = isbn;
        nodo.nombre_autor = nombre_autor;
        nodo.nombre_libro = nombre_libro;
        nodo.cantidad = cantidad;
        nodo.fila = fila_json;
        nodo.columna = columna_json;
        nodo.paginas = paginas;
        nodo.categoria = categoria;

    }

    leerJson(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                
                var json = JSON.parse(this.responseText);
                for (var i = 0; i < json.length; i++) {
                   
                    var ayuda = lista.nueva_busqueda(json[i].fila, json[i].columna);
                    
                    if(ayuda != null){

                        ayuda.isbn = json[i].isbn;
                        ayuda.nombre_autor = json[i].nombre_autor;
                        ayuda.nombre_libro = json[i].nombre_libro;
                        ayuda.cantidad = json[i].cantidad;
                        ayuda.fila = json[i].fila;
                        ayuda.columna = json[i].columna;
                        ayuda.paginas = json[i].paginas;
                        ayuda.categoria = json[i].categoria;

                    }
                //this.agregar_libros(json[i].isbm, json[i].nombre_autor, json[i].nombre_libro, json[i].cantidad, json[i].fila, json[i].columna, json[i].paginas, json[i].categoria);               
                }
            }
        };              

        xhttp.open("GET", "libros.json", true);
        xhttp.send();
        var nodo = this.nueva_busqueda(5, 10);
                
        this.graficar_octogonal(25,25);
        

        }
    
}


var lista = new Lista();
lista.crearMatriz(25,25);
lista.unir_nodos(25,25);

lista.eliminar_finales(25);
//lista.imprimirMatriz(25,25);
//var nodo = lista.nueva_busqueda(5,4);
//console.log(nodo.fila + " " + nodo.columna);
lista.leerJson();





//lista.imprimirMatriz(25,25);

