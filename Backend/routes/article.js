"use strict";

var express = require("express");
var ArticleController = require("../controllers/article");



var router = express.Router();

var multipart = require("connect-multiparty");
var md_upload = multipart({ uploadDir: "./upload/articles" });

//Rutas de prueba
router.post("/datos-curso", ArticleController.datosCurso);
router.get("/test-de-controlador", ArticleController.test);

// rutas utiles
router.post("/save", ArticleController.save); //Listo, guarda los articulos
router.get("/articles/:last?", ArticleController.getArticles); //Listo, obtiene todos los articulos
router.get("/article/:id", ArticleController.getArticle); //Listo, obtiene 1 articulo
router.put("/article/:id", ArticleController.update); //Listo, actualiza un articulo
router.delete("/article/:id", ArticleController.delete); //Listo, borra un articulo
router.post("/upload-image/:id", md_upload, ArticleController.upload);//Listo
router.get("/get-image/:image", ArticleController.getImage);//Listo
router.get("/search/:search", ArticleController.search);//Listo 
module.exports = router;
