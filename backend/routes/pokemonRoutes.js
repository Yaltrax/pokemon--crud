const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

// Rutas CRUD
router.post("/pokemons", pokemonController.createPokemon);
router.get("/pokemons", pokemonController.getPokemons);
router.get("/pokemons/:id", pokemonController.getPokemonById);
router.put("/pokemons/:id", pokemonController.updatePokemon);
router.delete("/pokemons/:id", pokemonController.deletePokemon);

module.exports = router;


