document.getElementById("pokemonForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const tipo = document.getElementById("tipo").value;
    const nivel = parseInt(document.getElementById("nivel").value);
    const habilidades = document.getElementById("habilidades").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const genero = document.getElementById("genero").value;
    const region = document.getElementById("region").value;

    const nuevoPokemon = {
        nombre,
        tipo,
        nivel,
        habilidades,
        peso,
        altura,
        genero,
        region
    };

    try {
        const response = await fetch("http://localhost:5000/api/pokemons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoPokemon)
        });

        if (response.ok) {
            alert("Pokémon agregado exitosamente!");
            document.getElementById("pokemonForm").reset();
        } else {
            const errorData = await response.json();
            alert("Error al agregar el Pokémon: " + errorData.error);
        }
    } catch (error) {
        alert("Error de conexión con el servidor: " + error.message);
    }
});
