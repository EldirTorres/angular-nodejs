'use strict'
//*************Configuracion de servidor express */
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar archivos de rutas
var  project_routes = require('./routes/project');
//middlewares, estos se ejecutan antes de la peticion
//General
app.use(bodyParser.urlencoded({extended:false})); //Configuarcion necesaria para body-parser
app.use(bodyParser.json()); //todo lo que llegue lo convertira a json

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    //Si queremos permitir una url especifica cambiariamos '*', por la url permitida
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas
/* app.get('/', (req, res) => {
    res.status(200).send(
        "<h1>Bienvenido</h1>"
    );
}); */

/* app.get('/test', (req, res) => {
    //como se recogerian los parametros
    //console.log(req.body.nombre); si quisieramos recoger lo se envia
    //console.log(req.query.web); si quisieramos recoger lo se envia por la url en este caso "web"
    //EJ: http://localhost:3700/?web=mario
    //console.log(req.params.id); si quisieramos recoger lo se envia como parametro  en la url 
    //EJ: /test/:id y seria algo obligatorio
    res.status(200).send({
        message: 'test de prueba, api NodeJS'
    });
}); */

app.use('/api', project_routes);

//exportar
module.exports = app;