import React, {Component} from "react";
import Slider from "./slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";
class Home extends Component{
    
    render(){

        return (
            <div id="home">
                
            <Slider
          title="Bienvenido al curso de React para Javascript con Tomas Giaveno"
          btn="Ir al blog"
          size="slider-big"
        />
        <div className="center">
        <div id="content">
                <h1 className="subheader">Ultimos articulos</h1>
            <Articles 
            home="true"
            />
            </div>

            <Sidebar />
        </div>
            
            </div>
        );
    }
}

export default Home;