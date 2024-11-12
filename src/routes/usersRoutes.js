const express = require("express");
const Person = require("../../models/Person.js"); 

const router = express.Router();

router.get("/:email", async (req, res) => {
    try {
        const user = await Person.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error al obtener el usuario:", error); // Agrega un log para obtener más detalles
        res.status(500).json({ message: "Error al obtener el usuario", error: error.message }); // Muestra el mensaje de error
    }
});


module.exports = router;