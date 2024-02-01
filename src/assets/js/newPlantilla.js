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
	{% include '_website/hero.njk' %}
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
