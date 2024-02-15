const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151;
const limit = 6
let offset = 0;

/* Podemos limitar a quantidades de registros por página
1, 2, 3, 4, 5, 6        0 - 6
7, 8, 9, 10, 11, 12     6 - 6
13         ,            13 - 1 (remove o botao)
*/

// O fetch vai recebe uma url ou requisição e nos retorna uma promise.
// A função da promise é realizar um processamento assincrono, que é um processamento do qual não temos a resposta imediata.
// A promise é a promessa de um resultado de uma dada requisição. É a promessa de um response.

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `      
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>
            </li>   
        `).join('');
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItens(offset, limit) 

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordMaxPage = offset + limit

    if (qtdRecordMaxPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
         
    } else {
        loadPokemonItens(offset, limit)
    }
})