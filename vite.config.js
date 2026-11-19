import { defineConfig } from 'vite';
import { resolve, relative } from 'path';
import fs from 'fs';

const src = resolve(__dirname, 'src');

// Busca todos los .html dentro de src, incluyendo subcarpetas
function buscarHtml(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const ruta = resolve(dir, e.name);
    if (e.isDirectory()) return buscarHtml(ruta);
    return e.name.endsWith('.html') ? [ruta] : [];
  });
}

const input = Object.fromEntries(
  buscarHtml(src).map(ruta => [
    relative(src, ruta).replace(/\.html$/, ''),
    ruta,
  ])
);

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: { input },
  },
});