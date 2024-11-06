const Person = require("../../models/Person.js");

// Conjunto para almacenar los números de certificado únicos generados
const generatedCertificates = new Set();

// Lista de cursos con título y duración
const cursos = [
  { titulo: "METROLOGÍA BÁSICA", duracion: 8 },
  { titulo: "VERIFICACIÓN DE MÉTODOS", duracion: 12 },
  { titulo: "REGLAS DE DECISIÓN", duracion: 6 },
  { titulo: "ISO/IEC 10012:2003 SISTEMAS DE GESTIÓN DE LA MEDICIÓN", duracion: 8 },
  { titulo: "VOCABULARIO INTERNACIONAL DE METROLOGÍA", duracion: 8 },
  { titulo: "ESTIMACIÓN DE LA INCERTIDUMBRE", duracion: 8 },
  { titulo: "ISO/IEC 19011:2018 AUDITORÍA DE SISTEMAS DE GESTIÓN", duracion: 8 },
  { titulo: "ISO/IEC 31000:2018 GESTIÓN DEL RIESGO", duracion: 8 },
  { titulo: "INDICADORES DE GESTIÓN", duracion: 8 },
];

// Función para generar un número de certificado único
function generateCertificate() {
  const prefix = "ME";
  let letters = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Genera 4 letras aleatorias
  for (let i = 0; i < 4; i++) {
    letters += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  // Genera un número de 4 dígitos
  const number = Math.floor(1000 + Math.random() * 9000);
  const certificateNumber = `${prefix}-${letters}-${number}`;

  // Verifica si el número de certificado ya existe para evitar duplicados
  if (generatedCertificates.has(certificateNumber)) {
    return generateCertificate();
  } else {
    generatedCertificates.add(certificateNumber);
    return certificateNumber;
  }
}

// Función para agregar un certificado a una persona y devolver los datos actualizados
async function addPersonCertificate(name, id, courseTitle) { // Incluye el id como parámetro
  const certificateNumber = generateCertificate();
  const course = cursos.find(c => c.titulo === courseTitle);

  // Si el curso no se encuentra, retorna null
  if (!course) {
    return null;
  }

  // Busca a la persona por nombre e id en la base de datos
  let person = await Person.findOne({ name, id });

  // Si no existe, crea una nueva persona con el id recibido
  if (!person) {
    person = new Person({
      name,
      id, // Usa el id recibido en la solicitud
      certificates: []
    });
  }

  // Crea el nuevo certificado
  const personCertificate = {
    course: courseTitle,
    duration: course.duracion,
    certificate: certificateNumber,
    date: new Date() // Fecha actual
  };

  // Agrega el certificado al array de certificados de la persona
  person.certificates.push(personCertificate);

  // Guarda los cambios en la base de datos
  await person.save();

  // Devuelve la persona actualizada con el nuevo certificado
  return person;
}

module.exports = { addPersonCertificate };
