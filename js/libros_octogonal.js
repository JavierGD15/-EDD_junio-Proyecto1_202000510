class Nodo_pila {
    constructor(numero) {
        this.numero = numero;
        this.id = null;
        this.siguiente = null;
    }
}
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

        this.primero_pila = null;
        this.ultimo_pila = null;
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
        var codigodot = "digraph G{bgcolor=none \n graph[size = \"11.70,6.25\" ]  \nlabel=\" Clasificaci??n Fantasia \";\nnode [shape=box];\n";        
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
        d3.select("#lienzo1").graphviz()
        
        //cambiar tama??o de lienzo
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
                if(json_fantasia[i].categoria == "Fantasia"){
                this.agregar_Nodo_libros(json_fantasia[i].isbn, json_fantasia[i].nombre_autor, json_fantasia[i].nombre_libro, json_fantasia[i].cantidad, json_fantasia[i].fila, json_fantasia[i].columna, json_fantasia[i].paginas, json_fantasia[i].categoria);
            }}
            this.graficar_octogonal(25,25);
            }
            else{
                this.crearMatriz(25,25);
                this.unir_Nodo_libross(25,25);
                this.eliminar_finales(25)
                this.graficar_octogonal(25,25);
            }
        }

        enviar_tabla(){
            
            
            for(var i=1; i<26; i++){
                     
                for(var j=1; j<26; j++){
                    var ayuda = this.nueva_busqueda(i,j);
                    if(ayuda == null){
                        break
                    }else if(ayuda.nombre_autor ==""){
                        continue}
                        else{
                            
                            let tblDatos = document.getElementById("tblDatos").insertRow(-1);
                            //insertar imagen
                            let cellImg = tblDatos.insertCell(-1);
                            let img = document.createElement("img");
                            img.src = "../img/libro.png";
                            img.width = "30";
                            img.height = "30";
                            cellImg.appendChild(img);
                            
                            let cell2 = tblDatos.insertCell(-1);
                            let cell3 = tblDatos.insertCell(-1);
                            let cell4 = tblDatos.insertCell(-1);
                            let cell5 = tblDatos.insertCell(-1);
                            let cell6 = tblDatos.insertCell(-1);                  
                            
                            cell2.innerHTML = ayuda.categoria;
                            cell3.innerHTML = ayuda.nombre_libro;
                            cell4.innerHTML = ayuda.nombre_autor;
                            cell5.innerHTML = ayuda.paginas;
                            cell6.innerHTML = ayuda.cantidad;
                            //enviar boton
                    let cell7 = tblDatos.insertCell(-1);
                    let btn = document.createElement("button");
                    btn.innerHTML = "Comprar";
                    btn.setAttribute("type", "submit");
                   

                    btn.setAttribute("onclick", "comprar_libros("+i+","+j+")");
                    cell7.appendChild(btn);     


                    let cell8 = tblDatos.insertCell(-1);
                    let btn1 = document.createElement("button");
                    btn1.innerHTML = "Pila";
                    btn1.setAttribute("type", "submit");
                   

                    btn1.setAttribute("onclick", "pila("+i+","+j+")");
                    cell8.appendChild(btn1);    
                        }
                }
            }
            
           

        }

