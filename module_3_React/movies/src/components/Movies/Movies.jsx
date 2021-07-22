import React, { Component } from "react";
import Movie from "../Movie/Movie";
import "./Movies.css"

class Movies extends Component {
  state = {};
  render() {
    let favmovies=this.props.favmovies;

    return (
      <div className="movies">
        {this.props.movies.map((movieObject) => {
          let send={...movieObject,isliked:false};
          return <Movie key={movieObject.id} movie={send} favmovies={favmovies}></Movie>;
        })}
      </div>
    );
  }
}

export default Movies;