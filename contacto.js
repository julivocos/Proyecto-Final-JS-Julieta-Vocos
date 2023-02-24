let pedidoCliente= localStorage.getItem("pedido");


let pedido = JSON.parse(pedidoCliente);

let detalle = document.getElementById("detalle");
detalle.value= "TOTAL: "+ pedido.total + '\n' + "CANTIDAD DE PRENDAS: "+ pedido.cantidadPrendas + '\n' ;


function enviarDatos(){

    let nombreCliente = document.getElementById("nombre").value;
    let apellidoCliente = document.getElementById("apellido").value;
    let mailCliente = document.getElementById("mail").value;

    
    let cliente ={
        "nombre": nombreCliente,
        "apellido": apellidoCliente,
        "mail": mailCliente,
        "pedido": pedidoCliente
    }
    

    console.log("DATOS ", cliente);
    localStorage.setItem("datosCliente", JSON.stringify(cliente));

    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("mail").value ="";
    document.getElementById("detalle").value = "";


    Toastify({
        text: "Se confirmó su compra",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #F749D5  ,#F5613D ",
        },
       
      }).showToast();

}

let btnEnviar = document.getElementById("btnEnviar");
btnEnviar.addEventListener("click" , enviarDatos);



//luego de enviar los datos agregar un alert de libreria diciendo gracias por la compra + datos cliente
