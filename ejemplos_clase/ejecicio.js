class Nodo {
    constructor(numero) {
        this.numero = numero;
        this.valor = null;
        this.anterior = null;
        this.siguiente = null;
    }
}

class Lista {
    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.x = 0;
    }
    agregar(numero) {
        var nuevo = new Nodo(numero);
        if (this.primero == null) {
            this.primero = nuevo;
            this.primero.valor = this.x;
            this.ultimo = nuevo;
            this.ultimo.valor = this.x;
            this.x++;
        } else {
            var ayuda = this.ultimo;
            this.ultimo.siguiente = nuevo;            
            this.ultimo = nuevo;
            this.ultimo.valor  = this.x;
            this.ultimo.anterior = ayuda;
            this.ultimo.siguiente = this.primero;
            this.primero.anterior = this.ultimo;
            this.x++;
        }
    }

    imprimir_inicio() {
        var codigodot = "digraph G{\nlabel=\"  Conexiones \";\nnode [shape=box];\n";        
        var conexiones ="";
        var nodos ="";
        var actual = this.primero;
        var ultimo = this.primero.siguiente;

        nodos+=  "N" + actual.valor+ "[label=\"" + actual.numero + "\" ];\n";
        conexiones += "N" + actual.valor + " -> N" + actual.siguiente.valor + ";\n"
        conexiones += "N" + actual.valor + " -> N" + actual.anterior.valor + ";\n"
        while (actual != ultimo) {
            

        nodos+=  "N" + ultimo.valor+ "[label=\"" + ultimo.numero + "\" ];\n";
        conexiones += "N" + ultimo.valor + " -> N" + ultimo.siguiente.valor + ";\n"
        conexiones += "N" + ultimo.valor + " -> N" + ultimo.anterior.valor + ";\n"
        ultimo = ultimo.siguiente;
        

    }
    codigodot += "{rank=same;\n"+conexiones+"\n}\n";
    //agregando nodos
    codigodot += nodos+"\n";
        
    //agregando conexiones
    codigodot += "\n"
    //atras hacia adelante
        
    var conexiones ="";
    var nodos ="";
    var ultimo = this.primero.anterior
    
    
//conexiones += "N1" + this.primero.valor + " -> N1" + this.primero.siguiente.valor + ";\n"
    while (ultimo.valor != 0) {        
    nodos+=  "N1" + ultimo.valor+ "[label=\"" + ultimo.numero + "\" ];\n";
    conexiones += "N1" + ultimo.valor + " -> N1" + ultimo.siguiente.valor + ";\n"
    conexiones += "N1" + ultimo.valor + " -> N1" + ultimo.anterior.valor + ";\n"
    ultimo = ultimo.anterior;   
}
console.log(ultimo.valor+" "+ultimo.numero)
console.log(ultimo.anterior.valor+" "+ultimo.anterior.numero)
nodos+=  "N1" + ultimo.valor+ "[label=\"" + ultimo.numero + "\" ];\n";
conexiones += "N1" + ultimo.valor + " -> N1" + ultimo.anterior.valor + ";\n"

//conexiones += "N1" + this.primero.valor + " -> N1" + this.primero.anterior.valor + ";\n"



codigodot += "{rank=same;\n"+conexiones+"\n}\n";
//agregando nodos
codigodot += nodos+"\n";
    
//agregando conexiones
codigodot += "\n"

//tercero

var conexiones ="";
    var nodos ="";
    var actual = this.primero;
    var ayuda = this.primero.anterior;
    var ultimo = this.primero;

 
    
         for (var i = 0; i < this.x-1; i++) {
             if(ultimo.anterior.valor != this.x-1){

                nodos+=  "N7" + ultimo.valor+ "[label=\"" + ultimo.numero + "\" ];\n";
                conexiones += "N7" + ultimo.valor + " -> N7" + ultimo.siguiente.valor + ";\n"
                conexiones += "N7" + ultimo.valor + " -> N7" + ultimo.anterior.valor + ";\n"
                ultimo = ultimo.siguiente;
             }
             else{
                nodos+=  "N7" + ultimo.valor+ "[label=\"" + ultimo.numero + "\" ];\n";
                conexiones += "N7" + ultimo.valor + " -> N7" + ultimo.siguiente.valor + ";\n"
                ultimo = ultimo.siguiente;
             }
         }

         nodos+=  "N7" + ultimo.valor+ "[label=\"" + ultimo.numero + "\" ];\n";
            conexiones += "N7" + ultimo.valor + " -> N7" + ultimo.anterior.valor + ";\n"
            ultimo = ultimo.siguiente;

            

            nodos+=  "N0" + ultimo.valor+ "[label=\"" + ultimo.numero + "\" ];\n";   
            conexiones += "N0" + ultimo.valor + " -> N7" + ultimo.anterior.valor + ";\n"  
            conexiones += "N7" + ultimo.anterior.valor + " -> N0" + ultimo.valor + ";\n"        
            conexiones += "N0" + ultimo.valor + " -> N0" + ultimo.siguiente.valor + ";\n"
            ultimo = ultimo.siguiente;
            for (var i = 0; i < this.x-2; i++) {       
            nodos+=  "N0" + ultimo.valor+ "[label=\"" + ultimo.numero + "\" ];\n";
            
            conexiones += "N0" + ultimo.valor + " -> N0" + ultimo.anterior.valor + ";\n"
            conexiones += "N0" + ultimo.valor + " -> N0" + ultimo.siguiente.valor + ";\n"
            ultimo = ultimo.siguiente;
    }
    
        
        conexiones += "N0" + ultimo.valor + " -> N0" + ultimo.anterior.valor + ";\n"
           nodos+=  "N7" + actual.valor+ "[label=\"" + actual.numero + "\" ];\n";
    nodos+=  "N0" + ayuda.valor+ "[label=\"" + ayuda.numero + "\" ];\n";
    conexiones += "N7" + actual.valor + " -> N0" + ayuda.valor + ";\n"
    conexiones += "N0" + ayuda.valor + " -> N7" + actual.valor + ";\n"

        
    

codigodot += "{rank=same;\n"+conexiones+"\n}\n";
var conexiones ="";
conexiones += "N" + 0 + " -> N1" + 8 + ";\n"
conexiones += "N1" + 8 + " -> N7" + 0 + ";\n"
codigodot += "\n"+conexiones+"\n";
//agregando nodos
codigodot += nodos+"\n";
    
//agregando conexiones
codigodot += "\n}"



console.log(codigodot)
    
        
    d3.select("#lienzo1").graphviz()
    .renderDot(codigodot)
}
imprimir_atras() {
    var codigodot = "digraph G{\nlabel=\"Atras hacia delante \";\nnode [shape=box];\n";        
    var conexiones ="";
    var nodos ="";
    var actual = this.primero;
    var ultimo = this.primero.anterior
    nodos+=  "N" + actual.valor+ "[label=\"" + actual.numero + "\" ];\n";
    conexiones += "N" + actual.valor + " -> N" + actual.anterior.valor + ";\n"
    conexiones += "N" + actual.valor + " -> N" + actual.siguiente.valor + ";\n"
    while (ultimo.valor != 0) {
        

    nodos+=  "N" + ultimo.valor+ "[label=\"" + ultimo.numero + "\" ];\n";
    conexiones += "N" + ultimo.valor + " -> N" + ultimo.siguiente.valor + ";\n"
    conexiones += "N" + ultimo.valor + " -> N" + ultimo.anterior.valor + ";\n"
    ultimo = ultimo.anterior;
    

}
codigodot += "{rank=same;\n"+conexiones+"\n}\n";
//agregando nodos
codigodot += nodos+"\n}";
    
//agregando conexiones
codigodot += "\n}"
console.log(codigodot)

        
d3.select("#ayuda").graphviz()
.renderDot(codigodot)
}

