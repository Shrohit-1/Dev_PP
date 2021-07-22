import React, { Component } from 'react';
import Movie from "../Movie/Movie"
import "./Favourite.css"

class Favourite extends Component {
    state = {  }
    render() { 
        console.log(this.props.location.state);
        return ( 
             <div className="favourites">
                {this.props.location.state.map((movieObject) => {
                     return <Movie key={movieObject.id} movie={movieObject}></Movie>;
                 })}
             </div>
         );
    }
}
 
export default Favourite;