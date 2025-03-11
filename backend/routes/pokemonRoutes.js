const express = require("express");
const { check, validationResult } = require("express-validator");
const pokemonController = require("../controllers/pokemonController");

const router = express.Router();

// Validaciones antes de crear un Pokémon
router.post(
    "/pokemons",
    [
        check("nombre").isString().trim().escape().matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,-]+$/),
        check("tipo").isString().trim().escape(),
        check("nivel").isInt({ min: 1 }),
        check("habilidades").isString().trim().escape(),
        check("peso").isFloat({ min: 0.1 }),
        check("altura").isFloat({ min: 0.1 }),
        check("genero").isIn(["Masculino", "Femenino", "Desconocido"]),
        check("region").isIn(["Kanto", "Johto", "Hoenn", "Sinnoh", "Teselia", "Kalos", "Alola", "Galar", "Paldea"])
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "Datos inválidos", detalles: errors.array() });
        }
        pokemonController.createPokemon(req, res);
    }
);

module.exports = router;



