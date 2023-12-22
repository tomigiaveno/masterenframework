import React, { Component } from "react";
import MiComponente from "./MiComponente";

class SeccionPruebas extends Component {
  
  

    constructor(props){
        super(props)
      console.log("esto está funcionando");
        this.state = {
          contador:1
        }
      
       this.sumar = this.sumar.bind(this)
      this.restar = this.restar.bind(this)
      }



    //var HolaMundo = () => {}
    HolaMundo(nombre, edad) {
        var presentación = (
          <div>
            <h2>Hola, soy {nombre} </h2>
            <h3>Tengo {edad} años </h3>
          </div>
        );
        return presentación;
      }

      sumar(){
//this.contador = this.contador+1;
//this.state.contador = this.state.contador + 1
  this.setState({
    contador: (this.state.contador + 1)
  });
  
    } 

      restar(){
        //this.contador = this.contador-1;
        //this.state.contador = this.state.contador - 1 
        this.setState({
            contador: (this.state.contador - 1)
          });
          
    }

    render() {
        var nombre = "Tomas Giaveno";
    return (
      <section id="content">
        <h2 className="subheader" >Funciones y JSX básico</h2>
        {this.HolaMundo(nombre, 12)}
        <p> Bienvenidos al curso de Tomás Giaveno web !!!</p>
        
        
        <h2 className="subheader" >Componentes</h2>
        <section className="componentes">
          <MiComponente />
          <MiComponente />
        </section>

        <h2 className="subheader" >Estado</h2>
      <p>
       contado: {this.state.contador + 1}
      </p>
      <p>
        <input type="button" value="Suma"  onClick= {this.sumar}/>
        <input type="button" value="Resta" onClick= {this.restar} />
      </p>
      
      </section>
    );
  }
}

export default SeccionPruebas;