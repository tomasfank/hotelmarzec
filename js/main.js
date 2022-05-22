/* variables*/
let totalSuma = 0;
let item;
let habitacionID;
let carrito = [];
const addButton = document.getElementById("reservar");
const deleteButton = document.getElementById("borrar");
const ulist = document.getElementsByClassName("ulist")[0];
const total = document.getElementsByClassName("total")[0];


/* clase constructora */ 
class Habitacion{
    constructor(nombre, precio, id){
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
    }
};

/* tipos de habitaciones */ 
const individual = new Habitacion("Habitación individual", 800, 1);
const matrimonial = new Habitacion("Habitación matrimonial", 2000, 2);
const presidencial = new Habitacion("Suite presidencial", 5000, 3);

/* guardamos arreglo */ 
const habitaciones = [individual, matrimonial, presidencial];


/* ----- FUNCTION ADD ----- */

