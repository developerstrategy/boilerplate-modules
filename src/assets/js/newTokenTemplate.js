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
const targetMarkdownFilePath = path.join("src", "tokens", "templates", `token-${fileName}.md`);

// Ruta donde se guardará el archivo Nunjucks
const targetNunjucksFilePath = path.join("src", "_includes", "_tokens", "_templates", `token-${fileName}.njk`);

// Configurar Nunjucks
nunjucks.configure({
  autoescape: true,
});

// Datos que deseas pasar a las plantillas


// Fecha actual en formato YYYY-MM-DD
const currentDate = new Date().toISOString().slice(0, 10);

// Plantilla Nunjucks (para archivo .md)
const markdownTemplate = `---
layout: _tokens/_templates/token-${fileName}.njk
permalink: /token-${fileName}/
page_section: token-templates
titulo: token-${fileName}
descripcion: token-${fileName}
image: /assets/static/images/${fileName}.jpg
author: autor
date: ${currentDate} 
tags: ["token-templates"]
imageAlt: ${fileName}
---
# ${fileName}

`;

// Plantilla Nunjucks (para archivo .njk)
const nunjucksTemplate = `---
layout: base-clean.njk
---
<!-- Contenido de la plantilla ${fileName}.njk -->
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
    console.log("\x1b[33mEs el momento de editar \"" + targetNunjucksFilePath + "\"\x1b[0m");

  }
});
