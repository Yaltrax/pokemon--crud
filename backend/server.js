const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const pokemonRoutes = require("./routes/pokemonRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/pokemons", pokemonRoutes);

sequelize.sync()
    .then(() => console.log("Base de datos conectada y sincronizada"))
    .catch(error => console.error("Error al conectar la base de datos:", error));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


