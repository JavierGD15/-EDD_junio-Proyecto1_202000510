class Nodo_compras {
    constructor(nombre_usuario,repeticiones) {        
        this.nombre_usuario = nombre_usuario;
        this.repeticiones = repeticiones;
        this.anterior = null;
        this.siguiente = null;
    }
}
class tops{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        
    }
    insertar(nombre_usuario,repeticiones){
        var nuevo = new Nodo_compras(nombre_usuario,repeticiones);
        if(this.primero == null){
            this.primero = nuevo;
            this.primero.id = this.x;            
            this.ultimo = nuevo;

        }
        else{
            var ayuda = this.ultimo;
            this.ultimo.siguiente = nuevo;
            this.ultimo = nuevo;            
            
            this.ultimo.anterior = ayuda;
        }
    }
    imprimir(){
        var actual = this.primero;
        while(actual != null){
            console.log(actual.nombre_usuario+ " " + actual.repeticiones);
            if(actual.siguiente != null){
                console.log(actual.siguiente.repeticiones + " siguiente " + actual.siguiente.nombre_usuario);
            }
            if(actual.anterior != null){
                console.log(actual.anterior.repeticiones + " anterior " + actual.anterior.nombre_usuario);
            }
            actual = actual.siguiente;
        }
    }
    cargar_compras(){
        let json_fantasia = JSON.parse(localStorage.getItem("json_realizadas"));
        
        for(let i = 0; i < json_fantasia.length; i++){
            this.insertar(json_fantasia[i].nombre_usuario,json_fantasia[i].cantidad);
           
        }    

    }
    ordenar(){
        //ordenar localstorage
        var json_fantasia = JSON.parse(localStorage.getItem("json_realizadas"));
        var json_ordenado = json_fantasia.sort(function(a,b){
            return b.cantidad - a.cantidad;
        }
        );
        localStorage.setItem("json_realizadas",JSON.stringify(json_ordenado));
        this.cargar_compras();
        this.enviar_tabla();
        this.graficar();

    }
    enviar_tabla(){
        var actual = this.primero;
        while(actual != null){
            let tblDatos = document.getElementById("tblganadores").insertRow(-1);
            //insertar imagen
            let cellImg = tblDatos.insertCell(-1);
            let img = document.createElement("img");
            img.src = "../img/ibai.jpg";
            img.width = "100";
            img.height = "100";
            cellImg.appendChild(img);
            let cell2 = tblDatos.insertCell(-1);
            let cell3 = tblDatos.insertCell(-1);            

            cell2.innerHTML = actual.nombre_usuario;
            cell3.innerHTML =   actual.repeticiones;
            actual = actual.siguiente;
        }

             
    }
    graficar(){
        var codigodot = "digraph G{\nlabel=\" Top ventas \";\nnode [shape=box];\n";
        var actual = this.primero;
        console.log(actual.nombre_usuario + " " + actual.repeticiones);
        
        var recto = "";
        
        while (actual != null) {
            codigodot += actual.nombre_usuario + " [label=\"" + actual.nombre_usuario +"\n"+ actual.repeticiones + "\"];";
        if(actual.siguiente != null){
            recto += actual.nombre_usuario + " -> " + actual.siguiente.nombre_usuario+ ";";
            actual = actual.siguiente;
        }else{
            recto += actual.nombre_usuario + " -> " + this.primero.nombre_usuario+ ";";
            actual = actual.siguiente;
        }
            
        }
        codigodot += "{rank=same;\n"+recto+"\n}\n";
        codigodot += "}";
        d3.select("#lienzo10").graphviz()
        .renderDot(codigodot)
    }
}
var compras = new tops();
compras.ordenar();