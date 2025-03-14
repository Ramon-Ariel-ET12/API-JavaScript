let pokemonLimit = 30;
let pokemonOffset = 0;

window.onload = () => {
  pokemonApi(pokemonLimit, pokemonOffset);
  window.addEventListener('scroll', checkScrollPosition);
};

const pokemonApi = (limit, offset) => {

  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, { method: 'GET', headers: { Accept: 'application/json' } })
    .then(response => response.json())
    .then(data => {

      const lista = document.getElementById('pokemon-list');

      data.results.forEach(pokemon => {


        const pokemonHTML = document.createElement('div');
        pokemonHTML.className = 'pokemon';

        fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.name, { method: 'GET', headers: { Accept: 'application/json' } })
          .then(response => response.json())
          .then(data => {

            const pokemonLinkHref = './detalle/index.html?pokemon=' + pokemon.name;
            pokemonHTML.innerHTML =
              ` 
              <p class="pokemon-id">${data.id}</p>
              <img class="pokemon-sprite" alt="${pokemon.name}" src="${data.sprites.front_default}" >
              <p id="${pokemon.name}" class="pokemon-name">${pokemon.name}</p>
              <a href="${pokemonLinkHref}" class="pokemon-button">Ver detalles</a>
              `;

          });

        lista.appendChild(pokemonHTML);

      });

    });
};

const search = () => {
  const pokemon = document.getElementById('search-input').value;
  const search = document.getElementById('search');
  
  if (pokemon != '') {
    document.location.href = `./detalle/index.html?pokemon=${pokemon}`;
  }
}

const checkScrollPosition = () => {
  const scrollPosition = window.innerHeight + window.scrollY;
  const bottomPosition = document.documentElement.scrollHeight;

  if (scrollPosition >= bottomPosition - 100 && pokemonOffset < 1000) {
    pokemonOffset += pokemonLimit;
    pokemonApi(pokemonLimit, pokemonOffset);

  }
};
