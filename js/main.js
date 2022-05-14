/* clase constructora */ 
class Habitacion{
    constructor(tipo, precio, id){
        this.nombre = tipo;
        this.precio = precio;
        this.id = id;
    }
};

/* variables globales */
let habitacionID;
let carrito = [];

/* tipos de habitaciones */ 
const individual = new Habitacion("Habitación individual", 1000, 1);
const matrimonial = new Habitacion("Habitación matrimonial", 2000, 2);
const presidencial = new Habitacion("Suite presidencial", 5000, 3);

/* guardamos arreglo */ 
const habitaciones = [individual, matrimonial, presidencial];

/* funcion de bienvenida */ 
const bienvenida = ()=>{
    alert("Bienvenido a Hotel Marzec");
    let usuario = prompt("Ingrese su nombre:  ")
    while(usuario === ""){
        usuario = prompt("Ingrese su nombre:  ")
    }
    return usuario;
};

/* Función de visualización y elección de habitación */ 
const mostrarHabitaciones = ()=>{
    let texto = "";
    habitaciones.forEach(hab=>{
        texto +=`${hab.id}) ${hab.nombre} $${hab.precio}\n`;
    })
    let seleccionHabitacion = parseInt(prompt(`¿Qué habitación desea reservar?:\n${texto}\n`));
    while(seleccionHabitacion < 1 || seleccionHabitacion > 3){
        seleccionHabitacion =  parseInt(prompt(`Por favor seleccione una opción posible.\n¿Qué habitación desea reservar?:\n${texto}\n`));
    };
    return seleccionHabitacion;
};

/* recopilamos la información para meterla en la funcion carrito */ 
const habitacionSeleccionada = (id)=>{
    console.log(id)
    let habFind = habitaciones.find((hab)=> 
        hab.id === id
    );
};



/* iniciamos el programa */ 
let nombreUsuario = bienvenida();

/* alert de bienvenida al usuario */ 
alert(`Bienvenido ${nombreUsuario}`);

/* Mostramos las habitaciones disponibles */ 
habitacionID = mostrarHabitaciones();

habitacionSeleccionada(habitacionID);


