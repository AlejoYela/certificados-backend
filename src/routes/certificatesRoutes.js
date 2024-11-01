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

router.get("/validate/:certificateId", async (req, res) => {
  try {
    // Busca en todos los usuarios un certificado específico en su array de `certificates`
    const user = await Person.findOne({
      "certificates.certificate": req.params.certificateId,
    });

    // Si no se encuentra el usuario o el certificado, envía un error 404
    if (!user) {
      return res.status(404).json({ message: "Certificado no encontrado" });
    }

    // Encuentra el certificado específico dentro del array de certificados del usuario
    const certificate = user.certificates.find(
      (cert) => cert.certificate === req.params.certificateId
    );

    // Devuelve la información del usuario y solo el certificado que coincide
    res.json({
      name: user.name,
      id: user.id,
      certificate, // solo el certificado específico
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el certificado", error });
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
