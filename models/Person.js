// models/Person.js
const mongoose = require("mongoose");
const certificateSchema = require("./Certificate"); // Asegúrate de que la ruta sea correcta

const personSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  id: { type: Number, unique: true, required: true }, // La cédula debe ser única
  certificates: [certificateSchema] // Embebido dentro de la persona
});

// Modelo que hace referencia a la colección "users"
const Person = mongoose.model("Person", personSchema, "users");

module.exports = Person;
