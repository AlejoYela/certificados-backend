// index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("./src/config/db.js"); // Importa el archivo de conexión a la base de datos

const certificatesRouter = require("./src/routes/certificatesRoutes.js");
const authRouter = require("./src/routes/authRoutes.js"); // Importa las rutas de autenticación

dotenv.config();

const app = express();

app.use(express.json());
const corsOptions = {
  origin: "https://metropedia.vercel.app", // Cambia esto por tu dominio
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Permite enviar cookies
};

//app.use(cors(corsOptions));
app.use(cors(corsOptions));

// Rutas
app.use("/api/certificates", certificatesRouter);
app.use("/api/auth", authRouter); // Rutas de autenticación

app.post("/auth/token", async (req, res) => {
  const { code } = req.body;

  const clientId = process.env.AUTH0_CLIENT_ID;
  const clientSecret = process.env.AUTH0_CLIENT_SECRET;
  const redirectUri = "http://localhost:4321/login";

  try {
    const response = await fetch("https://dev-6tbiy7tc5eqhqb7k.us.auth0.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) throw new Error("Error al obtener el token");

    const data = await response.json();
    res.json(data); // Envía el token al frontend
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
