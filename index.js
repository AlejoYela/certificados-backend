// index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("./src/config/db.js"); // Importa el archivo de conexión a la base de datos

const certificatesRouter = require("./src/routes/certificatesRoutes.js");
const authRouter = require("./src/routes/authRoutes.js"); // Importa las rutas de autenticación
const usersRouter = require("./src/routes/usersRoutes.js");
const coursesRouter = require("./src/routes/coursesRoutes.js")

dotenv.config();

const app = express();

app.use(express.json());
const allowedOrigins = [
  "https://metropedia.vercel.app",
  "https://metropedia.net",
  "https://localhost:4321",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Si el origen está en la lista de permitidos o no hay origen (para solicitudes como Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

// Rutas
app.use("/api/certificates", certificatesRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/courses", coursesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
