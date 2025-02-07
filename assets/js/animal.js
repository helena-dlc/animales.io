//Exportamos la clase padre Animal, de la que luego heredaremos sus propiedades a sus  clases hijas (tipos)
export class Animal {
    // Constructor , usando this para recibir la edad, nombre, img  comentarios y sonidos
    constructor(nombre, edad, imagen, comentarios, sonido) {
        this.nombre = nombre;          
        this.edad = edad;              
        this.img = imagen;             
        this.comentarios = comentarios; 
        this.sonido = sonido;          
    }

    // Métodos GET  para obtener el nombre, edad , sonido , etc que capturamos anteriormente
    getNombre() {
        return this.nombre;
    }

    getEdad() {
        return this.edad;
    }

    getImg() {
        return this.img;
    }

    getComentarios() {
        return this.comentarios;
    }

    getSonido() {
        return this.sonido;
    }
}

// Usamos extends para heredar de la clase Padre Animal a Clases hija  de cada tipo de animal

export class Leon extends Animal {}
export class Lobo extends Animal {}
export class Oso extends Animal {}
export class Serpiente extends Animal {}
export class Aguila extends Animal {}
