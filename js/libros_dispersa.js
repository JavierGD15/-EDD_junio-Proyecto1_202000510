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
        var codigodot = "digraph G{bgcolor=none \n graph[size = \"11.70,6.25\" ]\n edge[dir = \"both\"] \nlabel=\" Clasificación Fantasia \";\nnode [shape=box];\n";        
        var conexiones_filas ="";
        var conexiones_columnas ="";
        var Nodo_thrillers ="";
        var ayuda1 = "";
        var inicio1 = 0;
        var ayuda2 = "";
        var inicio5 = 0;
        for (var i = 1; i < fila+1; i++) {
            var ayuda = this.primero;
            var inicio = 0;            
            
            for (var j = 1; j < columna+1; j++) {
                //filas
                var Nodo_thriller = this.nueva_busqueda(i, j);
                if(Nodo_thriller == null){
                    continue;
                }else if(Nodo_thriller.nombre_libro == null){
                    
                    continue;
                }
                else{
                    if(inicio == 0){
                        if(inicio1==0){
                            Nodo_thrillers +=  "N" +( Nodo_thriller.fila+50)+""+ Nodo_thriller.columna+ "[label=\"" + Nodo_thriller.nombre_libro + "\" ];\n";
                            Nodo_thrillers +=  "fila" + i + "[label=\"" + i + "\"];\n";
                            conexiones_filas += "fila" + i + "->N" +( Nodo_thriller.fila+50)+""+ Nodo_thriller.columna + ";\n"; 
                            ayuda = Nodo_thriller;
                            inicio = 1;
                            ayuda1 = "fila"+i+"";
                            inicio1 = 1;
                        }
                        else{
                        Nodo_thrillers +=  "N" +( Nodo_thriller.fila+50)+""+ Nodo_thriller.columna+ "[label=\"" + Nodo_thriller.nombre_libro + "\" ];\n";
                        Nodo_thrillers +=  "fila" + i + "[label=\"" + i + "\"];\n";
                        conexiones_filas += "fila" + i + "->N" +( Nodo_thriller.fila+50)+""+ Nodo_thriller.columna + ";\n";  
                        codigodot += ayuda1 + "->fila" +i + ";\n";
                        ayuda1 = "fila"+i+"";                      
                        ayuda = Nodo_thriller;
                        inicio = 1;
                    }
                    }else{
                        Nodo_thrillers +=  "N" +( Nodo_thriller.fila+50)+""+ Nodo_thriller.columna+ "[label=\"" + Nodo_thriller.nombre_libro + "\" ];\n";
                        conexiones_filas += "N" +( ayuda.fila+50)+""+ ayuda.columna + "->N" +( Nodo_thriller.fila+50)+""+ Nodo_thriller.columna + ";\n";
                        ayuda = Nodo_thriller;  
                    }
                   
                    

                }
                
                
            }
            if(conexiones_filas != ""){
                codigodot += "{rank=same;\n"+conexiones_filas+"\n}\n";
            
                var conexiones_filas ="";
            }
            
            
            
        }
        for (var i = 1; i < columna+1; i++) {
            var alerta = 0;
            var ayuda_nodo = this.primero;
            var Nodo_thriller = this.nueva_busqueda(1, i);
            while(Nodo_thriller != null){
                if(Nodo_thriller.nombre_libro != null){
                    if(alerta == 0){
                        if(inicio5==0){
                        Nodo_thrillers += "colum" + i + "[label=\"" + i + "\"];\n";
                        ayuda2 = "colum"+i+"";
                        codigodot += "colum" + i + "->N" +( Nodo_thriller.fila+50)+""+ Nodo_thriller.columna + ";\n"; 
                        alerta = 1;
                        ayuda_nodo = Nodo_thriller;
                        Nodo_thriller = Nodo_thriller.abajo;
                        inicio5 = 1;

                        }else{
                        Nodo_thrillers += "colum" + i + "[label=\"" + i + "\"];\n";                        
                        codigodot += "colum" + i + "->N" +( Nodo_thriller.fila+50)+""+ Nodo_thriller.columna + ";\n";
                        conexiones_columnas += ayuda2 + "->colum" + i + ";\n"; 
                        ayuda2 = "colum"+i+"";
                        alerta = 1;
                        ayuda_nodo = Nodo_thriller;
                        Nodo_thriller = Nodo_thriller.abajo;

                        }
                        
                    }else{
                        console.log("entro");
                        codigodot += "N" + ( ayuda_nodo.fila+50)+""+ ayuda_nodo.columna + "->N" +( Nodo_thriller.fila+50)+""+ Nodo_thriller.columna + ";\n";
                        ayuda_nodo = Nodo_thriller; 
                        Nodo_thriller = Nodo_thriller.abajo;
                    }
                }else{
                    Nodo_thriller = Nodo_thriller.abajo;
                }
            }


        }
        codigodot += "{rank=same;\n"+conexiones_columnas+"\n}\n";
        
        //agregando Nodo_thrillers
        codigodot += Nodo_thrillers+"\n"
        
        //agregando conexiones
        codigodot += "\n}"
        
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
iniciar_lista(){
    let json_fantasia = JSON.parse(localStorage.getItem("json_Thriller"));
    if(json_fantasia != null){
    this.crearMatriz(25,25);
    this.unir_Nodo_thriller_libross(25,25);
    this.eliminar_finales(25)
    for (var i = 0; i < json_fantasia.length; i++) {
        this.agregar_Nodo_thriller_libros(json_fantasia[i].isbm, json_fantasia[i].nombre_autor, json_fantasia[i].nombre_libro, json_fantasia[i].cantidad, json_fantasia[i].fila, json_fantasia[i].columna, json_fantasia[i].paginas, json_fantasia[i].categoria);
    }
    this.graficar_octogonal(25,25);
    }
    else{
        this.crearMatriz(25,25);
        this.unir_Nodo_thriller_libross(25,25);
        this.eliminar_finales(25)
        this.graficar_octogonal(25,25);
    }
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
        localStorage.setItem("json_Thriller", contenido);
        var Lista_thriller_libross = new Lista_thriller();

        Lista_thriller_libross.crearMatriz(25,25);
        Lista_thriller_libross.unir_Nodo_thriller_libross(25,25);
        Lista_thriller_libross.eliminar_finales(25);

        for (var i = 0; i < json.length; i++) {
            if(json[i].categoria == "Thriller"){
                
                Lista_thriller_libross.agregar_Nodo_thriller_libros(json[i].isbm, json[i].nombre_autor, json[i].nombre_libro, json[i].cantidad, json[i].fila, json[i].columna, json[i].paginas, json[i].categoria);                   
            }
        }
        Lista_thriller_libross.graficar_octogonal(25,25);
        
    }
})

var dispersa = new Lista_thriller();
dispersa.iniciar_lista();