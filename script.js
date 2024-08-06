// Función que busca un Pokémon y usa promesas
function buscarPokemon(nombrePokemon, callback) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;
    
    // Retorna una promesa para que pueda usarse con await
    return new Promise((resolve, reject) => {
        fetch(apiUrl)
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error('Pokémon no encontrado');
                }
                return respuesta.json();
            })
            .then(pokemon => {
                resolve(pokemon);
                if (callback) callback(null, pokemon); // Ejecuta el callback con los datos
            })
            .catch(error => {
                reject(error);
                if (callback) callback(error); // Ejecuta el callback con el error
            });
    });
}

// Función async que maneja la búsqueda del Pokémon
async function manejarBusquedaPokemon(nombrePokemon, callback) {
    try {
        const pokemon = await buscarPokemon(nombrePokemon, callback);
        mostrarInformacionPokemon(pokemon);
    } catch (error) {
        console.error(error);
        alert('Pokémon no encontrado. Por favor, prueba con otro nombre.');
        limpiarInformacionPokemon(); // Limpiar datos anteriores si hay un error
    }
}

// Evento de click del botón de búsqueda
document.getElementById('search-button').addEventListener('click', () => {
    const nombrePokemon = document.getElementById('pokemon-search').value.toLowerCase();
    
    // Llamada a la función async pasando un callback
    manejarBusquedaPokemon(nombrePokemon, (error, pokemon) => {
        if (error) {
            console.error('Error en la búsqueda:', error);
            alert('Pokémon no encontrado. Por favor, prueba con otro nombre.');
        } else {
            mostrarInformacionPokemon(pokemon);
        }
    });
});

function mostrarInformacionPokemon(pokemon) {
    const infoPokemon = document.getElementById('pokemon-info');
    const tipos = pokemon.types.map(tipoInfo => tipoInfo.type.name).join(', ');

    infoPokemon.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <p>ID: ${pokemon.id}</p>
        <p>Altura: ${pokemon.height / 10} m</p> <!-- Convertir altura de decímetros a metros -->
        <p>Peso: ${pokemon.weight / 10} kg</p> <!-- Convertir peso de hectogramos a kilogramos -->
        <p>Tipo(s): ${tipos}</p>
    `;
}

function limpiarInformacionPokemon() {
    const infoPokemon = document.getElementById('pokemon-info');
    infoPokemon.innerHTML = ''; // Limpiar la información del Pokémon mostrada
}
