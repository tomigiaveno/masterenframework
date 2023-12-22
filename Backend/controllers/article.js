"use strict";

var validator = require("validator");

var fs = require("fs");
var path = require("path");

var Article = require("../models/article");
const article = require("../models/article");

var controller = {
  datosCurso: (req, res) => {
    var hola = req.body.hola;
    return res.status(200).send({
      curso: "Master en Frameworks JS",
      autor: "Tomas Giaveno",
      url: "tomigiaveno.es",
      hola,
    });
  },
  test: (req, res) => {
    return res.status(200).send({
      message: "Soy la acción test de mi controlador de articulos",
    });
  },
  save: (req, res) => {
    //console.log(req);
    var params = req.body;
    console.log(params);
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (err) {
      return res.status(200).send({
        status: "error",
        message: `faltan datos para enviar en Save!! ${err}`,
      });
    }
    //Crear el objeto a guardar
    var article = new Article();

    //Asignar Valores
    article.title = params.title;
    article.content = params.content;
    article.image = null;
    // Guardar el articulo
    article
      .save()
      .then((articleStored) => {
        //Devolver una respuesta
        return res.status(200).send({
          status: "success",
          article: articleStored,
        });
      })
      .catch((err) => {
        return res.status(404).send({
          status: "error",
          message: "El articulo no se ha guardado!!",
        });
      });
  },

  getArticles: (req, res) => {
    var query = Article.find({});

    var last = req.params.last;

    if (last || last != undefined) {
      query.limit(5);
    }
    // Find
    query
      .sort("-_id")
      .exec()
      .then((articles) => {
        if (!articles) {
          return res.status(404).send({
            status: "error",
            message: "No hay articulos para mostrar!!",
          });
        }

        return res.status(200).send({
          status: "success",
          articles,
        });
      })
      .catch((err) => {
        return res.status(200).send({
          status: "error",
          message: "Error al devolver los articulos!!",
        });
      });
  },

  getArticle: (req, res) => {
    //Recoger el id de la url
    var articleId = req.params.id;
    //Comprobar que existe
    if (!articleId || articleId == null) {
      return res.status(404).send({
        status: "error",
        message: "No existe el articulo!!",
      });
    }
    //buscar el articulo
    Article.findById(articleId)
      .then((article) => {
        return res.status(200).send({
          status: "success",
          article,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          status: "error",
          message: "Error al devolver los datos!!",
        });
      });
  },

  update: (req, res) => {
    //Recoger el id del articulo por la url
    var articleId = req.params.id;

    //recoger los datos que llegan por put
    var params = req.body;

    // Validar datos
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (err) {
      return res.status(200).send({
        status: "error",
        message: "Variar datos!!",
      });
    }

    if (validate_title && validate_content) {
      // Find and update
      Article.findOneAndUpdate({ _id: articleId }, params, { new: true })
        .then((articleUpdated) => {
          if (!articleUpdated) {
            return res.status(404).send({
              status: "error",
              message: "No existe el articulo!!!",
            });
          }

          return res.status(200).send({
            status: "success",
            article: articleUpdated,
          });
        })
        .catch((err) => {
          return res.status(500).send({
            status: "error",
            message: "Error al actualizar!!!",
          });
        });
    }
  },

  delete: (req, res) => {
    // Recoger el id de la URL
    var articleId = req.params.id;

    // Find and delete
    Article.findOneAndDelete({ _id: articleId })
      .then((articleRemoved) => {
        if (!articleRemoved) {
          return res.status(404).send({
            status: "error",
            message: "No se ha borrado el artículo, posiblemente no existe!!!",
          });
        }

        return res.status(200).send({
          status: "success",
          article: articleRemoved,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          status: "error",
          message: "Error al borrar!!!",
        });
      });
  },

  upload: (req, res) => {
   //configurar el modulo connect multiparty router/article.js (hecho)

   //recoger el fichero de la petición
   var file_name  = "Imagen no subida..";

  if(!req.files){
    return res.status(404).send({
      status: "error", 
      message: file_name
    });
  }
  
//conseguir nombre y la extensión del archivo
  var file_path = req.files.file0.path;
  var file_split = file_path.split("\\");

  //nombre de archivo
  var file_name = file_split[2];

  //Extensión del fichero
  var extension_split = file_name.split("\.");
  var file_ext = extension_split[1];
  
//comprobar la extensión, solo imagenes, si es valida borrar el fichero
if(file_ext != "png" && file_ext != "jpg" && file_ext != "jpeg" && file_ext != "gif"){
  //borrar el archivo subido

  fs.unlink(file_path, (err) => {
    return res.status(200).send({
      status: "error",
      message: "La extensión de la imagen no es valida !!!"
    });
  });


}else{
  //si todo es válido, sacando id de la url
var articleId = req.params.id;
   //buscar el articulo, asignarle el nombre de la imagen y actualizarlo
   Article.findOneAndUpdate({_id: articleId},{image: file_name}, {new: true})
   .then((articleUpdated) => {
    
    if(!articleUpdated){
      return res.status(500).send({
       status: "error",
        message: "error al guardar la imagen de articulo !!!"
      });
    }
    
    return res.status(200).send({
      status: "success",
      article: articleUpdated
     
    });
   })
   .catch(err =>{
    return res.status(500).send({
      status: "error",
       message: "error al guardar la imagen de articulo !!!"
     });
   })
   
   
   
  

  }//end upload file

   

   
},

getImage: (req, res) => {
  var file = req.params.image;
  var path_file = "/.upload/articles"+ file;

  fs.promises.readFile(path_file ).then((exists) => {
    if(exists){
      return res.sendFile(path.resolve(path_file));
    }else{
      return res.status(404).send({
        status: "success",
        message: "La imagen no existe !!!"
       });
    }
})
.catch(()=> {
  return res.status(404).send({
    status: "success",
    message: "La imagen no existe !!!"
   });
})

  
},

search: (req, res) => {
  return new Promise((resolve, reject) => {
    const searchString = req.params.search;
    Article.find({
      $or: [
        { title: { $regex: searchString, $options: "i" } },
        { content: { $regex: searchString, $options: "i" } }
      ]
    })
    .sort([["date", "descending"]])
    .exec()
    .then(articles => {
      if (!articles || articles.length === 0) {
        res.status(404).send({
          status: "error",
          message: "No hay artículos que coincidan con tu búsqueda"
        });
      } else {
        resolve(articles);
      }
    })
    .catch(error => {
      reject(error);
      res.status(404).send({ status: "error", message: error.message });
    });
  });
}
     
              
   
}; //end controller
module.exports = controller;
