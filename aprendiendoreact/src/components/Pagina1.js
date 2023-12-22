import React, { Component } from "react";
import MiComponente from "./MiComponente";
class Pagina1 extends Component {
  render() {
    return (
      <div>
        <React.Fragment>
          <h1>Hola mundo desde la ruta: PAGINA 1</h1>
          <MiComponente saludo="Hola Amigo" />
        </React.Fragment>
      </div>
    );
  }
}

export default Pagina1;
