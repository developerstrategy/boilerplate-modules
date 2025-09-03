const fs = require('fs');
const path = require('path');

// Get the template name from command line arguments
const templateName = process.argv[2];

if (!templateName) {
  console.error('❌ Error: Debes proporcionar un nombre para el template');
  console.log('💡 Uso: npm run marqueetemplate nombreDelTemplate');
  process.exit(1);
}

// Validate template name
if (!/^[a-zA-Z0-9_-]+$/.test(templateName)) {
  console.error('❌ Error: El nombre del template solo puede contener letras, números, guiones y guiones bajos');
  process.exit(1);
}

const templatesDir = path.join(__dirname, '../../tokens/templates');
const templateFile = path.join(templatesDir, `${templateName}.njk`);

// Check if template already exists
if (fs.existsSync(templateFile)) {
  console.error(`❌ Error: El template '${templateName}' ya existe`);
  process.exit(1);
}

// Template content
const templateContent = `---
layout: base-clean.njk
permalink: /${templateName}/
page_section: token-templates
titulo: ${templateName}
descripcion: Template de marquee con animación GSAP
image: /assets/static/images/${templateName}.jpg
author: autor
date: ${new Date().toISOString().split('T')[0]}
tags: ["token-templates", "marquee", "animation"]
imageAlt: ${templateName}
---
<!-- Contenido de la plantilla ${templateName}.njk -->
{% import "_macros/insert.njk" as insert %}

<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet">

<section class="marquee">
  <div class="marquee__inner" aria-hidden="true" ref="inner">
    <div class="marquee__part">
      food wine fish beef vegetables 
    </div>
    <div class="marquee__part">
      food wine fish beef vegetables 
    </div>
    <div class="marquee__part">
      food wine fish beef vegetables 
    </div>
    <div class="marquee__part">
      food wine fish beef vegetables 
    </div>
    <div class="marquee__part">
      food wine fish beef vegetables 
    </div>
  </div>
</section>

<style>
.marquee__part {
  flex-shrink: 0;
  padding: 0 4px;
  font-smooth: always;
}

.marquee {
  background: #3B7FFF;
  color: #EEE;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.667vw;
  padding: 32px 0;

  position: relative;
  overflow: hidden;
}

.marquee__inner {
  -webkit-font-smoothing: antialiased;
    width: fit-content;
    display: flex;
    flex: auto;
    flex-direction: row;
}

.spacer {
  height: 150px;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Verificar que GSAP esté disponible
  if (typeof gsap === 'undefined') {
    console.error('GSAP no está cargado');
    return;
  }

  let currentScroll = 0;
  let isScrollingDown = true;

  let tween = gsap.to(".marquee__part", {xPercent: -100, repeat: -1, duration: 10, ease: "linear"}).totalProgress(0.5);

  gsap.set(".marquee__inner", {xPercent: -50});

  window.addEventListener("scroll", function(){
    
    if ( window.pageYOffset > currentScroll ) {
      isScrollingDown = true;
    } else {
      isScrollingDown = false;
    }
    
    gsap.to(tween, {
      timeScale: isScrollingDown ? 1 : -1
    });
    
    currentScroll = window.pageYOffset
  });
});
</script>`;

// Ensure templates directory exists
if (!fs.existsSync(templatesDir)) {
  fs.mkdirSync(templatesDir, { recursive: true });
}

// Write the template file
fs.writeFileSync(templateFile, templateContent);

console.log(`✅ Template '${templateName}' creado exitosamente!`);
console.log(`📁 Archivo: ${templateFile}`);
console.log(`🌐 URL: http://localhost:8080/${templateName}/`);
console.log(`\n💡 Para ver el template:`);
console.log(`   1. Ejecuta: npm run build:eleventy`);
console.log(`   2. Visita: http://localhost:8080/${templateName}/`);
