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
/* variables principales*/
const rooms = document.getElementById("rooms");
const footer = document.getElementById('footer');
const reservar = document.querySelector('.btn-success');
const templateCard = document.getElementById('template-cards').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();
let carrito = {}


/* funcion que va a cargar el contenido en el DOM */
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    };
}); 
/* evento btn reservar */ 
rooms.addEventListener('click', e => { addCarrito(e) });
/* evento para btn de incrementar y diminuir */ 
items.addEventListener('click', e => { btnAumentarDisminuir(e) })
/* Utilizo async/await para cumplir la promesa. */
const fetchData = async () => {
    try {
        const res = await fetch('./habitaciones.json')
        const data = await res.json() 
        
        pintarCards(data)
    }   catch (error) {
        console.log(error)
    }
}
/* pintamos el carrito utilizando fragment */
const pintarCards = data => {
    data.forEach(producto =>{
        
        templateCard.querySelector('h2').textContent = producto.nombre
        templateCard.querySelector('span').textContent = producto.precio
        templateCard.querySelector('.button').dataset.id = producto.id
        templateCard.querySelector('img').setAttribute("src", producto.img)
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    rooms.appendChild(fragment)
};

const addCarrito = e => {
    if (e.target.classList.contains('button')) {
        setCarrito(e.target.parentElement);
        Toastify({
            text: "Agregado al carrito",  
            duration: 3000  
        }).showToast();
    }
    e.stopPropagation()
};

const setCarrito = objeto => {
    const producto = {
        title: objeto.querySelector('h2').textContent,
        precio: objeto.querySelector('span').textContent,
        id: objeto.querySelector('.button').dataset.id,
        cantidad: 1
    }
    console.log(producto)
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = { ...producto }
    
    pintarCarrito()
}

/* pintamos el carrito con la habitacion seleccionada */
const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()
    /* guardamos la infomración del carrito en el localstorage */ 
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>
        `
        return
    }
    
    /* sumar cantidad y sumar totales */
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
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
                carrito = {}
                pintarCarrito()
            };
        });
    });
};

/* boton para incrementar y disminuir la cantidad de noches reservadas */ 
const btnAumentarDisminuir = e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}


