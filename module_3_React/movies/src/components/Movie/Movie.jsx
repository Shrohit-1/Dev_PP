import axios from 'axios';
import React, { Component } from 'react';
import { API_KEY, API_URL, IMAGE_URL } from '../../API/secrets';
import "./Movie.css"
import {Link} from 'react-router-dom';

class Movie extends Component {
    state = { 
      detailedMovieObj:{},
      isliked:false,
     }

    async componentDidMount(){
      let response= await axios.get(`${API_URL}/movie/${this.props.movie.id}?api_key=${API_KEY}`);
      let detailedMovie=response.data;
      let posterPath=IMAGE_URL+detailedMovie.poster_path;
      this.setState({
        detailedMovieObj: { ...detailedMovie, poster_path: posterPath }
      });
    }

    liked =()=>{
      this.props.favmovies(this.props.movie,!(this.state.isliked))
      this.setState({
        isliked:!this.state.isliked,
      })
    }

    render() { 
        let { poster_path, title, vote_average } = this.props.movie;
        let posterPath = IMAGE_URL + poster_path;
        return (  
            <div className="movie-item">
        <div className="movie-poster">
          <Link to={{ pathname: "/moviepage", state: this.state.detailedMovieObj }} >
            <img src={posterPath} alt="" />
          </Link>
        </div>
        <div className="movie-info">
          <div className="movie-title">{title}</div>
          <div className="movie-rating">{vote_average} IMDB</div>
          {this.state.isliked ? (<div className="liked" onClick={()=>{this.liked();}}><img className=" active"src="heart.png" alt="" /></div>) : (<div className="liked" onClick={()=>{this.liked();}}><img src="heart.png" alt="" /></div>)}
        </div>
      </div>
         );
    }
}
 
export default Movie;