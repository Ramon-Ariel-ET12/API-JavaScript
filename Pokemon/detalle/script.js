const get = new URLSearchParams(window.location.search);
const titulo = document.getElementsByTagName('title')[0];

const founded = get.get('pokemon');
const box = document.getElementById('pokemon');


fetch('https://pokeapi.co/api/v2/pokemon/' + founded, { method: 'GET', headers: { Accept: 'application/json' } })
    .then(response => response.json())
    .then(pokemon => {
        titulo.innerText = pokemon.name;
        const pokemonHTML = document.createElement('div');
        const types = pokemon.types.map(x => x.type.name).join(' and ');
        pokemonHTML.innerHTML = `
        <h1>${pokemon.name}</h1>
        <img class="pokemon-img" src="${pokemon.sprites.front_default}" alt="${pokemon.name}"/>
        <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
        <p>Experience: ${pokemon.base_experience}</p>
        <p>Type: ${types}</p>
        <a onClick="window.history.back();" href="#">Back...</a>
    `;

        box.appendChild(pokemonHTML);

    }).catch(error => {
        console.error(error);
        titulo.innerText = 'not found 404';
        box.innerHTML = '<h1>404</h1><p>Not found</p>';
    });