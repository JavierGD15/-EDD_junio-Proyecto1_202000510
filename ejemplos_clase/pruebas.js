
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
        var codigodot = "digraph G{\nlabel=\" Clasificación Thriller \";\nnode [shape=box];\n";        
        var conexiones ="";
        var nodos ="";    
        var conexiones_filas ="";
        
        for (var i = 1; i < fila+1; i++) {   
            
            var nodo = this.buscar_nodo(i, 1);
            var x = 1;
            while(nodo != null){
                if(nodo.nombre_libro != ""){

                    //fila
                    nodos += "fila" + x + "[label=\"" + x + "\"];\n";
                    conexiones_filas += "fila" + x + "->N" +(nodo.fila+50) +""+nodo.columna + ";\n";
                        
                    //columna
                    nodos += "colum" + i + "[label=\"" + i + "\"];\n";
                    nodos += "N" + (nodo.fila+50) + ""+nodo.columna + "[label=\"" + nodo.nombre_libro + "\"];\n";
                    conexiones += "colum" + i + "->N" + (nodo.fila+50) + ""+nodo.columna + ";\n";                    
                    nodo = nodo.abajo;
                    
                }
                else{
                    nodo = nodo.derecha;
                    x++;
                }
                // if(conexiones != ""){
                // codigodot += "\n"+conexiones+"\n";
                // conexiones ="";
                // }
            }
           
        }
        codigodot += "{rank=same;\n"+conexiones_filas+"\n}\n";
        codigodot += "\n"+conexiones+"\n"
        //agregando nodos
        codigodot += nodos+"\n"
        
        //agregando conexiones
        codigodot += "\n}"
        //console.log(codigodot)
        console.log(codigodot);

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

    leerJson(){
        var ayuda = this.primero;
        var segundo = this.primero;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                
                var json = JSON.parse(this.responseText);
                for (var i = 0; i < json.length; i++) {
                    if(json[i].categoria == "Thriller"){
                        for (var j = 1; j < json[i].columna; j++) {
                        
                            ayuda = ayuda.derecha;
                        }
                        for (var k = 1; k < json[i].fila; k++) {
                            ayuda = ayuda.abajo;
                        }             
                            ayuda.isbn = json[i].isbm;
                            ayuda.nombre_autor = json[i].nombre_autor;
                            ayuda.nombre_libro = json[i].nombre_libro;
                            ayuda.cantidad = json[i].cantidad;
                            ayuda.fila = json[i].fila;
                            ayuda.columna = json[i].columna;
                            ayuda.paginas = json[i].paginas;
                            ayuda.categoria = json[i].categoria;                                          
                            ayuda = segundo;
                        }
                        
                    }
                    lista.graficar_octogonal(25,25);  
            }
        };      
        xhttp.open("GET", "libros.json", true);
        xhttp.send();
        
        }
    
}


var lista = new Lista();
lista.crearMatriz(25,25);
lista.unir_nodos(25,25);
lista.eliminar_finales(25);
lista.leerJson();

