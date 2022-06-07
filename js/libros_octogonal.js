alert("octogonal");
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
                    console.log("arriba: " + nodo.arriba.fila + " " + nodo.arriba.columna );  }
                if(nodo.abajo != null){
                    console.log("abajo: " + nodo.abajo.fila + " " + nodo.abajo.columna );   }
                
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
}

var lista = new Lista();
lista.crearMatriz(6, 10);
lista.unir_nodos(6, 10);
lista.imprimirMatriz(6, 10);
