import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [
        nodePolyfills({
            include: ['http', 'util'], // Include specific polyfills
        }),

        // Enable Laravel support
        laravel({
            input: ['resources/js/csr.jsx', 'resources/js/ssr.jsx'],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(), // Enable React support
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolve these file extensions
        alias: {
            '@': path.resolve(__dirname, 'resources/js'), // Alias for resources/js
            '@public': path.resolve(__dirname, 'public'), // Alias for public
        },
    },
    ssr: {
        noExternal: [
            '@inertiajs/core', // Include Inertia.js core explicitly in the SSR bundle
        ],
    },
    server: {
        historyApiFallback: true, // Enables handling of history API fallback (for React Router)
    },
    build: {
        sourcemap: false, // Disable source maps for production
        minify: 'esbuild', // Use esbuild for faster minification
        chunkSizeWarningLimit: 1000, // Adjust chunk size warning limit
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString()
                    }
                },
            },
        },
    },
})
