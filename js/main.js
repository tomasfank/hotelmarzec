/* MENU HAMBURGESA */
function cambiarClase(){
    let siteNav = document.getElementById('site-nav');
        siteNav.classList.toggle('site-nav-open');
    let menuOpen = document.getElementById('menu-toggle');
        menuOpen.classList.toggle('menu-open');           
}


/* CARROUSEL */
const grande = document.querySelector('.grande')
const punto = document.querySelectorAll('.punto')

punto.forEach( ( cadaPunto , i )=> {
    // Asignamos un click a cadaPunto
    punto[i].addEventListener('click',()=>{

        // Guardar la posición de ese PUNTO
        let posicion  = i
        
        // Calculando el espacio que debe DESPLAZARSE el contenedor GRANDE
        let operacion = posicion * -33.33

        // MOVEMOS el grande
        grande.style.transform = `translateX(${ operacion }%)`

        // Recorremos TODOS los punto
        punto.forEach( ( cadaPunto , i )=>{
            // Quitamos la clase ACTIVO a TODOS los punto
            punto[i].classList.remove('activo')
        })
        // Añadir la clase activo en el punto que hemos hecho CLICK
        punto[i].classList.add('activo')
    })
})

/* CARRITO */
/* variables*/
const reservas = document.getElementById("rooms");
const contenedorCarrito = document.querySelector(".carrito-lista");
document.addEventListener('DOMContentLoaded')


/* array */
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const fetchData = async() => {
    try {
        const res = await fetch('./habitaciones.json')
        const data = await res.json()
    }   catch (error) {
        console.log(error)
    }
}

function crearCards(){
    fetch('./habitaciones.json')
        .then(res => res.json())
        .then((habitaciones) => {
    
            habitaciones.forEach((el) => {
                reservas.innerHTML += 
                `<div class="room">
                    <h2>${el.nombre}</h2>
                    <img src="${el.img}" alt="">
                    <p>Por noche: $${el.precio}</p>
                    <button id="btn${el.id}">Reservar</button>
                </div>`;
        });
        habitaciones.forEach((hab) => {
            document.querySelector(`#btn${hab.id}`).addEventListener("click", () => {
                enviarCarrito(hab);
            });
        });
        });
};

function enviarCarrito(hab) {
    let existe = carrito.some((el) => el.id === hab.id);
    if (!existe) {
        carrito.push(hab);
        hab.cantidad = 1;
        Toastify({
            text: "Agregado al carrito",  
            duration: 3000  
        }).showToast();
    } 
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Ya tienes la habitación en el carrito!',
        });
    }
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
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "¡Esto eliminará la reserva del carrito!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '¡Si, borrar!'
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            '¡Eliminado!',
                            'Tu reserva ha sido cancelada.',
                            'success'
                        )
                    carrito = carrito.filter((el) => el.id !== hab.id);
                    pintarCarrito();
                    }
                })
            });
    });
};


/* iniciamos programas */ 
crearCards();
pintarCarrito();