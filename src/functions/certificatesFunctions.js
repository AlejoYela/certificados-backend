const Person = require("../../models/Person.js");

// Conjunto para almacenar los números de certificado únicos generados
const generatedCertificates = new Set();

// Lista de cursos con título, duración y código
const cursos = [
  { titulo: "METROLOGÍA BÁSICA", duracion: 8, code: "METROLOGIABASICA" },
  { titulo: "VERIFICACIÓN DE MÉTODOS", duracion: 12, code: "VERIFICACION" },
  { titulo: "REGLAS DE DECISIÓN", duracion: 6, code: "REGLASDECISION" },
  { titulo: "ISO/IEC 10012:2003 SISTEMAS DE GESTIÓN DE LA MEDICIÓN", duracion: 8, code: "ISO10012" },
  { titulo: "VOCABULARIO INTERNACIONAL DE METROLOGÍA", duracion: 8, code: "VIM" },
  { titulo: "ESTIMACIÓN DE LA INCERTIDUMBRE", duracion: 8, code: "INCERTIDUMBRE" },
  { titulo: "ISO/IEC 19011:2018 AUDITORÍA DE SISTEMAS DE GESTIÓN", duracion: 8, code: "ISO19011" },
  { titulo: "ISO/IEC 31000:2018 GESTIÓN DEL RIESGO", duracion: 8, code: "ISO31000" },
  { titulo: "INDICADORES DE GESTIÓN", duracion: 8, code: "INDICADORES" },
  { titulo: "ISO/IEC 9001:2015 SISTEMAS DE GESTIÓN DE LA CALIDAD", duracion: 8, code: "ISO9001" },
  { titulo: "ISO/IEC 17025:2017 REQUISITOS GENERALES PARA LA COMPETENCIA DE LOS LABORATORIOS", duracion: 12, code: "ISO17025" },
  { titulo: "ESTADÍSTICA BÁSICA", duracion: 8, code: "ESTADISTICA" },
  { titulo: "ASEGURAMIENTO DE VALIDEZ DE RESULTADOS", duracion: 8, code: "VALIDEZRESULTADOS" },
  { titulo: "TRATAMIENTO DE NO CONFORMIDADES", duracion: 8, code: "NOCONFORMIDADES" },
  { titulo: "ISO/IEC 17043:2010 ENSAYOS DE APTITUD", duracion: 8, code: "ISO17043" }
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
async function addPersonCertificate(email, name, id, courseTitle, link) { // Incluye el id como parámetro
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
      email,
      certificates: []
    });
  }

  // Crea el nuevo certificado
  const personCertificate = {
    course: courseTitle,
    courseCode: course.code, 
    duration: course.duracion,
    certificate: certificateNumber,
    date: new Date(), // Fecha actual
    link: link
  };

  // Agrega el certificado al array de certificados de la persona
  person.certificates.push(personCertificate);

  // Guarda los cambios en la base de datos
  await person.save();

  // Devuelve la persona actualizada con el nuevo certificado
  return person;
}

module.exports = { addPersonCertificate };
