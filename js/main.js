/* variables*/
const reservas = document.getElementById("rooms");
const contenedorCarrito = document.querySelector(".carrito-lista");

/* clase constructora */ 
class Habitacion{
    constructor(nombre, precio, id, img){
        this.nombre = nombre;
        this.precio = precio;  
        this.id = id;
        this.img = img; 
    }
};

/* tipos de habitaciones */ 
const individual = new Habitacion("Habitación individual", 800, 1, "./img/individual.jpg");
const matrimonial = new Habitacion("Habitación matrimonial", 2000, 2, "./img/matrimonial.jpg");
const presidencial = new Habitacion("Suite presidencial", 5000, 3, "./img/presidencial.jpg" );

/* array */
const habitaciones = [individual, matrimonial, presidencial];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


/* crear habitaciones */ 
function crearCards() {
    habitaciones.forEach((el) => {
        reservas.innerHTML += 
            `<div class="room">
                <h2>${el.nombre}</h2>
                <img src="${el.img}" alt="">
                <p>$${el.precio}</p>
                <button id="btn${el.id}">Reservar</button>
            </div>`;
    });

    habitaciones.forEach((hab) => {
        document.querySelector(`#btn${hab.id}`).addEventListener("click", () => {
          enviarCarrito(hab);
        });
      });
}

function enviarCarrito(hab) {
    let existe = carrito.some((el) => el.id === hab.id);
    existe ? alert("Ya tienes reservada esta Habitación") : carrito.push(hab);  hab.cantidad = 1;
    pintarCarrito();
}
  
function pintarCarrito() {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((el) => {
      contenedorCarrito.innerHTML += 
        `<h2>${el.nombre}</h2>
        <p>$${el.precio}</p>
        <button id="borrar${el.id}">Borrar</button>  
        </div>`;
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    borrarProducto();
}
  
function borrarProducto() {
    carrito.forEach((hab) => {
      document
        .querySelector(`#borrar${hab.id}`)
        .addEventListener("click", () => {
          carrito = carrito.filter((el) => el.id !== hab.id);
          pintarCarrito();
        });
    });
  }


/* iniciamos programas */ 
crearCards();
pintarCarrito();