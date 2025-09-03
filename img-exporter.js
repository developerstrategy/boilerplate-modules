const puppeteer = require('puppeteer');
const data = require('./src/_data/sistemas.json');
const { URL } = require('url');

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (e) {
    return false;
  }
}

async function captureMultipleScreenshots(urls) {
  const browser = await puppeteer.launch({ ignoreHTTPSErrors: true, headless: 'new' });
  const page = await browser.newPage();

  await page.setUserAgent(userAgent);
  await page.setViewport({ width: 1200, height: 810 });

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    if (!isValidUrl(url.url)) {
      console.log(`Error: URL inválida ${url.url} en ${url.name}`);
      continue; // Salta a la siguiente URL
    }
    try {
      console.log(`\n- ${i + 1} de ${urls.length}`);

      await page.goto(url.url, { waitUntil: ['load', 'domcontentloaded', 'networkidle0'] });

      const descriptionMetaElement = await page.$('meta[name="description"]');
      const descriptionMeta = descriptionMetaElement ? await descriptionMetaElement.getProperty('content').then(prop => prop.jsonValue()) : '';

      if (url.cookies) {
        await page.waitForSelector(url.cookies, { visible: true });
        await page.click(url.cookies);
        await new Promise(resolve => setTimeout(resolve, 6000));
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      await page.screenshot({ path: `./src/assets/static/capturas/${url.name}` });
      console.log(url.name);
      console.log(`"descripcionSistema": "${descriptionMeta}",`);

    } catch (error) {
      console.log(`Error al capturar screenshot ${url.name} ${i + 1}: ${error}`);
    }
  }

  await browser.close();
  console.log('Proceso de captura de screenshots completado.');
}

const urls = data.files.map((item) => ({
  url: item.imageUrl,
  name: item.imageSistema,
  cookies: item.cookies,
}));

captureMultipleScreenshots(urls);
