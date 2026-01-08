import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'src',
    publicDir: '../public',
    plugins: [
        tailwindcss(),
    ],
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                resume: resolve(__dirname, 'src/resume/index.html'),
            },
        },
    },
    server: {
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }
});
