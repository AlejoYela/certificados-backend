// models/Person.js
const mongoose = require("mongoose");
const certificateSchema = require("./Certificate"); // Asegúrate de que la ruta sea correcta

const ContentSchema = new mongoose.Schema({
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    desarrollo: { type: String }
});

const ModuleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: [ContentSchema]
});



const courseSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    course: { type: String, required: true },
    courseCode: { type: String, required: true, unique: true },
    image: { type: String },
    color: { type: String },
    description: { type: String, required: true },
    modules: [ModuleSchema],
    category: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    lastUpdated: { type: String },
    language: { type: String, default: "Español" },
    subtitles: { type: [String], default: [] },
    includes: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    completed: { type: Boolean, default: false },
    long_description: { type: String }
});

// Modelo que hace referencia a la colección "users"
const Course = mongoose.model("Course", courseSchema, "courses");

module.exports = Course;