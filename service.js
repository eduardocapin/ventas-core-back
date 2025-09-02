const { Service } = require('node-windows');
const path = require('path');

// Ruta a tu script Node.js
const scriptPath = path.join(__dirname, 'dist', 'main.js');

// Configuración del servicio
const svc = new Service({
  name: 'ConverterBackend',           // Nombre del servicio
  description: 'Servicio del Converter Backend', 
  script: scriptPath,                 // Script Node.js que quieres ejecutar
  workingDirectory: path.join(__dirname),  // Directorio de trabajo
  nodeOptions: ['--harmony', '--max_old_space_size=4096'], // Opciones de Node.js
  logpath: path.join(__dirname, 'logs') // Carpeta donde se guardan logs automáticos
});

// Eventos del servicio
svc.on('install', () => {
  console.log('Servicio instalado correctamente.');
  svc.start(); // Arranca automáticamente después de instalar
});

svc.on('alreadyinstalled', () => console.log('El servicio ya estaba instalado.'));
svc.on('start', () => console.log('Servicio iniciado.'));
svc.on('stop', () => console.log('Servicio detenido.'));
svc.on('error', (err) => console.error('Error en el servicio:', err));

// Instalar el servicio
svc.install();
