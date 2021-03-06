class Nodo_pila_2 {
    constructor(numero) {
        this.numero = numero;
        this.id = null;
        this.siguiente = null;
    }
}

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

        this.primero_pila = null;
        this.ultimo_pila = null;
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
        var codigodot = "digraph G{bgcolor=none \n graph[size = \"11.70,6.25\" ]\n edge[dir = \"both\"] \nlabel=\" Clasificaci??n Fantasia \";\nnode [shape=box];\n";        
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
enviar_tabla(){            
            
    for(var i=1; i<26; i++){             
        for(var j=1; j<26; j++){
            var ayuda = this.nueva_busqueda(i,j);
            if(ayuda == null){
                break
            }else if(ayuda.nombre_autor ==null){
                continue}
                else{                    
                    let tblDatos = document.getElementById("tblDatos").insertRow(-1);
                    //insertar imagen
                    let cellImg = tblDatos.insertCell(-1);
                    let img = document.createElement("img");
                    img.src = "../img/libro_rojo.jpg";
                    img.width = "30";
                    img.height = "30";
                    cellImg.appendChild(img);
                    let cell2 = tblDatos.insertCell(-1);
                    let cell3 = tblDatos.insertCell(-1);
                    let cell4 = tblDatos.insertCell(-1);
                    let cell5 = tblDatos.insertCell(-1);
                    let cell6 = tblDatos.insertCell(-1);         
                    //enviar boton
                    let cell7 = tblDatos.insertCell(-1);
                    let btn = document.createElement("button");
                    btn.innerHTML = "Comprar";
                    btn.setAttribute("type", "submit");
                    btn.setAttribute("onclick", "comprar_libro("+i+","+j+")");
                    cell7.appendChild(btn);     
                    
                    cell2.innerHTML = ayuda.categoria;
                    cell3.innerHTML = ayuda.nombre_libro;
                    cell4.innerHTML = ayuda.nombre_autor;
                    cell5.innerHTML = ayuda.paginas;
                    cell6.innerHTML = ayuda.cantidad;
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
        console.log(agregar);
        compras.push(agregar);
        localStorage.setItem("json_compras", JSON.stringify(compras));
        alert("Se ha comprado el libro");
        this.escribir_json();
        location.reload();
        }else{
            agregar.nombre_libro = ayuda.nombre_libro;  
            agregar.nombre_usuario = usuario; 
            console.log(agregar);
            compra.push(agregar);
            localStorage.setItem("json_compras", JSON.stringify(compra));
            alert("Se ha comprado el libro");
            this.escribir_json();
            location.reload();
        }
    }else{
        
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
            }else if(ayuda.nombre_autor ==null){
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
    localStorage.setItem("json_Thriller", JSON.stringify(json_fantasia));

}



iniciar_lista(){
    let json_fantasia = JSON.parse(localStorage.getItem("json_Thriller"));
    if(json_fantasia != null){
    this.crearMatriz(25,25);
    this.unir_Nodo_thriller_libross(25,25);
    this.eliminar_finales(25)
    for (var i = 0; i < json_fantasia.length; i++) {
        if(json_fantasia[i].categoria == "Thriller"){
            this.agregar_Nodo_thriller_libros(json_fantasia[i].isbn, json_fantasia[i].nombre_autor, json_fantasia[i].nombre_libro, json_fantasia[i].cantidad, json_fantasia[i].fila, json_fantasia[i].columna, json_fantasia[i].paginas, json_fantasia[i].categoria);
          }
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



agregar_pila(numero) {
    var nuevo = new Nodo_pila_2(numero);
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
            if(json[i].categoria == "Thrille"){
                
                Lista_thriller_libross.agregar_Nodo_thriller_libros(json[i].isbn, json[i].nombre_autor, json[i].nombre_libro, json[i].cantidad, json[i].fila, json[i].columna, json[i].paginas, json[i].categoria);                   
            }
        }
        Lista_thriller_libross.graficar_octogonal(25,25);
        
    }
})

var dispersa = new Lista_thriller();
dispersa.iniciar_lista();
dispersa.enviar_tabla();
function comprar_libro(fila, columna){
    dispersa.comprar_libro(fila, columna);
}

function pila(fila, columna){
    
    dispersa.pila(fila, columna);
}
