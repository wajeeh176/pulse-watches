import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    // Note: To use bundle analyzer, install rollup-plugin-visualizer
    // and uncomment the plugin configuration below
    // Then run: npm run analyze
  ],
  server: { 
    port: 5173 
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console statements
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        
        // Dead code elimination
        dead_code: true,
        unused: true,
        
        // Remove unreachable code
        passes: 3, // Multiple passes for better optimization
        
        // Optimize conditionals and loops
        conditionals: true,
        evaluate: true,
        loops: true,
        sequences: true,
        
        // Reduce function and variable names
        reduce_vars: true,
        reduce_funcs: true,
        
        // Remove unnecessary code
        collapse_vars: true,
        inline: 2, // Inline functions for smaller output
        join_vars: true,
        negate_iife: true,
        properties: true,
        
        // Optimize boolean operations
        booleans: true,
        booleans_as_integers: false,
        
        // Optimize comparisons
        comparisons: true,
        
        // Remove unused arguments
        arguments: true,
        
        // Optimize if statements
        if_return: true,
        
        // Remove unused properties
        keep_classnames: false,
        keep_fnames: false,
      },
      format: {
        // Remove comments
        comments: false,
        
        // Compact output
        ascii_only: false,
        beautify: false,
        
        // Optimize quotes
        quote_style: 1, // Use single quotes
        
        // Remove unnecessary semicolons
        semicolons: false,
        
        // Preserve annotations (for better tree-shaking)
        preserve_annotations: false,
      },
      mangle: {
        // Mangle variable and function names
        toplevel: true,
        
        // Mangle properties (be careful with this)
        properties: false,
        
        // Safari 10+ compatible
        safari10: true,
      },
      // Keep class names if needed for debugging (set to false for production)
      keep_classnames: false,
      keep_fnames: false,
      // Source map for debugging (disabled in production)
      sourceMap: false,
    },
    cssCodeSplit: true,
    sourcemap: false,
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Optimized chunk splitting strategy
        manualChunks: (id) => {
          // React core libraries
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router/') ||
              id.includes('node_modules/react-router-dom/')) {
            return 'react-vendor';
          }
          
          // Material-UI Core
          if (id.includes('node_modules/@mui/material/') && 
              !id.includes('@mui/icons-material')) {
            return 'mui-core';
          }
          
          // Material-UI Icons - separate chunk (can be large)
          if (id.includes('node_modules/@mui/icons-material')) {
            return 'mui-icons';
          }
          
          // Emotion (MUI's styling engine)
          if (id.includes('node_modules/@emotion/')) {
            return 'emotion';
          }
          
          // React Toastify (can be lazy loaded)
          if (id.includes('node_modules/react-toastify')) {
            return 'toastify';
          }
          
          // Axios (can be lazy loaded in some cases)
          if (id.includes('node_modules/axios')) {
            return 'axios';
          }
          
          // React Helmet (SEO - not critical for initial load)
          if (id.includes('node_modules/react-helmet')) {
            return 'helmet';
          }
          
          // Admin routes - separate chunk (low priority)
          if (id.includes('/admin/')) {
            return 'admin';
          }
        },
        // Optimize chunk file names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop().replace(/\.[^/.]+$/, '')
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
      ],
      exclude: [
        // Exclude heavy dependencies from pre-bundling
        '@mui/icons-material',
      ],
    },
  },
})
