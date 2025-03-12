document.addEventListener("DOMContentLoaded", function () {
    cargarPokemones();
});


function cargarPokemones() {
    fetch("http://localhost:5000/api/pokemons")
        .then(response => response.json())
        .then(pokemons => {
            const tableBody = document.getElementById("pokemonTableBody");
            tableBody.innerHTML = ""; 

            pokemons.forEach(pokemon => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${pokemon.id}</td>
                    <td>${pokemon.nombre}</td>
                    <td>${pokemon.tipo}</td>
                    <td>${pokemon.nivel}</td>
                    <td>${pokemon.habilidades}</td>
                    <td>${pokemon.peso}</td>
                    <td>${pokemon.altura}</td>
                    <td>${pokemon.genero}</td>
                    <td>${pokemon.region}</td>
                    <td>
                        <button class="edit-btn" onclick="editarPokemon(${pokemon.id})">Editar</button>
                        <button class="delete-btn" onclick="eliminarPokemon(${pokemon.id})">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error al cargar los pokémones:", error));
}


document.getElementById("pokemonForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const nuevoPokemon = {
        nombre: document.getElementById("nombre").value,
        tipo: document.getElementById("tipo").value,
        nivel: parseInt(document.getElementById("nivel").value),
        habilidades: document.getElementById("habilidades").value,
        peso: parseFloat(document.getElementById("peso").value),
        altura: parseFloat(document.getElementById("altura").value),
        genero: document.getElementById("genero").value,
        region: document.getElementById("region").value,
    };

    fetch("http://localhost:5000/api/pokemons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoPokemon)
    })
    .then(response => response.json())
    .then(() => {
        alert("Pokémon agregado exitosamente");
        cargarPokemones(); 
        document.getElementById("pokemonForm").reset();
    })
    .catch(error => console.error("Error al agregar Pokémon:", error));
});


function editarPokemon(id) {
    const nuevoNombre = prompt("Ingrese el nuevo nombre del Pokémon:");
    if (!nuevoNombre) return;

    fetch(`http://localhost:5000/api/pokemons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevoNombre })
    })
    .then(response => response.json())
    .then(() => {
        alert("Pokémon actualizado correctamente");
        cargarPokemones();
    })
    .catch(error => console.error("Error al actualizar Pokémon:", error));
}


function eliminarPokemon(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este Pokémon?")) return;

    fetch(`http://localhost:5000/api/pokemons/${id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(() => {
        alert("Pokémon eliminado correctamente");
        cargarPokemones();
    })
    .catch(error => console.error("Error al eliminar Pokémon:", error));
}

