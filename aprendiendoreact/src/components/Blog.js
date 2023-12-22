import React, { Component } from "react";
import Slider from "./slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";

class Blog extends Component {
  state = {
    articles: {},
    status: null,
  };

  render() {
    

    return (
      <div id="blog">
        <Slider title="Blog" size="slider-small" />
        <div className="center">
          <div id="content">
            {/*Listado de articulos que vendrán de la API REST de Node*/}
         <Articles />
         </div>

          <Sidebar blog="true" />
        </div>
      </div>
    );
  }
}

export default Blog;
