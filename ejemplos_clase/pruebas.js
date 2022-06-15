
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
        //console.log(codigodot)

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
        
        var ayuda_fila = 0;
        var ayuda_columna = 0;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                
                var json = JSON.parse(this.responseText);
                for (var i = 0; i < json.length; i++) {
                    if(json[i].categoria == "Fantasia"){
                       
                        if(ayuda_fila <json[i].fila){
                            if(ayuda_columna < json[i].columna){
                                ayuda_fila = json[i].fila;
                                ayuda_columna = json[i].columna;
                            }else{
                                ayuda_fila = json[i].fila;
                            }
                        }
                        else if(ayuda_columna < json[i].columna){
                            ayuda_columna = json[i].columna;
                            }
                            else{
                                continue;
                            }

                            lista.crearMatriz(ayuda_fila,ayuda_columna);
                            lista.unir_nodos(ayuda_fila,ayuda_columna);
                            lista.eliminar_finales(ayuda_fila);
                            lista.leerJson();

                        }
                        
                    }
                    
                     
            }
        };      
        xhttp.open("GET", "libros.json", true);
        xhttp.send();
        
        }
    
}


var lista = new Lista();
lista.leerJson();
// lista.crearMatriz(25,25);
// lista.unir_nodos(25,25);
// lista.eliminar_finales(25);
// lista.leerJson();

