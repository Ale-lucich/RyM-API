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


        if (type === "character") {
            carta.classList.add('carta-personaje');
            carta.innerHTML = `<article>
                    <img src="${item.image}" alt="Personaje">
                <h2>${item.name}</h2>
                <p>Gender: ${item.gender}</p>
                <span>${item.status} - ${item.species}</span>
            </article>`;
        } else if (type === "location") {
            carta.classList.add('carta-lugar');
            carta.innerHTML = `<article>
                <h2>${item.name}</h2>
                <p>Tipo: ${item.type}</p>
                <p>Dimensión: ${item.dimension}</p>
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