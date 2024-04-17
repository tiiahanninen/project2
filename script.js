
const pokedex = document.getElementById('pokedex');
const form = document.getElementById("form");
const search = document.getElementById("search");

let allPokemonData = [];

//brings data - pokemons - from api/database.
//for - saves us from making all those fetched information (name, image, etc.) seperately one by one, we can lump everything this way
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    
//Promise, if not used with for-loop, for-loop would be waiting forever to catch another loop, so to make this work we used promise;
//it loads files and that is the end - no need for looping.
Promise.all(promises).then((results) => {
    allPokemonData = results.map((result) => ({
        name: result.name,
        image: result.sprites['front_default'],
        type: result.types.map((type) => type.type.name).join(', '),
        id: result.id
    }));
        console.log("All Pokemon Data:", allPokemonData);
        displayPokemon(allPokemonData);
    });
};

//const displayPokemon = shows the "end result" on the index-page. To make it more "popping" we used card-like appearance.
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (poke) => `
        <li class="card">
            <img class="card-image" src="${poke.image}"/>
            <h2 class="card-title">${poke.id}. ${poke.name}</h2>
            <p class="card-subtitle">Type: ${poke.type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

//setting the terms for filtering the search results
const searchPokemon = (event) => {
    event.preventDefault();
    const searchTerm = search.value.toLowerCase();
    console.log("Search Term:", searchTerm);
    if (searchTerm.trim() === "") {
        displayPokemon(allPokemonData);
        return;
    }
    const filteredPokemon = allPokemonData.filter(poke => poke.name.toLowerCase().includes(searchTerm));
    console.log("Filtered Pokemon:", filteredPokemon);
    displayPokemon(filteredPokemon);
};

form.addEventListener('submit', searchPokemon);

// Event listener for the search
search.addEventListener('input', () => {
    const searchTerm = search.value.trim().toLowerCase();
    console.log("Search Term:", searchTerm);
    if (searchTerm === "") {
        displayPokemon(allPokemonData);
    }
});

fetchPokemon();
