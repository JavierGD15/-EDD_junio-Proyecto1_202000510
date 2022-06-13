class Nodo {
    constructor(numero) {
        this.numero = numero;
        this.id = null;
        this.siguiente = null;
    }
}

class Lista {
    constructor() {
        this.primero = null;
        this.x = 0;
        this.ultimo = null;
       
    }
    agregar(numero) {
        var nuevo = new Nodo(numero);
        if (this.primero == null) {
            this.primero = nuevo;   
            this.primero.id = this.x;        
            this.ultimo = nuevo;            
            this.x++;
           
        } else {          
            this.primero = nuevo;
            this.primero.id = this.x;
            this.primero.siguiente = this.ultimo;
            this.ultimo = nuevo;  
            this.x++;
        }
    }

    agregar_dos(numero,id) {
        var nuevo = new Nodo(numero);
        if (this.primero == null) {
            this.primero = nuevo;   
            this.primero.id = id;        
            this.ultimo = nuevo;    
               
            
           
        } else {          
            console.log("entra2");
            this.primero = nuevo;
            this.primero.id = id;
            this.primero.siguiente = this.ultimo;
            this.ultimo = nuevo;  
            
        }
    }

    imprimir_grap(linea) {
              
        var conexiones ="";
        var nodos ="";
        var actual = this.primero;
        var codigodot = "";


        
        while (actual != null) {
        nodos+=  "N"+linea+"" + actual.id+ "[label=\"" + actual.numero + "\" ];\n";   
        if (actual.siguiente != null) {
            conexiones += "N"+linea +"" + actual.id + "->N"+linea +"" + (actual.siguiente.id) +";\n";
            actual = actual.siguiente;
        }else{
            actual = actual.siguiente;
        }
        
        
        

    }
    var actual = this.primero;
    codigodot += nodos+"\n";
    ///conexiones += "N"+linea +"" + actual.id + "->N"+(linea+1) +"" + (actual.id)+";\n";
    codigodot += "\n"+conexiones+"\n";
    return codigodot;
}



pop(repeticiones) {
    var guardado = [];
    var ides = [];


    for (var i = 0; i < repeticiones; i++) {        
        ides.push(this.primero.id);
        guardado.push(this.primero.numero);      
        this.primero = this.primero.siguiente;        
    }
    this.ultimo = this.primero;
    
    this.push(guardado,ides,repeticiones);
    guardado = [];
    ides = [];
}

push(matriz,ides,repeticiones) {
    
    this.agregar_dos(matriz[0],ides[0]);
    for (var i = repeticiones-1; i > 0; i--) {
        this.agregar_dos(matriz[i],ides[i]);
    }
}

cambios() {
    var ayuda = this.primero;
    var cantidad = 0;
    var codigodot = "digraph G{\nlabel=\"  Adelante hacia atras  \";\nnode [shape=box];\n";        
    var conexiones ="";
    var nodos ="";
    while(ayuda != null){
        cantidad++;
        ayuda = ayuda.siguiente;
    }
    codigodot += this.imprimir_grap(77);
    
    for (var i = cantidad; i > 0; i--) {
        if(i != 0){
            console.log("entra"+i);
            this.pop(i);
        codigodot += this.imprimir_grap(i);
        }
        
        
    }
    this.imprimir();
        
    //agregando conexiones
    codigodot += "\n}"
    //console.log(codigodot)
    
        
    d3.select("#lienzo1").graphviz()
    .renderDot(codigodot)
    
      
}



imprimir(){
var ayuda = this.primero;
while(ayuda != null){
    console.log(ayuda.numero+" "+ayuda.id);
    ayuda = ayuda.siguiente;
}
console.log("*********************************************************");
}

}

var lista = new Lista();
lista.agregar(2);
lista.agregar(0);
lista.agregar(2);
lista.agregar(0);
lista.agregar(0);
lista.agregar(0);
lista.agregar(5);
lista.agregar(1);
lista.agregar(0);
lista.cambios();
//lista.imprimir();
//lista.imprimir_atras();
