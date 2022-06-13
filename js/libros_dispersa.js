
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
        var nuevo = new Nodo(null, null, null, null, fila, columna, null, null);

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
                    nodos+=  "N" + nodo.fila+""+ nodo.columna+ "[label=\"" + nodo.fila+""+ nodo.columna + "\" ];\n";

                    if(nodo.izquierda != null){
                    
                        conexiones += "N" + nodo.fila+""+ nodo.columna + " -> N" + nodo.izquierda.fila+""+ nodo.izquierda.columna + ";\n"
                    }
                    if(nodo.derecha != null){
                        conexiones += "N" + nodo.fila+""+ nodo.columna + " -> N" + nodo.derecha.fila+""+ nodo.derecha.columna + ";\n"
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
                    nodos+=  "N" + nodo.fila+""+ nodo.columna+ "[label=\"" + nodo.fila+""+ nodo.columna + "\" ];\n";

                    
                    if(nodo.arriba != null){
                        conexiones += "N" + nodo.fila+""+ nodo.columna + " -> N" + nodo.arriba.fila+""+ nodo.arriba.columna + ";\n"
                    }
                    if(nodo.abajo != null){
                        conexiones += "N" + nodo.fila+""+ nodo.columna + " -> N" + nodo.abajo.fila+""+ nodo.abajo.columna + ";\n"
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

    leerJson(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            

        
    }
}
}


var lista = new Lista();
lista.crearMatriz(6, 10);
lista.unir_nodos(6, 10);
lista.eliminar_finales(10);
//var nodo = lista.nueva_busqueda(5,4);
//console.log(nodo.fila + " " + nodo.columna);
lista.graficar_octogonal(6, 10);