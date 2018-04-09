const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();

//const indexRoutes = require('./routes/index');
const tasksRoutes = require('./routes/tasks');

// settings
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);  // EJS sirve para enviar código html al cliente generado desde el servidor. Es temporal hasta que tener Angular
app.set('view engine', 'ejs');


// middlewares
app.use(cors());    // Para configurar el server Express y el server generado por Angular CLI
app.use(express.json());    // Para gestionar datos JSON recibidos desde el cliente (Antiguo body-parser que ya viene incluido en la nueva versión de Express)
app.use(express.urlencoded({extended: false}));     // Para recibir datos a traves de la URL 

// routes
//app.use(indexRoutes);
app.use('/api', tasksRoutes);

// static files
app.use(express.static(path.join(__dirname, 'dist')));

// start server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});