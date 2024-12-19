export default {
  base: './', // Ensure assets use relative paths
  optimizeDeps: {
    exclude: ['oxigraph'],
  },
  worker: {
    format: 'es',
  },
  define: {
    'global': {},
  },
}
