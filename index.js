// index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
require("./src/config/db.js"); // Importa el archivo de conexión a la base de datos
const certificatesRouter = require("./src/routes/certificatesRoutes.js");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



// Rutas
app.use("/api/certificates", certificatesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
