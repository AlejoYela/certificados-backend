const express = require("express");
const bcrypt = require("bcryptjs");
const Auth = require("../../models/Auth");
const Person = require("../../models/Person");

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
    console.log(req.body)
    const { email, password, name, id } = req.body;

    // Validar los campos requeridos
    if (!email || !password || !name || !id) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    // Validar longitud de la contraseña
    if (password.length < 8) {
        return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres" });
    }

    try {
        // Verificar si el email ya está registrado
        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        // Verificar si la cédula ya está registrada
        const existingPerson = await Person.findOne({ id });
        if (existingPerson) {
            return res.status(400).json({ message: "La cédula ya está registrada" });
        }

        // Crear nuevo usuario en la colección `users` con un array vacío para `certificates`
        const newUser = await Person.create({ name, id, certificates: [] });

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar las credenciales en la colección `auth` con la referencia
        const authData = await Auth.create({
            email,
            password: hashedPassword,
            person: newUser._id,
        });

        // Enviar solo la información necesaria sin mensaje
        res.status(201).json({
            email: authData.email,
            userId: authData.person,
            name: newUser.name
        });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
    }
});


// Ruta para autenticar el usuario
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario en `auth` por el email
        const user = await Auth.findOne({ email }).populate("person");
        if (!user) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }

        // Autenticación exitosa
        res.json({
            message: "Inicio de sesión exitoso",
            user: {
                name: user.person.name,
                id: user.person.id,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
    }
});

module.exports = router;
