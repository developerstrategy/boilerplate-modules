# The Boilerplate 🚀

Un sistema de diseño modular y eficiente para crear sitios web modernos. Desarrollado con **Eleventy** y **Nunjucks** para ofrecer una experiencia de desarrollo ágil y escalable.

## ✨ Características

- **🏗️ Arquitectura Modular**: Sistema de templates reutilizables y componentes independientes
- **⚡ Eleventy + Nunjucks**: Generación estática rápida con plantillas potentes
- **🎨 Design System**: Tokens de diseño y componentes predefinidos
- **📱 Responsive**: Diseño adaptable a todos los dispositivos
- **🛠️ Herramientas de Desarrollo**: Scripts automatizados para crear componentes y templates
- **📸 Generación de Miniaturas**: Sistema automático para capturas de pantalla
- **🔧 Hot Reload**: Desarrollo en tiempo real con recarga automática

## 🚀 Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Allchorne3/11ty-nunjucks.git
   cd boilerplate-modules
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm start
   ```

4. **Abre tu navegador:**
   ```
   http://localhost:8080
   ```

## 📁 Estructura del Proyecto

```
src/
├── _includes/
│   ├── _tokens/_templates/     # Templates de componentes (hero, contact, etc.)
│   ├── components/             # Componentes reutilizables
│   └── base-clean.njk         # Layout base
├── assets/
│   ├── css/                   # Estilos compilados
│   ├── sass/                  # Archivos SCSS fuente
│   ├── js/                    # Scripts JavaScript
│   └── static/                # Imágenes y recursos estáticos
├── pages/                     # Páginas principales
├── tokens/templates/          # (Eliminado - ahora solo .njk)
└── _data/                     # Datos globales y configuración
```

## 🛠️ Comandos Disponibles

### Desarrollo
```bash
npm start                    # Inicia servidor de desarrollo con hot reload
npm run watch:eleventy      # Solo servidor Eleventy
npm run watch:sass          # Solo compilador SASS
```

### Build
```bash
npm run build               # Build completo para producción
npm run build:eleventy      # Solo build de Eleventy
npm run build:sass          # Solo build de SASS
```

### Generación de Componentes
```bash
# Crear un nuevo template
npm run template nombreDelTemplate

# Crear un nuevo token template
npm run tokentemplate nombreDelToken

# Crear un nuevo template de marquee
npm run marqueetemplate nombreDelMarquee

# Crear un nuevo componente
npm run component nombreDelComponente

# Crear un nuevo token componente
npm run tokencomponent nombreDelToken
```

### Utilidades
```bash
# Generar miniaturas de todos los templates
npm run img-exporter

# Actualizar dependencias
npx npm-check-updates -u

# Debug mode
npm run debug
```

## 🎨 Sistema de Templates

### Templates Disponibles

- **Hero Templates**: `hero_1` a `hero_6` - Secciones principales de landing
- **Content Templates**: `content_1` a `content_11` - Bloques de contenido
- **Contact Templates**: `contact_1` a `contact_3` - Formularios de contacto
- **Team Template**: `team_1` - Sección de equipo
- **Pricing Template**: `pricing_1` - Tablas de precios
- **FAQ Template**: `faqs_1` - Preguntas frecuentes
- **Marquee Template**: `marquee_1` - Animación de texto con GSAP que cambia dirección según el scroll

### Acceso a Templates

Todos los templates están disponibles en:
```
http://localhost:8080/[nombre_del_template]/
```

Ejemplos:
- `http://localhost:8080/hero_1/`
- `http://localhost:8080/team_1/`
- `http://localhost:8080/contact_1/`
- `http://localhost:8080/marquee_1/`

## 🔧 Configuración

### Variables Globales

Edita `src/_data/global.json` para personalizar:
- Información de la empresa
- Colores del tema
- Textos globales
- Configuración SEO

### Estilos

Los estilos se encuentran en `src/assets/sass/`:
- `style.scss` - Archivo principal
- `_theme.scss` - Variables y tema
- `componentes/` - Estilos de componentes específicos

## 📸 Generación de Miniaturas

Para generar miniaturas de todos los templates:

1. Asegúrate de que el servidor esté corriendo en `http://localhost:8080`
2. Ejecuta: `npm run img-exporter`
3. Las miniaturas se guardarán en `public/assets/static/capturas/`

## 🚀 Despliegue

### Netlify (Recomendado)
1. Conecta tu repositorio a Netlify
2. Configura el build command: `npm run build`
3. Configura el publish directory: `public`

### Otros Proveedores
El proyecto genera archivos estáticos en la carpeta `public/` que puedes subir a cualquier servidor web.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Changelog

### v1.0.8 - Estructura Simplificada
- ✅ Eliminados archivos `.md` redundantes
- ✅ Templates ahora solo usan archivos `.njk`
- ✅ Estructura más limpia y mantenible
- ✅ Build más rápido y eficiente

## 👥 Autores

- **Manuel** - UX Designer & Developer
- **Dani** - Full Stack Developer  
- **José** - Frontend Specialist

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- [Eleventy](https://www.11ty.dev/) - Generador de sitios estáticos
- [Nunjucks](https://mozilla.github.io/nunjucks/) - Motor de plantillas
- [Holy Grail CSS](https://holygrailcss.com/) - Framework CSS
- [SASS](https://sass-lang.com/) - Preprocesador CSS

---

Hecho con ❤️ por Manuel, Dani y José.