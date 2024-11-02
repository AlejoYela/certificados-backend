// index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
require("./src/config/db.js"); // Importa el archivo de conexión a la base de datos
const certificatesRouter = require("./src/routes/certificatesRoutes.js");

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'https://metropedia.vercel.app', // Cambia esto por tu dominio
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Permite enviar cookies
};

app.use(cors(corsOptions));

app.use(express.json());



// Rutas
app.use("/api/certificates", certificatesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
