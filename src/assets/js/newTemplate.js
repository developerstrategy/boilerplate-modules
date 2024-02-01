const fs = require("fs");
const path = require("path");
const nunjucks = require("nunjucks");

// Obtener el argumento de línea de comandos que representa el nombre del archivo
const fileName = process.argv[2];

// Verificar si se proporcionó un nombre de archivo válido
if (!fileName) {
  console.error("Por favor, proporciona un nombre para el archivo.");
  console.log("Ejemplo: node generarArchivos.js nombre_archivo");
  process.exit(1);
}

// Ruta donde se guardará el archivo Markdown
const targetMarkdownFilePath = path.join("src", "templates", `${fileName}.md`);

// Ruta donde se guardará el archivo Nunjucks
const targetNunjucksFilePath = path.join("src", "_includes", "_paginas", "templates", `${fileName}.njk`);

// Configurar Nunjucks
nunjucks.configure({
  autoescape: true,
});

// Datos que deseas pasar a las plantillas


// Fecha actual en formato YYYY-MM-DD
const currentDate = new Date().toISOString().slice(0, 10);

// Plantilla Nunjucks (para archivo .md)
const markdownTemplate = `---
layout: _paginas/templates/${fileName}.njk
permalink: /${fileName}/
page_section: templates
titulo: ${fileName}
descripcion: ${fileName}
image: /assets/static/images/${fileName}.jpg
author: autor
date: ${currentDate} 
tags: ["templates"]
imageAlt: ${fileName}
---
# ${fileName}
`;

// Plantilla Nunjucks (para archivo .njk)
const nunjucksTemplate = `---
layout: base.njk
---
{% import "_macros/_token.njk" as tokens %}
{% import "_macros/_insert.njk" as insert %}

<div class="container-fluid">
sdfdsffds
</div>


<section class="mb-32 mt-32">
<div class="row">
  <div class="col-xs-12">

          {% call insert.template('_tokens/_templates/','token-${fileName}', '550px','https://www.figma.com') %} {% endcall %} 

  </div>
</div>
</section>


<!-- Contenido de la página plantilla ${fileName}.njk -->
`;

// Renderizar la plantilla con los datos y guardar el archivo Markdown
fs.writeFile(targetMarkdownFilePath, nunjucks.renderString(markdownTemplate), (err) => {
  if (err) {
    console.error("Error al crear el archivo Markdown:", err);
  } else {
    console.log(`El archivo Markdown "${targetMarkdownFilePath}" se ha creado correctamente.`);
  }
});

// Guardar el archivo Nunjucks con el nombre sin la extensión .md
fs.writeFile(targetNunjucksFilePath, nunjucksTemplate, (err) => {
  if (err) {
    console.error("Error al crear el archivo Nunjucks:", err);
  } else {
    console.log(`El archivo Nunjucks "${targetNunjucksFilePath}" se ha creado correctamente.`);
  }
});


const globalJsonPath = path.join("src", "_data", "sistemas.json"); // Asumiendo que el archivo está en src/data
// Ruta absoluta al archivo global.json

// Función para asegurar que el directorio exista
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname, { recursive: true });
}

// Asegurarse de que el directorio donde se guardará global.json exista
ensureDirectoryExistence(globalJsonPath);

// Leer el archivo global.json si existe, si no, inicializar un objeto vacío
fs.readFile(globalJsonPath, (err, data) => {
  let globalData = { files: [] };
  if (!err && data) {
    try {
      globalData = JSON.parse(data);
    } catch (parseError) {
      console.error("Error al parsear global.json:", parseError);
    }
  }

  // Verificar si globalData.files es un array; si no, inicializarlo como tal
  if (!Array.isArray(globalData.files)) {
    globalData.files = [];
  }

  // Crear el objeto con la nueva estructura para el fileName
  const newFileObject = {
    imageUrl: `http://localhost:8080/token-${fileName}`,
    imageSistema: `/assets/static/${fileName}.jpg`,
    empresaSistema: fileName,
    descripcionSistema: `${fileName} description.`
  };

  // Verificar si el fileName ya existe para evitar duplicados
  // Esto asume que quieres evitar duplicados basado en el nombre de la empresaSistema
  const exists = globalData.files.some(file => file.empresaSistema === fileName);
  if (!exists) {
    globalData.files.push(newFileObject);
  }

  // Escribir de nuevo en el archivo global.json
  fs.writeFile(globalJsonPath, JSON.stringify(globalData, null, 2), (writeErr) => {
    if (writeErr) {
      console.error("Error al escribir en global.json:", writeErr);
    } else {
      console.log(`El archivo global.json se ha actualizado correctamente con el nuevo archivo: ${fileName}`);
    }
  });
});