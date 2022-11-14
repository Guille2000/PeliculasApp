const formulario = document.querySelector('#formulario')
const result = document.querySelector('#result')
document.addEventListener("DOMContentLoaded", () => {
    formulario.addEventListener('submit', buscarPelicula)
});


function buscarPelicula(e){
    e.preventDefault()
    const pelicula = document.querySelector('#pelicula').value 
    consultarApi(pelicula)
}

async function consultarApi(pelicula){
    const url = `https://api.themoviedb.org/3/search/movie?api_key=79f0e639de5e3a1e7b6bb5f9122307c0&language=es-ES&query=${pelicula}&page=1&include_adult=false`
    try {
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        pintarPelicula(resultado.results[0])
  } catch (error) {
        console.log(error)
    }
}

const pintarPelicula = pelicula => {
    console.log(pelicula)
    const {backdrop_path, overview, title, popularity, vote_count, release_date} = pelicula 
    const urlImagen = `https://image.tmdb.org/t/p/w500/${backdrop_path}`
    result.innerHTML = `
    <div class="contenedor mt-2 text-white">
    <div class="movie-poster">
    <img src = "${urlImagen}" class="img-fluid mx-5" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title text-center mt-2">${title}</h3>
        <ul class = "movie-misc-info">
            <li class = "argumento">Argumento: ${overview}</li>
            <li class = "popularidad mt-2">Popularidad: ${popularity}</li>
            <li class = "votos">Votos: ${vote_count}</li>
            <li class = "released">Fecha de lanzamiento: ${release_date}</li>

    </div>
    </div>
    `
}