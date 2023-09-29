const express = require('express')
const app = express()
const myMiddleware = (req, res, next) => {
  // Realizar acciones antes de pasar al siguiente middleware o la respuesta final
  console.log('Middleware ejecutado');
  next(); // Llamar a next() para pasar al siguiente middleware
};
app.use(myMiddleware);
app.get('/', function (req, res) {
  res.send('hola')
})
//*base de datos//*
const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/tpintegrador1'; // Reemplaza con tu cadena de conexión

mongoose.connect('mongodb://localhost:27017/tpintegrador1')
 .then(() => console.log('servidor andando'))
 .catch(e => console.log(e))
 

//MIDDLEWARE
// middleware de registro de productos
app.use((req, res, next) => {

  if (req.method === 'POST' && req.path === '/productos/crear') {
    const nombreProducto = req.body.nombre; 
    fs.appendFileSync('productos.log', `Se ha creado el producto: ${nombreProducto}\n`);
  } else if (req.method === 'PUT' && req.path.startsWith('/productos/actualizar/')) {
    // extrae el id del producto
    const idProducto = req.path.split('/').pop();
    // registra el mensaje en el archivo de log
    fs.appendFileSync('productos.log', `Se ha actualizado el producto con id: ${idProducto}\n`);
  }

  
  next();
});

// Rutas de ejemplo
app.post('/productos/crear', (req, res) => {
  // logica para crear el producto
  res.send('Producto creado');
});

app.put('/productos/actualizar/:id', (req, res) => {
  // para actualizar
  res.send('Producto actualizado');
});





app.listen(3000, () => {
    console.log('servidor andando')
});
