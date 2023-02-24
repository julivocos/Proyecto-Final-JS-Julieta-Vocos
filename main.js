


class Productos {

    constructor(nombre, precio, talle, stock) {

        this.nombre = nombre;
        this.precio = precio;
        this.talle = talle;
        this.stock = stock;
    }

    get_datos() {

        console.log("<-----Producto-------->");
        console.log("Nombre: ", this.nombre);
        console.log("Precio: ", this.precio);
        console.log("Talle: ", this.talle);
        console.log("Stock: ", this.stock);
        console.log("");
    }

    get_stock() {

        if (this.stock <= 0) {
            return false
        }
        else {
            return true
        }
    }

    update_stock(unidades) {

        if (this.stock >= unidades) {

            this.stock = this.stock - unidades
        }
        else {
            console.log("Stock insuficiente");

        }
    }

}

//Alta de productos 

let catalogo_productos = [];

catalogo_productos.push(new Productos("JEAN", 5000, 38, 5));
catalogo_productos.push(new Productos("JEAN", 5000, 40, 8));
catalogo_productos.push(new Productos("JEAN", 5000, 42, 4));
catalogo_productos.push(new Productos("JEAN", 5000, 44, 3));
catalogo_productos.push(new Productos("BLUSA", 3000, 1, 5));
catalogo_productos.push(new Productos("BLUSA", 3000, 2, 6));
catalogo_productos.push(new Productos("BLUSA", 3000, 3, 8));
catalogo_productos.push(new Productos("BLUSA", 3000, 4, 3))
catalogo_productos.push(new Productos("SWEATER", 10000, 1, 5));
catalogo_productos.push(new Productos("SWEATER", 10000, 2, 3));
catalogo_productos.push(new Productos("SWEATER", 10000, 3, 4));
catalogo_productos.push(new Productos("SWEATER", 10000, 4, 5));
catalogo_productos.push(new Productos("CAMISA", 8000, 1, 5));
catalogo_productos.push(new Productos("CAMISA", 8000, 2, 5));
catalogo_productos.push(new Productos("CAMISA", 8000, 3, 5));
catalogo_productos.push(new Productos("VESTIDO", 12000, 1, 5));
catalogo_productos.push(new Productos("VESTIDO", 12000, 2, 5));
catalogo_productos.push(new Productos("VESTIDO", 12000, 3, 5));
catalogo_productos.push(new Productos("BLAZER", 15000, 1, 5));
catalogo_productos.push(new Productos("BLAZER", 15000, 2, 5));
catalogo_productos.push(new Productos("BLAZER", 15000, 3, 5));
catalogo_productos.push(new Productos("BLAZER", 15000, 4, 5));

// fin alta de productos


// render de productos

/*for (let producto of catalogo_productos){

    producto.get_datos();
}
*/
//compra de productos

let carrito = [];

let numAlert=0;
//cuando selecciona el talle se ejecuta la funcion
function agregar_al_carrito(e) {

   

    function buscar_productoTalle(producto) {

        return producto.talle == e.target.textContent

    }

    function buscar_productoNombre(producto) {

        return producto.nombre == nombre_producto
    }

    let compra_usuario;
    let padre;
    let nombre_producto;


    compra_usuario = e.target;
    padre = compra_usuario.parentNode.parentNode.parentNode.parentNode;

    nombre_producto = padre.querySelector("h4").textContent;
    let precio_pto = padre.querySelector("h5").textContent;

    let resultado_Nombre = catalogo_productos.filter(buscar_productoNombre);

    let resultado_Talle = resultado_Nombre.find(buscar_productoTalle);


    carrito.push(resultado_Talle);
    numAlert= numAlert+1;
    console.log(numAlert);
    console.log("Su compra", carrito);

    crear_alerta(resultado_Talle);
    mostrar_carrito(resultado_Talle);

}


function crear_alerta(resultado_Talle){
    
    let btnAlert = document.getElementById("btn-alert");
    if (btnAlert==1){
        btnAlert.append(numAlert);  
    }
    
    else{
        let alerts = document.getElementById("btn-alert");
        alerts.innerHTML = numAlert;
    }
    
}


let btn_talle = document.querySelectorAll(".btn_talle");

for (let boton of btn_talle) {

    boton.addEventListener("click", agregar_al_carrito);
}

let ventana_carrito = document.getElementById("abrir_carrito");
ventana_carrito.addEventListener("click", mostrar_carrito);

function mostrar_carrito(resultado_Talle) {

    let fila = document.createElement("tr");
    fila.innerHTML = `<td>${resultado_Talle.nombre}</td>
                      <td>${resultado_Talle.talle}</td>
                       <td>$${resultado_Talle.precio}</td>
                       <td><button class="btn btn-danger borrar_elemento">Borrar</button></td>`;

    let tabla = document.getElementById("tbody");
    tabla.append(fila);

    let btn_borrar = document.querySelectorAll(".borrar_elemento");

    for (let boton of btn_borrar) {

        boton.addEventListener("click", borrar_producto);
    }

    finalizar_compra();

}


function borrar_producto(e) {
    
    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    let nombreProducto = abuelo.getElementsByTagName("td")[0].innerHTML;
    let talleProducto = abuelo.getElementsByTagName("td")[1].innerHTML;
    //let datoTd = document.getElementsByTagName("th");
    console.log(nombreProducto);
    console.log(talleProducto);

    abuelo.remove();
    console.log("eliminó ", abuelo);

    let indexBorrar = carrito.findIndex((element) => element.nombre == nombreProducto && element.talle == talleProducto);
   
    carrito.splice(indexBorrar, 1);
    
    let alerts = document.getElementById("btn-alert");
    alerts.innerHTML = numAlert-1;
    numAlert= numAlert-1;
    

    finalizar_compra();

}


let contador = 0;
let suma;

function finalizar_compra() {
    suma = 0;
    
    contador = contador + 1;

    carrito.forEach(element => {
        suma = suma + element.precio;

    });
    console.log(carrito);
    console.log("la suma es", suma);
    console.log("contador ", contador);

    if (contador == 1) {
        let total_compra = document.createElement("h5");

        let tabla = document.getElementById("totalPagar");
        tabla.append(total_compra);
        total_compra.innerHTML = `TOTAL A PAGAR $ ${suma}`;

    } else {

        let divTotal = document.getElementById("totalPagar");
        divTotal.innerHTML = `TOTAL A PAGAR $ ${suma}`;

    }


    let btn_pagar = document.getElementById("btn_pagar");
    btn_pagar.disabled=false;
    

}

function realizarPago() {

    
    //ingrese su nombre, apellido y mail para realizar el pago
    //se guarda los datos del pedido

    let cantidad = carrito.length;
    let pedidoPendiente = JSON.stringify(carrito);

    let pedido = {
        "total": suma,
        "cantidadPrendas": cantidad, 
        "detalle": pedidoPendiente
    }

   
    console.log("Pedido ", pedido);

    localStorage.setItem("pedido", JSON.stringify(pedido));
   // localStorage.setItem("detallePedido", pedidoPendiente);

    //alertas

        Swal.fire({
            text: '¿Confirma la compra?',
            icon: 'success',
            color: "black",  
            width: 400,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                window.location.href = "./pagar.html",   
               
              )
            }
          })
     
}


let btn_pagar = document.getElementById("btn_pagar");
btn_pagar.addEventListener("click", realizarPago);






