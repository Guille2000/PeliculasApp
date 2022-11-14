document.addEventListener("DOMContentLoaded", cargarPeliculas);

const contenedor = document.querySelector("#contenedor");
const modal = new bootstrap.Modal('#modal', {})


async function cargarPeliculas() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=79f0e639de5e3a1e7b6bb5f9122307c0&language=es-ES`;
  try {
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    pintarPeliculas(resultado.results);
  } catch (error) {
    console.log(error);
  }
}

const pintarPeliculas = pelicula => {
  pelicula.forEach((pel) => {
    const { id, title, backdrop_path, overview } = pel;
    const urlImagen = `https://image.tmdb.org/t/p/w500/${backdrop_path}`
    console.log(id)

    const peliculaContenedor = document.createElement('div')
    peliculaContenedor.classList.add('col-md-4')

    const peliculaCard = document.createElement('div')
    peliculaCard.classList.add('card', 'mb-4', 'card-bg')

    const personajeImagen = document.createElement('img')
    personajeImagen.classList.add('card-img-top')
    personajeImagen.src = urlImagen

    const peliculaCardBody = document.createElement('div')
    peliculaCardBody.classList.add('card-body', 'text-white')

    const peliculaTitulo = document.createElement('h3')
    peliculaTitulo.classList.add('card-title', 'mb-3', 'text-center', 'color')
    peliculaTitulo.textContent = title

    const peliculaButton = document.createElement('button')
    peliculaButton.classList.add('btn', 'btn-danger', 'w-100')
    peliculaButton.textContent = 'Ver personaje'
    peliculaButton.onclick = function() {
        verPelicula(id)
    }

    const peliculaDescripcion = document.createElement('p')
    peliculaDescripcion.classList.add('card-text', 'text-center', 'font-italic')
    peliculaDescripcion.textContent = overview


    peliculaCardBody.appendChild(peliculaTitulo)
    peliculaCardBody.appendChild(peliculaDescripcion)
    peliculaCardBody.appendChild(peliculaButton)


    peliculaCard.appendChild(personajeImagen)
    peliculaCard.appendChild(peliculaCardBody)

    peliculaContenedor.appendChild(peliculaCard)

    contenedor.appendChild(peliculaContenedor)
     
  });
};

async function verPelicula(id){
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=79f0e639de5e3a1e7b6bb5f9122307c0&language=es-ES`
    try {
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
       mostrarPelicula(resultado)
    } catch (error) {
        console.log(error)
    }
}

const mostrarPelicula = pelicula => {
    const {backdrop_path, title, tagline} = pelicula
    const urlImagen = `https://image.tmdb.org/t/p/w500/${backdrop_path}`

    const modalTitle = document.querySelector('.modal .modal-title')
    const modalBody = document.querySelector('.modal .modal-body')
    modalTitle.textContent = title

    modalBody.innerHTML = `
    <img class="img-fluid" src="${urlImagen}"/>
    <p>${tagline}</p>

    `



    modal.show()
}