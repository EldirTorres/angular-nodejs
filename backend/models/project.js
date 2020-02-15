'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});
                            //modelo y esquema
module.exports = mongoose.model('Project', ProjectSchema);
//Nota: mongoose  pluraliza las nombres de los modelos y los convierte a minusculas por lo tanto Projct
//Sera projects