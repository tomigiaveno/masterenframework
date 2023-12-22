import React from "react";
import { useParams } from "react-router-dom";
const NombreApellidowrapped = (props)=> {
   const params = useParams();
  var nombre = params.nombre;
  var apellidos = params.apellidos;
  return (
    <div id="content">
      <h1 class="subheader">Pagina de prueba</h1>
      <h2>
        {nombre && !apellidos && <React.Fragment>{nombre}</React.Fragment>}
        {nombre && apellidos && (
          <React.Fragment>
            {nombre} {apellidos}
          </React.Fragment>
        )}
      </h2>
    </div>
  );
};


export default NombreApellidowrapped;
