const Pokemon = require("../models/Pokemon");

// Crear un nuevo Pokémon
exports.createPokemon = async (req, res) => {
    try {
        const { nombre, tipo, nivel, habilidades, peso, altura, genero, region } = req.body;

        // Validaciones básicas
        if (!nombre || !tipo || !habilidades || !genero || !region) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }
        if (isNaN(nivel) || nivel <= 0) {
            return res.status(400).json({ error: "El nivel debe ser un número positivo." });
        }
        if (isNaN(peso) || peso <= 0) {
            return res.status(400).json({ error: "El peso debe ser un número positivo." });
        }
        if (isNaN(altura) || altura <= 0) {
            return res.status(400).json({ error: "La altura debe ser un número positivo." });
        }

        const pokemon = await Pokemon.create({
            nombre,
            tipo,
            nivel: parseInt(nivel),  // Asegurar que sea un número entero
            habilidades,
            peso: parseFloat(peso),  // Asegurar que sea un número decimal
            altura: parseFloat(altura),  // Asegurar que sea un número decimal
            genero,
            region
        });

        res.status(201).json({ message: "Pokémon creado exitosamente", pokemon });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el Pokémon", detalle: error.message });
    }
};

// Obtener todos los Pokémon
exports.getPokemons = async (req, res) => {
    try {
        const pokemons = await Pokemon.findAll();
        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la lista de Pokémon", detalle: error.message });
    }
};

// Obtener un Pokémon por ID
exports.getPokemonById = async (req, res) => {
    try {
        const pokemon = await Pokemon.findByPk(req.params.id);
        if (!pokemon) return res.status(404).json({ error: "Pokémon no encontrado" });

        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el Pokémon", detalle: error.message });
    }
};

// Actualizar un Pokémon
exports.updatePokemon = async (req, res) => {
    try {
        const { nombre, tipo, nivel, habilidades, peso, altura, genero, region } = req.body;
        const pokemon = await Pokemon.findByPk(req.params.id);

        if (!pokemon) return res.status(404).json({ error: "Pokémon no encontrado" });

        await pokemon.update({
            nombre,
            tipo,
            nivel: parseInt(nivel),
            habilidades,
            peso: parseFloat(peso),
            altura: parseFloat(altura),
            genero,
            region
        });

        res.json({ message: "Pokémon actualizado correctamente", pokemon });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el Pokémon", detalle: error.message });
    }
};

// Eliminar un Pokémon
exports.deletePokemon = async (req, res) => {
    try {
        const pokemon = await Pokemon.findByPk(req.params.id);
        if (!pokemon) return res.status(404).json({ error: "Pokémon no encontrado" });

        await pokemon.destroy();
        res.json({ message: "Pokémon eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el Pokémon", detalle: error.message });
    }
};



