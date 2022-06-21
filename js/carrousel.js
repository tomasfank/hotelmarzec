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