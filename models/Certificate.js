// models/Certificate.js
const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  course: { type: String, required: true },
  courseCode: { type: String, required: true },
  duration: { type: Number, required: true },
  certificate: { type: String, required: true },
  link: { type: String, required: false },
  date: { type: Date, default: Date.now },
});

// Exporta solo el esquema
module.exports = certificateSchema;
