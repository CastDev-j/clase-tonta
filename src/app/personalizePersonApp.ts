class Persona {
  public nombre: string;
  public apellido: string;
  public edad: number;

  constructor(nombre: string, apellido: string, edad: number) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
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
  constructor() {}

  public static printList(personas: Persona[], $element: HTMLDivElement) {
    $element.innerHTML = "";
    personas.forEach((persona, index) => {
      const $personaDiv = document.createElement("div");
      $personaDiv.innerHTML = `
          ${persona.toString()}
          <button class="edit" data-index="${index}">Editar</button>
          <button class="delete" data-index="${index}">Eliminar</button>
        `;
      $element.appendChild($personaDiv);
    });
  }

  public static printStaticList(personas: Persona[], $element: HTMLDivElement) {
    $element.innerHTML = ""; // Limpiar contenido previo
    personas.forEach((persona) => {
      const $personaDiv = document.createElement("div");
      $personaDiv.innerHTML = persona.toString();
      $element.appendChild($personaDiv);
    });
  }


}

class Sorter {
  constructor() {}

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

const listaPersonas: Persona[] = [];
export const Main = ($element: HTMLDivElement) => {
    $element.innerHTML = `
        <div class="header bg-gray-900 text-white p-4 dark:bg-gray-800">
            <h2 class="text-2xl font-bold">Practica Búsqueda Objetos</h2>
        </div>
  
      <form class="max-w-sm mx-auto" id="personaForm">
        <div class="mb-5">
          <label for="Nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
          <input type="text" id="nombre" placeholder="Nombre" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
        </div>
        <div class="mb-5">
          <label for="Apellido" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
          <input type="text" id="apellido" placeholder="Apellido" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
        </div>
        <div class="mb-5">
          <label for="Edad" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Edad</label>
          <input type="number" id="edad" placeholder="Edad" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
        </div>
        <button type="submit" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Guardar / Editar</button>
      </form>
  
      <div class="section bg-gray-800 p-4" id="listaPersonasSection">
        <h2 class="text-xl font-semibold">Lista de personas</h2>
        <div id="listaPersonas"></div>
      </div>
  
      <div class="section bg-gray-800 p-4">
        <h2 class="text-xl font-semibold">Ordenado por edad descendente</h2>
        <div id="listaPersonasDesc"></div>
      </div>
  
      <div class="section bg-gray-800 p-4">
        <h2 class="text-xl font-semibold">Ordenado por nombre</h2>
        <div id="listaPersonasByName"></div>
      </div>
  
      <div class="section bg-gray-800 p-4">
        <h2 class="text-xl font-semibold">Ordenado por apellido</h2>
        <div id="listaPersonasByLastName"></div>
      </div>
    `;
  
    const $listaPersonas = document.getElementById("listaPersonas") as HTMLDivElement;
    const $listaPersonasDesc = document.getElementById("listaPersonasDesc") as HTMLDivElement;
    const $listaPersonasByName = document.getElementById("listaPersonasByName") as HTMLDivElement;
    const $listaPersonasByLastName = document.getElementById("listaPersonasByLastName") as HTMLDivElement;
    const $form = document.getElementById("personaForm") as HTMLFormElement;
  
    function updateAllLists() {
      Utilities.printList(listaPersonas, $listaPersonas);
      Utilities.printStaticList(Sorter.sortListDesc(listaPersonas), $listaPersonasDesc);
      Utilities.printStaticList(Sorter.sortListByName(listaPersonas), $listaPersonasByName);
      Utilities.printStaticList(Sorter.sortListByLastName(listaPersonas), $listaPersonasByLastName);
    }
  
    $form.addEventListener("submit", (event) => {
      event.preventDefault();
      const nombre = (document.getElementById("nombre") as HTMLInputElement).value;
      const apellido = (document.getElementById("apellido") as HTMLInputElement).value;
      const edad = parseInt((document.getElementById("edad") as HTMLInputElement).value);
  
      const persona = new Persona(nombre, apellido, edad);
      listaPersonas.push(persona);
  
      updateAllLists(); // Actualizar todas las listas
      deleteFormInfo();
    
    });

    const deleteFormInfo = () =>{

        (document.getElementById("nombre") as HTMLInputElement).value = "";
        (document.getElementById("apellido") as HTMLInputElement).value = "";
        (document.getElementById("edad") as HTMLInputElement).value = "";
        
    }
  
    $listaPersonas.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
  
      if (target.classList.contains("delete")) {
        const index = parseInt(target.getAttribute("data-index")!);
        listaPersonas.splice(index, 1);
        updateAllLists();
      } else if (target.classList.contains("edit")) {
        const index = parseInt(target.getAttribute("data-index")!);
        const persona = listaPersonas[index];
  
        (document.getElementById("nombre") as HTMLInputElement).value = persona.nombre;
        (document.getElementById("apellido") as HTMLInputElement).value = persona.apellido;
        (document.getElementById("edad") as HTMLInputElement).value = persona.edad.toString();
  
        listaPersonas.splice(index, 1); // Remover la persona actual mientras se edita
        updateAllLists();
      }
    });
  };