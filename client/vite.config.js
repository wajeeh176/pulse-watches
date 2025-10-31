import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  server: { port: 5173 },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Multiple passes for better minification
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
    // Enable tree-shaking and better optimization
    rollupOptions: {
      output: {
        // Optimize chunk splitting to reduce chain depth
        // Split into smaller, loadable-in-parallel chunks
        manualChunks: (id) => {
          // React core - smallest, loads first (foundation)
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-core';
          }
          // React Router - can load in parallel with MUI
          if (id.includes('node_modules/react-router-dom')) {
            return 'react-router';
          }
          // MUI core - split from icons for parallel loading
          if (id.includes('node_modules/@mui/material')) {
            return 'mui-core';
          }
          // MUI icons - defer loading (not critical for initial render)
          if (id.includes('node_modules/@mui/icons-material')) {
            return 'mui-icons';
          }
          // Emotion - MUI dependency, but can load after initial render
          if (id.includes('node_modules/@emotion')) {
            return 'emotion';
          }
          // Other vendor libraries - defer
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
      // Externalize dependencies that should not be bundled
      external: [],
    },
    chunkSizeWarningLimit: 1000,
    // Enable CSS minification
    cssMinify: true,
    // Reduce build output size
    reportCompressedSize: false,
    // Target modern browsers for smaller bundles
    target: ['es2015', 'edge88', 'firefox78', 'chrome87', 'safari14'],
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: [],
  },
})
