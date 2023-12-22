'use strict';

var mongoose = require('mongoose');
var app = require("./app");
var port = 3900;

// Elimina la configuración de useFindandModify, ya que no es necesario en Mongoose 6.0.0 y versiones posteriores
// mongoose.set("useFindAndModify", false);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/master-en-framework')
    .then(() => {
        console.log('La conexión a la base de datos se ha realizado bien!!!');

        // Crear servidor y ponerme a escuchar peticiones HTTP
        app.listen(port, () => {
            console.log("Servidor corriendo en http://localhost:" + port);
        });
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error);
    });


  
    