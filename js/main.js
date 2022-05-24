/* variables*/
const reservarBoton = document.querySelector("#reservar-btn")
const reservarBoton2 = document.querySelector("#reservar-btn2")
const reservarBoton3 = document.querySelector("#reservar-btn3")
const vaciarBoton = document.querySelector("#borrar-btn")
const contenedorCarrito = document.querySelector(".carrito-lista")

/* clase constructora */ 
class Habitacion{
    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio;  
    }
};

/* tipos de habitaciones */ 
const individual = new Habitacion("Habitación individual", 800);
const matrimonial = new Habitacion("Habitación matrimonial", 2000);
const presidencial = new Habitacion("Suite presidencial", 5000);

/* boton reservar */
reservarBoton.addEventListener("click", ()=> {
    let html;

    html=
    `
    <h3>${individual.nombre}</h3>
    <p>Total= $${individual.precio}</p>
    <img src="img/individual.jpg" alt="individual" width="120px" height="120px">
    `
    contenedorCarrito.innerHTML += html
});

reservarBoton2.addEventListener("click", ()=>{
    let html

    html=
    `
    <h3>${matrimonial.nombre}</h3>
    <p>Total= $${matrimonial.precio}</p>
    <img src="img/matrimonial.jpg" alt="matrimonial" width="120px" height="120px">
    `
    contenedorCarrito.innerHTML += html
});

reservarBoton3.addEventListener("click", ()=>{
    let html

    html=
    `
    <h3>${presidencial.nombre}</h3>
    <p>Total= $${presidencial.precio}</p>
    <img src="img/presidencial.jpg" alt="matrimonial" width="120px" height="120px">
    `
    contenedorCarrito.innerHTML += html
})

 /* boton borrar */ 
 function vaciarCarrito(){
     contenedorCarrito.innerHTML= "";
 }

 vaciarBoton.addEventListener("click", ()=>{
    vaciarCarrito();
 });