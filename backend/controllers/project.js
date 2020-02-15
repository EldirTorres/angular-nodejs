'use strict'
var Project = require('../models/project');
var fs = require('fs');
var path = require('path'); //Modulo de node que permite trabajar con directorios o rutas fisicas

var controller = {

    home: function(req, res){
        return res.status(200).send({
            message: 'Home'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'Test controller project'
        });
    },

    saveProject: function(req, res){
        var project = new Project(); //asigna automaticamente un  _id

            var params = req.body;
            project.name = params.name;
            project.description = params.description;
            project.category = params.category;
            project.year = params.year;
            project.langs = params.langs;
            project.image = null;

        //Guardado de DB 
        project.save((err, projectStored) => {
            if (err) return res.status(500).send({message: 'Error al guardar el documento'});
            if (!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});
                                    //Propiedad project
            return res.status(200).send({project: projectStored});
        });
    },

    getProject: function(req, res){
        var projectId = req.params.id;

        if (projectId == null) return res.status(404).send({message: 'El parametro "id" no puede estar en blanco '});
        
        //Metodo de mongoose
        Project.findById(projectId, (err, project) => {

            if (err) return res.status(500).send({message: 'Error al buscar el documento'});
            
            if (!project) return res.status(404).send({message: 'No se ha podido encontrar el proyecto'});

            return res.status(200).send({
                project
            });
        });
    },

    getProjects: function(req, res){
       //Busca todos los documentos 
       //Se puedo condicionar la consulta como si colocaramos un where de la siguiente manera:
       //find({year:2019})
       //Ordenar sort('year') de  menor a mayor
       //o mayor a menor sort('-year')
        Project.find({}).sort('-year').exec((err, projects) => {

            if (err) return res.status(500).send({message: 'Error al buscar los documento'});

            if (!projects) return res.status(404).send({message: 'No hay proyectos para mostrar'});

            return res.status(200).send({projects});
        });
    },

    updateProject: function(req, res){
        var projectId = req.params.id;

        if (projectId == null) return res.status(404).send({message: 'El parametro "id" no puede estar en blanco '});

        //req.body trae todos los datos del objeto enviado
        var update = req.body;

        //findByIdAndUpdate actualiza el objeto que le envie con el que esta en DB
        //Por defecto devuelve datos antiguos Project.findByIdAndUpdate(projectId, update,(err, projectUpdated)
        //Se debe hacer lo siguiente para coreguir esa accion "{new:true}" -> Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated)
        Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) =>{

            if (err) return res.status(500).send({message: 'Error al actualizar el documento'});

            if (!projectUpdated) return res.status(404).send({message: 'No se ha encontrado el documento'});

            return res.status(200).send({project:projectUpdated});
        });
    },

    deleteProject: function(req, res){
        var projectId = req.params.id;

        if (projectId == null) return res.status(404).send({message: 'El parametro "id" no puede estar en blanco '});
        
        Project.findByIdAndRemove(projectId, (err, projectRemove) =>{

            if (err) return res.status(500).send({message: 'Error al eliminar el documento'});

            if (!projectRemove) return res.status(404).send({message: 'No se ha encontrado el documento'});

            return res.status(200).send({project:projectRemove});

        });
    
    },

    uploadImage: function (req, res){
        var projectId = req.params.id;
        var fileName = 'Imagen no subida...';

        if (projectId == null) return res.status(404).send({message: 'El parametro "id" no puede estar en blanco '});

        if (req.files) {

            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new:true}, (err, projectUpdated) => {

                    if (err) return res.status(500).send({message: 'Error al actualizar documento con la imagen'});
    
                    if (!projectUpdated) return res.status(404).send({message: 'No se ha encontrado el documento'});
                             //req.files si imprimo esto podria ver todas sus propiedades
                    return res.status(200).send({project:projectUpdated}); 
                });
            }else{
                //En caso de que falle borramos el archivo
                fs.unlink(filePath, (err) =>{
                    return res.status(200).send({message:'Extensión no valida'}); 
                });
            }
             
        }else{
            return res.status(200).send({message: fileName}); 
        }
    },

    /* Metodo encargado de ubicar el directorio de las imagenes */
    getImageFile: function (req, res){

        var file = req.params.image;
        var path_file = './uploads/'+file;

        // Comprobamos si el path del archivo existe
        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file))
            }else{
                return res.status(200).send({
                    message: "No existe la imagen..."
                });
            }
        });
    }



};

module.exports = controller;