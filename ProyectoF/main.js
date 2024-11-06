const personajesEl = document.getElementById('results')
const nombreEl = document.getElementById('searchInput')
const estadoEl = document.getElementById('charStatus')

async function buscarDatos(name, status, type){
    
    let url = `https://rickandmortyapi.com/api/${type}/`;

    if (name || (type === "character" && status)) {
        url += '?';
        if (name) {
            url += `name=${name}&`;
        }
        if (type === "character" && status) {
            url += `status=${status}`;
        }
    }

    const response = await fetch(url)
    const data = await response.json()


    return data.results

}

async function mostrarDatos(name, status, type) {
    const datos = await buscarDatos(name, status, type);

    personajesEl.innerHTML = ''

    for (let item of datos) {
        const carta = document.createElement("div");
        carta.classList.add('carta-personaje');

        if (type === "character") {
            carta.innerHTML = `<article>
                <div class="image-container">
                    <img src="${item.image}" alt="Personaje">
                </div>
                <h2>${item.name}</h2>
                <p>${item.gender}</p>
                <span>${item.status} - ${item.species}</span>
            </article>`;
        } else if (type === "location") {
            carta.innerHTML = `<article>
                <h2>${item.name}</h2>
                <p>Tipo: ${item.type}</p>
                <span>Dimensión: ${item.dimension}</span>
            </article>`;
        }

        personajesEl.appendChild(carta);
    }
}

nombreEl.value= '';

function buscar() {
    const tipoBusqueda = document.querySelector('input[name="searchType"]:checked').value;
    mostrarDatos(nombreEl.value, estadoEl.value, tipoBusqueda);
    nombreEl.value = '';
}

estadoEl.addEventListener('change', () => {
    const tipoBusqueda = document.querySelector('input[name="searchType"]:checked').value;
    mostrarDatos(nombreEl.value, estadoEl.value, tipoBusqueda);
});

document.querySelectorAll('input[name="searchType"]').forEach((radio) => {
    radio.addEventListener('change', () => {
        const tipoBusqueda = document.querySelector('input[name="searchType"]:checked').value;
        mostrarDatos(nombreEl.value, estadoEl.value, tipoBusqueda);
    });
});