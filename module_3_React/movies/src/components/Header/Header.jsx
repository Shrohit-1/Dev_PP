import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './Header.css';
class Header extends Component {
    state = { 
        newMovieName:"",
     }

    handleOnChange=(e)=>{
        let data=e.target.value;
        this.setState({
            newMovieName:data,
        })
    } 

    handleKeyPress=(e)=>{
        if(e.key==="Enter"){
            this.props.setMovies(this.state.newMovieName);
        }
    }
    
    render() { 
      console.log(this.props.liked);
      let favmovies=this.props.favmovies;
        return (  
            <div className="header">
            <div className="logo">
              <img src="logo.svg" alt="" />
            </div>
            <div className="search-btn">
              <input
                className="search-movies"
                value={this.state.newMovieName}
                type="text"
                placeholder="Search"
                onChange={this.handleOnChange}
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <div className="header-links">
              <div className="header-link">
                <Link to="/">Home</Link>
              </div>
              <div className="header-link">
                <Link to={{ pathname: "/fav", state: this.props.liked }}>Favourite</Link>
              </div>
            </div>
          </div>
         );
    }
}
 
export default Header;