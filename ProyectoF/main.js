const personajesEl = document.getElementById('results')
const nombreEl = document.getElementById('searchInput')
const estadoEl = document.getElementById('charStatus')

async function buscarPersonajes(name, status){
    
    let url = 'https://rickandmortyapi.com/api/character/'

    if(name || status){
        url += '?'
        if(name){
            url += `name=${name}&`
        }

        if(status){
            url+= `status=${status}`
        }
    }

    const response = await fetch(url)
    const data = await response.json()


    return data.results

}

async function mostrarPersonajes(name, status) {

    const personajes = await buscarPersonajes(name, status)

    personajesEl.innerHTML = ''

    for(let personaje of personajes){
        const carta = document.createElement("div")
        carta.classList.add('carta-personaje')

        carta.innerHTML = `<article>
        <div class="image-container">
        <img src="${personaje.image}" alt="Personaje">
        </div>
        <h2>${personaje.name}</h2>
        <p>${personaje.gender}</p>
        <span>${personaje.status} - ${personaje.species}</span>
        </article>`

        personajesEl.appendChild(carta)
    }
}

mostrarPersonajes()


nombreEl.addEventListener('input', () => {
    mostrarPersonajes(nombreEl.value, estadoEl.value)
})

estadoEl.addEventListener('change', () => {
    mostrarPersonajes(nombreEl.value, estadoEl.value)
})