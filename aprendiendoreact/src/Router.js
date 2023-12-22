import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// Importar Componentes
import Peliculas from "./components/peliculas";
import MiComponente from "./components/MiComponente";
import Error from "./components/Error";
import Header from "./components/Header";
import Pagina1 from "./components/Pagina1";
import NombreApellido from "./components/NombreApellido";
import footer from "./components/footer";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Formulario from "./components/Forumulario";
import Search from "./components/Search";
import Article from "./components/Article";
import CreateArticle from "./components/CreateArticle";
import EditArticle from "./components/EditArticle";
class Router extends Component {
  render() {
    console.log("funciona");
    return (
      <BrowserRouter>
        <header />

        {/*CONFIGURAR RUTAS Y PÁGINAS*/}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/blog/articulo/:id" element={<Article />} />
          <Route exact path="/blog/crear" element={<CreateArticle />} />
          <Route exact path="/blog/editar/:id" element={<EditArticle />} />
          <Route exact path="/blog/busqueda/:search" element={<Search />} />
          <Route exact path="/redirect/:search" render={
              (props) => {
                var search = props.match.params.search;
                return (<Navigate to={"/blog/busqueda/"+search} />
                );
              }
             } />

          <Route exact path="/formulario" element={<Formulario />} />
          <Route exact path="/peliculas" element={<Peliculas />} />

          <Route exact path="/segunda-ruta" element={<MiComponente />} />
          <Route exact path="/pagina-1" element={<Pagina1 />} />

          <Route
            exact
            path="/pruebas/:nombre/:apellidos?"
            element={<NombreApellido />}
          />
          <Route component={Error} />
        </Routes>

        <div className="clearfix"></div>

        <footer />
      </BrowserRouter>
    );
  }
}

export default Router;
