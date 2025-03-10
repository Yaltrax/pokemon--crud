require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database"); // Importamos Sequelize

const app = express();
app.use(cors());
app.use(express.json());

console.log("🔄 Iniciando servidor...");

// Conectar a MySQL con Sequelize
sequelize.authenticate()
    .then(() => {
        console.log("✅ Conectado a MySQL con Sequelize");
        return sequelize.sync();
    })
    .then(() => console.log("📦 Base de datos sincronizada con Sequelize"))
    .catch(err => console.error("❌ Error en la conexión a MySQL:", err));

// Importar rutas después de definir app
const pokemonRoutes = require("./routes/pokemonRoutes");
app.use("/api", pokemonRoutes); // Asegurar que esta línea esté presente

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
