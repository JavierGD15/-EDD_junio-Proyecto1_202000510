
class Nodo_libros {
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

class Lista_libros {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }
    insertar(fila, columna) {
        var nuevo = new Nodo_libros("", "", "", "", fila, columna, "", "");
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
                var Nodo_libros = this.buscar_Nodo_libros(i, j);

                if (Nodo_libros.izquierda != null){
                    console.log("izquierda: " + Nodo_libros.izquierda.fila + " " + Nodo_libros.izquierda.columna );            
                }
                if(Nodo_libros.derecha != null){
                    console.log("derecha: " + Nodo_libros.derecha.fila + " " + Nodo_libros.derecha.columna );
                }
                if(Nodo_libros.arriba != null){
                    console.log("arriba: " + Nodo_libros.arriba.fila + " " + Nodo_libros.arriba.columna );  
                }
                if(Nodo_libros.abajo != null){
                    console.log("abajo: " + Nodo_libros.abajo.fila + " " + Nodo_libros.abajo.columna );   
                }
                
            }
    }
}

    unir_Nodo_libross(fila, columna) {
        for (var i = 1; i < fila+1; i++) {
            for (var j = 1; j < columna+1; j++) {

                var Nodo_libros1 = this.buscar_Nodo_libros(i, j);
                //izquierda
                try{                    
                    var Nodo_libros2 = this.buscar_Nodo_libros(i, j-1);
                    if(Nodo_libros2 != null){
                    Nodo_libros1.izquierda = Nodo_libros2;}
                }catch(e){
                    Nodo_libros1.izquierda = null;
                }
                //derecha
                try{
                    var Nodo_libros2 = this.buscar_Nodo_libros(i, j+1);
                    if(Nodo_libros2 != null){
                    Nodo_libros1.derecha = Nodo_libros2;}
                }catch(e){
                    Nodo_libros1.derecha = null;
                }
                //arriba
                try{
                    var Nodo_libros2 = this.buscar_Nodo_libros(i-1, j);
                    if(Nodo_libros2 != null){
                    Nodo_libros1.arriba = Nodo_libros2;}
                }catch(e){
                    Nodo_libros1.arriba = null;
                }
                //abajo
                try{
                    var Nodo_libros2 = this.buscar_Nodo_libros(i+1, j);
                    if(Nodo_libros2 != null){
                    Nodo_libros1.abajo = Nodo_libros2;}
                }catch(e){
                    Nodo_libros1.abajo = null;
                }
                
            }
        }

}
    eliminar_finales(columna){
        var Nodo_libros = this.primero;
        for (var j = 1; j < columna; j++) {
            Nodo_libros = Nodo_libros.derecha;
        }
        console.log(Nodo_libros.fila + " " + Nodo_libros.columna);
        
        while(Nodo_libros.abajo != null){

            Nodo_libros.derecha = null;
            Nodo_libros = Nodo_libros.abajo;
            
        }

    }

    buscar_Nodo_libros(fila, columna) {
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
        var codigodot = "digraph G{bgcolor=none \n graph[size = \"11.70,6.25\" ]  \nlabel=\" Clasificación Fantasia \";\nnode [shape=box];\n";        
        var conexiones ="";
        var Nodo_libross ="";    
        
        for (var i = 1; i < fila+1; i++) {    
                       //columnas
                       for (var j = 1; j < columna+1; j++) {
                        var Nodo_libros = this.nueva_busqueda(i, j);
                        
                        if(Nodo_libros == null){
                            continue;
                        }else{                    
                            if(Nodo_libros.arriba != null){
                                conexiones += "N" + (Nodo_libros.fila+50)+""+ Nodo_libros.columna + " -> N" + (Nodo_libros.arriba.fila+50)+""+ Nodo_libros.arriba.columna + ";\n"
                            }else{
                                Nodo_libross += "colum" +j + "[label=\"" + j + "\"];\n";
                                conexiones += "colum" + j + " -> N" + (Nodo_libros.fila+50)+""+ Nodo_libros.columna + ";\n"
                            }
                            
                            if(Nodo_libros.abajo != null){
                                conexiones += "N" + (Nodo_libros.fila+50)+""+ Nodo_libros.columna + " -> N" + (Nodo_libros.abajo.fila+50)+""+ Nodo_libros.abajo.columna + ";\n"
                            }                    
                            codigodot += "\n"+conexiones+"\n"
                            var conexiones ="";
                        }
                        
                        
                    }        
            //filas
            for (var j = 1; j < columna+1; j++) {
                var Nodo_libros = this.nueva_busqueda(i, j);  
               
                if(Nodo_libros == null){
                    continue;
                }else{
                                        
                    Nodo_libross += "N" + (Nodo_libros.fila+50) + ""+Nodo_libros.columna + "[label=\"" + Nodo_libros.nombre_libro + "\"];\n";
                    
                    if(Nodo_libros.izquierda != null){
                    
                        conexiones += "N" + (Nodo_libros.fila+50)+""+ Nodo_libros.columna + " -> N" + (Nodo_libros.izquierda.fila+50)+""+ Nodo_libros.izquierda.columna + ";\n"
                    }else{
                        Nodo_libross += "ayuda" +i + "[label=\"" + i + "\"];\n";
                        conexiones += "ayuda" + i + " -> N" + (Nodo_libros.fila+50)+""+ Nodo_libros.columna + ";\n"
                    }
                    if(Nodo_libros.derecha != null){
                        conexiones += "N" + (Nodo_libros.fila+50)+""+ Nodo_libros.columna + " -> N" + (Nodo_libros.derecha.fila+50)+""+ Nodo_libros.derecha.columna + ";\n"
                    }                    

                }                
                
            }
             
            codigodot += "{rank=same;\n"+conexiones+"\n}\n";
            var conexiones ="";

 
            
            var conexiones ="";
        }
        
        //agregando Nodo_libross
        codigodot += Nodo_libross+"\n"
        
        //agregando conexiones
        codigodot += "\n}"
        //console.log(codigodot)
        console.log(codigodot)
        d3.select("#lienzo1").graphviz()
        
        //cambiar tamaño de lienzo
        .renderDot(codigodot);
        
    }

    nueva_busqueda(fila, columna){

        var Nodo_libros = this.primero;        
        for (var j = 1; j < columna; j++) {
            Nodo_libros = Nodo_libros.derecha;
        }
        for (var i = 1; i < fila; i++) {
            Nodo_libros = Nodo_libros.abajo;
        }
        return Nodo_libros;
           
    }

    leerJson(){
        var ayuda = this.primero;
        var segundo = this.primero;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                
                var json = JSON.parse(this.responseText);
                for (var i = 0; i < json.length; i++) {
                    if(json[i].categoria == "Fantasia"){
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
                    console.log("se logro");
                    Lista_libros.graficar_octogonal(25,25);  
            }
        };      
        xhttp.open("GET", "../libros.json", true);
        xhttp.send();

        
        }
        agregar_Nodo_libros(isbm, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria){
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
            let json_fantasia = JSON.parse(localStorage.getItem("json_fantasia"));
            if(json_fantasia != null){
            this.crearMatriz(25,25);
            this.unir_Nodo_libross(25,25);
            this.eliminar_finales(25)
            for (var i = 0; i < json_fantasia.length; i++) {
                this.agregar_Nodo_libros(json_fantasia[i].isbm, json_fantasia[i].nombre_autor, json_fantasia[i].nombre_libro, json_fantasia[i].cantidad, json_fantasia[i].fila, json_fantasia[i].columna, json_fantasia[i].paginas, json_fantasia[i].categoria);
            }
            this.graficar_octogonal(25,25);
            }
            else{
                this.crearMatriz(25,25);
                this.unir_Nodo_libross(25,25);
                this.eliminar_finales(25)
                this.graficar_octogonal(25,25);
            }
        }
    
}

var formulario = document.getElementById("lienzo1");

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    console.log("Formulario enviado");
    //recibir documento de formulario
    let file = document.querySelector('#file1');
    let reader = new FileReader();
    reader.readAsText(file.files[0]);
    reader.onload = function(e){
        //guardar documento
        

        let contenido = e.target.result;
        var json = JSON.parse(contenido);
        
        //guarda el json en el localStorage
        localStorage.setItem("json_fantasia", contenido);
        
        var Lista_libross = new Lista_libros();

        Lista_libross.crearMatriz(25,25);
        Lista_libross.unir_Nodo_libross(25,25);
        Lista_libross.eliminar_finales(25);

        for (var i = 0; i < json.length; i++) {
            if(json[i].categoria == "Fantasia"){
                console.log("entro");
                Lista_libross.agregar_Nodo_libros(json[i].isbm, json[i].nombre_autor, json[i].nombre_libro, json[i].cantidad, json[i].fila, json[i].columna, json[i].paginas, json[i].categoria);                   
            }
        }
        Lista_libross.graficar_octogonal(25,25);        
        
    }

})

var usuario = new Lista_libros();
usuario.iniciar_lista();

