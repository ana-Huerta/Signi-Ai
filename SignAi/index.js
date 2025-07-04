//Importar el archivo de conexion
const mongoose = require("./conn")
const express = require('express');
const app = express();
const PORT = 2414;

//utilizar archivos json
app.use(express.json());

// Configurar archivos estáticos
app.use(express.static('static'));

//Mostrar el inicio
app.get('/', (req, res) =>{
 res.sendFile('static/index.html');
});

//importar las demas rutas
app.use('/chat/expressions', require('./routes/expressions'));
app.use('/chat/functionalities', require('./routes/functionality'));
app.use('/chat/historial', require('./routes/historial'));
app.use('/chat/other', require('./routes/other'));
app.use('/chat/search', require('./routes/search'));
app.use('/chat/story', require('./routes/story'));

//inicializar el puerto para ejecutar la app?
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});