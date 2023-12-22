import React, { Component } from "react";
import Pelicula from "./pelicula";
import MensajeEstatico from "./MensajeEstatico";
import Slider from "./slider";
import Sidebar from "./Sidebar";
class Peliculas extends Component {
  state = {};

  cambiarTitulo = () => {
    var { peliculas } = this.state;
    //var random = Math.floor(Math.random() * 3)
    peliculas[0].titulo = "Batman Begins";

    this.setState({
      peliculas: peliculas,
    });
  };

  favorita = (pelicula, indice) => {
    console.log("FAVORITA MARCADA");
    console.log(pelicula, indice);
    this.setState({
      favorita: pelicula,
    });
  };

  componentWillMount() {
    alert("Se va a montar el componente");
    this.setState({
      peliculas: [
        {
          titulo: "Birdman",
          image:
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9b139823943271.5632b6e64afb7.jpg",
        },
        {
          titulo: "Oldboy",
          image:
            "https://i.pinimg.com/736x/dd/e4/02/dde4020f60fcaae9fa8622d5964aa51d.jpg",
        },
        {
          titulo: "Ikiru",
          image:
            "https://i.pinimg.com/736x/a1/de/e5/a1dee58ac002f5010e5cec3b63cb367c.jpg",
        },
      ],
      nombre: "Tomas Giaveno",
      favorita: {},
    });
  }

  componentDidMount() {
    alert("Ya se ha montado el componente");
  }

  componentWillUnmount() {
    alert("Me voy a desmontar");
  }

  render() {
    var pStyle = {
      background: "green",
      color: "white",
      padding: "10px",
    };

    var favorita;
    if (this.state.favorita.titulo) {
      favorita = (
        <p className="favorita" style={pStyle}>
          <strong>La pelicula favorita es:</strong>
          <span>{this.state.favorita.titulo}</span>
        </p>
      );
    } else {
      favorita = <p>NO HAY PELICULA FAVORITA</p>;
    }

    return (
      <React.Fragment>
        <Slider title="Peliculas" size="slider-small" />

        <div className="center">
          <div id="content" className="peliculas">
            <h2 className="subheader">Listado de peliculas</h2>
            <p>Selección de las peliculas favoritas de {this.state.nombre}</p>
            <p>
              <button onClick={this.cambiarTitulo}>
                Cambiar titulo de Birdman
              </button>
            </p>

            {/*this.state.favorita.titulo ? (
          <p className="favorita" style={pStyle}>
            <strong>La pelicula favorita es:</strong>
            <span>{this.state.favorita.titulo}</span>
          </p>
        ) : (
            <p>NO HAY PELICULA FAVORITA</p>
        )
        */}

            {favorita}

            {/*Crear componente peliculas */}
            <div id="articles" className="peliculas">
              {this.state.peliculas.map((pelicula, i) => {
                return (
                  <Pelicula
                    key={i}
                    pelicula={pelicula}
                    indice={i}
                    marcarFavorita={this.favorita}
                  />
                );
              })}
            </div>
          </div>

          <Sidebar blog="false" />
        </div>
      </React.Fragment>
    );
  }
}

export default Peliculas;
