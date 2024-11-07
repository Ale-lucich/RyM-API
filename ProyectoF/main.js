const personajesEl = document.getElementById('results')
const nombreEl = document.getElementById('searchInput')
const estadoEl = document.getElementById('charStatus')
const cardsPerPage = 15;
let currentPage = 1;
let allDatos = [];

async function buscarDatos(name, status, type) {
    let url = `https://rickandmortyapi.com/api/${type}/?${name ? `name=${name}&` : ''}${type === "character" && status ? `status=${status}` : ''}`;
    let datos = [];
    let page = 1;
    while (true) {
        const response = await fetch(`${url}&page=${page}`);
        const data = await response.json();
        if (!data.results) break;
        datos.push(...data.results);
        if (!data.info?.next) break;
        page++;
    }
    return datos;
}

async function mostrarDatos(name, status, type) {
    allDatos = await buscarDatos(name, status, type);
    currentPage = 1;
    actualizarVista();
}

function actualizarVista() {
    personajesEl.innerHTML = '';
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    
    for (let i = start; i < end && i < allDatos.length; i++) {
        const item = allDatos[i];
        const carta = document.createElement("div");
        carta.classList.add(item.image ? 'carta-personaje' : 'carta-lugar');
        
        let contenido = '<article>';
        if (item.image) {
            contenido += `
                <img src="${item.image}" alt="Personaje">
                <h2>${item.name}</h2>
                <p>Gender: ${item.gender}</p>
                <span>${item.status} - ${item.species}</span>
            `;
        } else {
            contenido += `
                <h2>${item.name}</h2>
                <p>Tipo: ${item.type}</p>
                <p>Dimensión: ${item.dimension}</p>
            `;
        }
        contenido += '</article>';
        carta.innerHTML = contenido;
        personajesEl.appendChild(carta);
    }

    document.getElementById('pagination').innerHTML = `
        <button ${currentPage === 1 ? 'disabled' : ''} onclick="cambiarPagina(-1)">Anterior</button>
        <span>Página ${currentPage} de ${Math.ceil(allDatos.length / cardsPerPage)}</span>
        <button ${currentPage === Math.ceil(allDatos.length / cardsPerPage) ? 'disabled' : ''} onclick="cambiarPagina(1)">Siguiente</button>
    `;
}

function cambiarPagina(direccion) {
    currentPage += direccion;
    actualizarVista();
}

function buscar() {
    const tipoBusqueda = document.querySelector('input[name="searchType"]:checked').value;
    mostrarDatos(nombreEl.value, estadoEl.value, tipoBusqueda);
    nombreEl.value = '';
}

estadoEl.addEventListener('change', buscar);
document.querySelectorAll('input[name="searchType"]').forEach(radio => radio.addEventListener('change', buscar));