// src/functions/certificatesFunctions.js
const Person = require("../../models/Person.js");

const generatedCertificates = new Set();
const cursos = [
  { titulo: "METROLOGÍA BÁSICA", duracion: 8 },
  { titulo: "VERIFICACIÓN DE MÉTODOS", duracion: 12 },
  { titulo: "REGLAS DE DECISIÓN", duracion: 6 },
  { titulo: "ISO/IEC 10012:2003 SISTEMAS DE GESTIÓN DE LA MEDICIÓN", duracion: 8 },
  { titulo: "VOCABULARIO INTERNACIONAL DE MERTOLOGÍA", duracion: 8 },
  { titulo: "ESTIMACIÓN DE LA INCERTIDUMBRE", duracion: 8 }
];

// Función para generar ID único
function generateId() {
  return Math.floor(1000000000 + Math.random() * 9000000000);
}

// Generar número de certificado único
function generateCertificate() {
  const prefix = "ME";
  let letters = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 4; i++) {
    letters += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  const number = Math.floor(1000 + Math.random() * 9000);
  const certificateNumber = `${prefix}-${letters}-${number}`;

  if (generatedCertificates.has(certificateNumber)) {
    return generateCertificate();
  } else {
    generatedCertificates.add(certificateNumber);
    return certificateNumber;
  }
}

// Crear el certificado para una persona y devolver los datos actualizados
async function addPersonCertificate(name, courseTitle) {
  const certificateNumber = generateCertificate();
  const course = cursos.find(c => c.titulo === courseTitle);

  if (!course) {
    return null; // No se encontró el curso
  }

  // Busca a la persona por nombre
  let person = await Person.findOne({ name });

  // Si no existe, crea una nueva persona
  if (!person) {
    person = new Person({
      name,
      id: generateId(), // Genera un ID único
      certificates: []
    });
  }

  // Crea el nuevo certificado
  const personCertificate = {
    course: courseTitle,
    duration: course.duracion,
    certificate: certificateNumber,
    date: new Date() // Usa el objeto Date directamente
  };

  // Agrega el certificado al array de certificados
  person.certificates.push(personCertificate);

  // Guarda los cambios en la base de datos
  await person.save();

  return person; // Devuelve la persona actualizada
}

module.exports = { addPersonCertificate };