imprimir_doble() {
    var codigodot = "digraph G{\nlabel=\" Doble \";\nnode [shape=box];\n";        
    var conexiones ="";
    var nodos ="";
    var actual = this.primero;
    var ayuda = this.primero.anterior;
    var ultimo = this.primero;

 
    
         for (var i = 0; i < this.x-1; i++) {
             if(ultimo.anterior.valor != this.x-1){

                nodos+=  "N" + ultimo.valor+ "[label=\"" + ultimo.numero + "\" ];\n";
                conexiones += "N" + ultimo.valor + " -> N" + ultimo.siguiente.valor + ";\n"
                conexiones += "N" + ultimo.valor + " -> N" + ultimo.anterior.valor + ";\n"
                ultimo = ultimo.siguiente;
             }
             else{
                nodos+=  "N" + ultimo.valor+ "[label=\"" + ultimo.numero + "\" ];\n";
                conexiones += "N" + ultimo.valor + " -> N" + ultimo.siguiente.valor + ";\n"
                ultimo = ultimo.siguiente;
             }
         }

         nodos+=  "N" + ultimo.valor+ "[label=\"" + ultimo.numero + "\" ];\n";
            conexiones += "N" + ultimo.valor + " -> N" + ultimo.anterior.valor + ";\n"
            ultimo = ultimo.siguiente;

            

            nodos+=  "N0" + ultimo.valor+ "[label=\"" + ultimo.numero + "\" ];\n";   
            conexiones += "N0" + ultimo.valor + " -> N" + ultimo.anterior.valor + ";\n"  
            conexiones += "N" + ultimo.anterior.valor + " -> N0" + ultimo.valor + ";\n"        
            conexiones += "N0" + ultimo.valor + " -> N0" + ultimo.siguiente.valor + ";\n"
            ultimo = ultimo.siguiente;
            for (var i = 0; i < this.x-2; i++) {       
            nodos+=  "N0" + ultimo.valor+ "[label=\"" + ultimo.numero + "\" ];\n";
            
            conexiones += "N0" + ultimo.valor + " -> N0" + ultimo.anterior.valor + ";\n"
            conexiones += "N0" + ultimo.valor + " -> N0" + ultimo.siguiente.valor + ";\n"
            ultimo = ultimo.siguiente;
    }
    
        
        conexiones += "N0" + ultimo.valor + " -> N0" + ultimo.anterior.valor + ";\n"
           nodos+=  "N" + actual.valor+ "[label=\"" + actual.numero + "\" ];\n";
    nodos+=  "N0" + ayuda.valor+ "[label=\"" + ayuda.numero + "\" ];\n";
    conexiones += "N" + actual.valor + " -> N0" + ayuda.valor + ";\n"
    conexiones += "N0" + ayuda.valor + " -> N" + actual.valor + ";\n"

        
    

codigodot += "{rank=same;\n"+conexiones+"\n}\n";
//agregando nodos
codigodot += nodos+"\n}";
    
//agregando conexiones
codigodot += "\n}"



console.log(codigodot)
        
d3.select("#lienzo3").graphviz()
.renderDot(codigodot)
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
lista.imprimir_inicio();
