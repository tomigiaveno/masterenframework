import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Global from "../Global";
import Sidebar from "./Sidebar";
import Moment from "react-moment";
import "moment/locale/es";
import Imagedefault from "../assets/images/default.png";
class Article extends Component {
  url = Global.url;

  state = {
    article: false,
    status: null,
  };

  componentWillMount() {
    this.getArticle();
  }

  getArticle = () => {
    console.log(this.props)
    var id = this.props.id;
   

    axios
      .get(this.url + "article/" + id)
      .then((res) => {
        this.setState({
          article: res.data.article,
          status: "success",
        });
      })
      .catch((err) => {
        this.setState({
          article: false,
          status: "success",
        });
      });
  };

  deleteArticle = (id) => {
    swal({
      title: "Estás seguro?",
      text: "Borrarás permanentemente tu artículo",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(this.url + "article/" + id).then((res) => {
          this.setState({
            article: res.data.article,
            status: "deleted",
          });

          swal(
            "Articulo borrado",
            "El articulo ha sido borrado correctamente",
            "success"
          );
        });
      } else {
        swal("Tranquilo!! ",
      "No se ha borrado nada",
      "success"
        );
      }
    });

    /*
  axios.delete(this.url + "article/" + id)
      .then (res => {
        this.setState({
          article: res.data.article,
          status: "deleted",
      });
      
      
      swal("Articulo borrado",
      "El articulo ha sido borrado correctamente",
      "success"
  );

}); */
  };

  render() {
    if (this.state.status === "deleted") {
      return <Navigate to="blog" />;
    }

    var article = this.state.article;
    return (
      <div className="center">
        <section id="content">
          {this.state.article && (
            <article className="article-item article-detail">
              <div className="image-wrap">
                {article.image !== null ? (
                  <img
                    src={this.url + "get-image/" + article.image}
                    alt={article.title}
                  />
                ) : (
                  <img src={Imagedefault} alt={article.title} />
                )}
              </div>

              <h1 className="subheader">{article.title}</h1>
              <span className="date">
                <Moment locale="es" fromNow>
                  {article.date}
                </Moment>
              </span>
              <p>{article.content}</p>

              <button onClick={() => {
                  this.deleteArticle(article._id);
                }}
                className="btn btn-danger"
              
                Eliminar
                >
              </button>
              <Link to={"/blog/editar/"+article._id} className="btn btn-warning">
                Editar
              </Link>

              <div className="clearfix"></div>
            </article>
          )}
          {!this.state.article && this.state.staus === "success" && (
            <div id="article">
              <h2 className="subheader">El articulo no existe</h2>
              <p>Intentalo más tarde</p>
            </div>
          )}
          {!this.state.status == null && (
            <div id="article">
              <h2 className="subheader">Cargando...</h2>
              <p>Espere unos segundos</p>
            </div>
          )}
        </section>

        <Sidebar />
      </div>
    );
  }
}

export default Article;
