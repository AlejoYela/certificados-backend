// src/routes/certificatesRoutes.js
const express = require("express");
const { addPersonCertificate } = require("../functions/certificatesFunctions.js");
const Person = require("../../models/Person.js"); // Sigue usando 'Person'

const router = express.Router();

// Ruta para obtener todas las personas y sus certificados
router.get("/", async (req, res) => {
  try {
    const users = await Person.find(); // Esto ahora buscará en la colección 'users'
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los datos", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Person.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
});

// Ruta para agregar un certificado a una persona
router.post("/add", async (req, res) => {
  const { name, id, courseTitle } = req.body; // Incluye id aquí

  try {
    const personData = await addPersonCertificate(name, id, courseTitle); // Pasa id como argumento
    if (!personData) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    res.status(201).json(personData);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar el certificado", error });
  }
});



module.exports = router;
