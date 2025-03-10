const Pokemon = require("../models/Pokemon");

// Crear un nuevo Pokémon
exports.createPokemon = async (req, res) => {
    try {
        const pokemon = await Pokemon.create(req.body);
        res.status(201).json(pokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los Pokémon
exports.getPokemons = async (req, res) => {
    try {
        const pokemons = await Pokemon.findAll();
        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un Pokémon por ID
exports.getPokemonById = async (req, res) => {
    try {
        const pokemon = await Pokemon.findByPk(req.params.id);
        if (!pokemon) return res.status(404).json({ error: "Pokémon no encontrado" });
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un Pokémon
exports.updatePokemon = async (req, res) => {
    try {
        const pokemon = await Pokemon.findByPk(req.params.id);
        if (!pokemon) return res.status(404).json({ error: "Pokémon no encontrado" });

        await pokemon.update(req.body);
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
    }
};


