/* eslint-env node */
import { defineConfig } from 'viteburner';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '/src': resolve(__dirname, 'src'),
      react: resolve(__dirname, 'src', 'vendored', 'react.js'),
      //     If you want to add a node_modules dependency, follow this template:
      // immutable: resolve(__dirname, 'src', 'vendored', 'name_of_library.js'),
      //     THEN RUN:
      //     $ npx esbuild --bundle --format=esm path_to_entry_file.ts --outfile=src/vendored/name_of_library.js
      //     To create the bundled file you can import from.
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
  },
  viteburner: {
    watch: [
      { pattern: 'src/**/*.{js,ts}', transform: true }, 
      { pattern: 'src/**/*.{script,txt}' },
      // This is optional, if you want a script that injects CSS stylesheets: stylesheets.ts
      {
        pattern: 'src/**/*.css',
        location: (file) => ({ filename: file.replace('.css', '.css.txt').replace(/^src/, '') }),
      },

      // Convert your .jsx/.tsx files into regular js files.
      {
        pattern: 'src/**/*.{jsx,tsx}',
        transform: true,
        location: (file) => ({ filename: file.replace(/[jt]sx?$/, 'js').replace(/^src/, '') }),
      },
    ],
    sourcemap: 'inline',
  },
});
