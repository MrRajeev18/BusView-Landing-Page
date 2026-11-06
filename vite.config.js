import { resolve } from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

function cleanUrlsPlugin() {
  return {
    name: 'clean-urls-generator',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist');
      const pages = ['for-schools', 'for-parents', 'features', 'how-it-works', 'about', 'pilot', 'privacy', 'terms'];

      pages.forEach((page) => {
        const srcFile = resolve(distDir, `${page}.html`);
        const targetDir = resolve(distDir, page);
        const targetFile = resolve(targetDir, 'index.html');

        if (fs.existsSync(srcFile)) {
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          fs.copyFileSync(srcFile, targetFile);
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [cleanUrlsPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        forSchools: resolve(__dirname, 'for-schools.html'),
        forParents: resolve(__dirname, 'for-parents.html'),
        features: resolve(__dirname, 'features.html'),
        howItWorks: resolve(__dirname, 'how-it-works.html'),
        about: resolve(__dirname, 'about.html'),
        pilot: resolve(__dirname, 'pilot.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html')
      }
    }
  }
});