comprar_libro(fila, columna){
            let compra = [];
            let agregar ={};
            var ayuda = this.nueva_busqueda(fila,columna);
            let usuario = localStorage.getItem("usuario_activo");
            let compras = JSON.parse(localStorage.getItem("json_compras"));
            let realizadas = JSON.parse(localStorage.getItem("json_realizadas"));

            if(realizadas == null){
                agregar.nombre_usuario = usuario;
                agregar.cantidad = 1;
                compra.push(agregar);
                localStorage.setItem("json_realizadas", JSON.stringify(compra));
            }
            else{
                var bandera = false;
                for (var i = 0; i < realizadas.length; i++) {
                    if(realizadas[i].nombre_usuario == usuario){
                        realizadas[i].cantidad = realizadas[i].cantidad + 1;
                        localStorage.setItem("json_realizadas", JSON.stringify(realizadas));
                        bandera = true;
                        break;
                    }
                    
                }
                if(bandera == false){
                    
                        agregar.nombre_usuario = usuario;
                        agregar.cantidad = 1;
                        realizadas.push(agregar);
                        localStorage.setItem("json_realizadas", JSON.stringify(realizadas));
                    
                }
                
            }
            compra = [];
            agregar ={};

        if(ayuda.cantidad > 0){
            if(compras != null){
            ayuda.cantidad = ayuda.cantidad - 1; 
            agregar.nombre_libro = ayuda.nombre_libro;  
            agregar.nombre_usuario = usuario; 
            
            compras.push(agregar);
            localStorage.setItem("json_compras", JSON.stringify(compras));
            alert("Se ha comprado el libro");
            this.escribir_json();
            location.reload();
            }else{
                agregar.nombre_libro = ayuda.nombre_libro;  
                agregar.nombre_usuario = usuario; 
                
                compra.push(agregar);
                localStorage.setItem("json_compras", JSON.stringify(compra));
                alert("Se ha comprado el libro");
                this.escribir_json();
                location.reload();
            }
    }else{
        console.log("No hay libros");
        alert("No hay libros disponibles");
    }
    }

        escribir_json(){
            //escribir json
            let libros = {};
            let json_fantasia = [];
            for(var i=1; i<26; i++){
                for(var j=1; j<26; j++){
                    var ayuda = this.nueva_busqueda(i,j);
                    if(ayuda == null){
                        break
                    }else if(ayuda.nombre_autor ==""){
                        continue}
                        else{
                            libros.isbn = ayuda.isbn;                            
                            libros.nombre_autor = ayuda.nombre_autor;
                            libros.nombre_libro = ayuda.nombre_libro;
                            libros.cantidad = ayuda.cantidad;
                            libros.fila = ayuda.fila;
                            libros.columna = ayuda.columna;
                            libros.paginas = ayuda.paginas;
                            libros.categoria = ayuda.categoria;                            
                            json_fantasia.push(libros);
                            libros = {};
                            
                        }
                }
                
            }console.log(json_fantasia);
            localStorage.setItem("json_fantasia", JSON.stringify(json_fantasia));

        }
        agregar_pila(numero) {
            var nuevo = new Nodo_pila(numero);
            if (this.primero_pila == null) {
                this.primero_pila = nuevo;   
                this.primero_pila.id = this.x;        
                this.ultimo = nuevo;            
                this.x++;
               
            } else {          
                this.primero_pila = nuevo;
                this.primero_pila.id = this.x;
                this.primero_pila.siguiente = this.ultimo;
                this.ultimo = nuevo;  
                this.x++;
            }
        }
        imprimir_grap(linea) {
              
            var conexiones ="";
            var nodos ="";
            var actual = this.primero_pila;
            var codigodot = "";
    
    
            
            while (actual != null) {
            nodos+=  "N"+linea+"" + actual.numero+ "[label=\"" + actual.numero + "\" ];\n";   
            if (actual.siguiente != null) {
                conexiones += "N"+linea +"" + actual.numero + "->N"+linea +"" + (actual.siguiente.numero) +";\n";
                actual = actual.siguiente;
            }else{
                actual = actual.siguiente;
            }
            
            
            
    
        }
        
        codigodot += nodos+"\n";
        ///conexiones += "N"+linea +"" + actual.id + "->N"+(linea+1) +"" + (actual.id)+";\n";
        codigodot += "\n"+conexiones+"\n";
        return codigodot;
    }

        cambios_pila() {
            var ayuda = this.primero_pila;
            var cantidad = 0;
            var codigodot = "digraph G{\nlabel=\"  Cola  \";\nnode [shape=box];\n";        
            var conexiones ="";
            var nodos ="";
            codigodot += this.imprimir_grap(77);
            
                
            //agregando conexiones
            codigodot += "\n}"
            console.log(codigodot)
            
                
            d3.select("#lienzo70").graphviz()
            .renderDot(codigodot)
            
              
        }

        pila(fila, columna){
            var ayuda = this.nueva_busqueda(fila,columna);
            this.primero_pila = null;
            this.ultimo_pila = null;
            //for que disminuye 
            if(ayuda.cantidad > 0){
            for(var i=1; i<ayuda.cantidad+1; i++){
                this.agregar_pila(i);
            }

            
            this.agregar_pila(ayuda.nombre_libro);
            this.cambios_pila();
            }else{
                alert("No hay libros disponibles");
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
                Lista_libross.agregar_Nodo_libros(json[i].isbn, json[i].nombre_autor, json[i].nombre_libro, json[i].cantidad, json[i].fila, json[i].columna, json[i].paginas, json[i].categoria);                   
            }
        }
        Lista_libross.graficar_octogonal(25,25);        
        
    }

})

var usuario = new Lista_libros();

usuario.iniciar_lista();
usuario.enviar_tabla();
function comprar_libros(fila, columna){
    usuario.comprar_libro(fila, columna);
}

function pila(fila, columna){
    
    usuario.pila(fila, columna);
}

