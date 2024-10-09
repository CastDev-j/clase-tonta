import {
  uniqueNamesGenerator,
  names,
  adjectives,
} from "unique-names-generator";

class RandomGenerator {
  constructor() {}

  public static get randomName() {
    return uniqueNamesGenerator({
      dictionaries: [names],
    });
  }

  public static get randomAdjective() {
    return uniqueNamesGenerator({
      dictionaries: [adjectives],
    });
  }

  public static get randomOld() {
    return Math.floor(Math.random() * 100);
  }
}

class Persona {
  public nombre: string;
  public apellido: string;
  public edad: number;

  constructor() {
    this.nombre = RandomGenerator.randomName;
    this.apellido = RandomGenerator.randomAdjective;
    this.edad = RandomGenerator.randomOld;
  }

  saludar() {
    console.log(
      `Hola soy ${this.nombre} ${this.apellido} y tengo ${this.edad} años`
    );
  }

  toString() {
    return `${this.nombre} ${this.apellido} (${this.edad})`;
  }
}

class Utilities {

    constructor(){};

    public static printList(personas: Persona[]): HTMLDivElement[] {        
       
        return personas.map((persona) => {
            const $element = document.createElement('div');
            $element.innerHTML = persona.toString();
            return $element;
        });

    }

}

class Sorter {

    constructor(){}

    public static sortList(personas: Persona[]): Persona[] {
        return personas.sort((a, b) => a.edad - b.edad);
    }

    public static sortListDesc(personas: Persona[]): Persona[] {
        return personas.sort((a, b) => b.edad - a.edad);
    }

    public static sortListByName(personas: Persona[]): Persona[] {
        return personas.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    public static sortListByLastName(personas: Persona[]): Persona[] {
        return personas.sort((a, b) => a.apellido.localeCompare(b.apellido));
    }

}


const listaPersonas: Persona[] = Array.from({ length: 10 }, () => new Persona());


export const Main = ($element: HTMLDivElement) => {

    $element.innerHTML = `
    <div class="header bg-gray-900 text-white p-4 dark:bg-gray-800">
        <h2 class="text-2xl font-bold">Practica Búsqueda Objetos Objetos Definidos</h2>
    </div>

    <div class="section bg-gray-100 text-gray-900 p-4 dark:bg-gray-700 dark:text-gray-200">
        <h2 class="text-xl font-semibold">Lista de personas</h2>
    </div>
    `;

    Utilities.printList(listaPersonas).forEach(div => {
        div.classList.add('persona');
        $element.appendChild(div);
    });

    $element.innerHTML += `
    
    <div class="section bg-gray-100 text-gray-900 p-4 dark:bg-gray-700 dark:text-gray-200">
        <h2 class="text-xl font-semibold">Ordenado por edad</h2>
    </div>
    `;
    
    Utilities.printList(Sorter.sortList(listaPersonas)).forEach(div => {
        div.classList.add('persona');
        $element.appendChild(div);
    });

    $element.innerHTML += `
    <div class="section bg-gray-100 text-gray-900 p-4 dark:bg-gray-700 dark:text-gray-200">
        <h2 class="text-xl font-semibold">Ordenado por edad descendente</h2>
    </div>
    `;
    
    Utilities.printList(Sorter.sortListDesc(listaPersonas)).forEach(div => {
        div.classList.add('persona');
        $element.appendChild(div);
    });

    $element.innerHTML += `
    <div class="section bg-gray-100 text-gray-900 p-4 dark:bg-gray-700 dark:text-gray-200">
        <h2 class="text-xl font-semibold">Ordenado por nombre</h2>
    </div>
    `;
    
    Utilities.printList(Sorter.sortListByName(listaPersonas)).forEach(div => {
        div.classList.add('persona');
        $element.appendChild(div);
    });

    $element.innerHTML += `
    <div class="section bg-gray-100 text-gray-900 p-4 dark:bg-gray-700 dark:text-gray-200">
        <h2 class="text-xl font-semibold">Ordenado por apellido</h2>
    </div>
    `;
    
    Utilities.printList(Sorter.sortListByLastName(listaPersonas)).forEach(div => {
        div.classList.add('persona');
        $element.appendChild(div);
    });

}


