import React, { Component } from "react";
import Header from "./components/Header/Header.jsx";
import Movies from "./components/Movies/Movies.jsx";
import Pagination from "./components/pagination/pagination.jsx";
import Favourite from "./components/Favourite/Favourite.jsx";
import MoviePage from "./components/MoviePage/MoviePage.jsx";
import axios from "axios";
import { API_KEY, API_URL } from "./API/secrets.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class App extends Component {
  state = {
    moviesData:[],
    currentMovie: "avengers",
    pages: [],
    currPage: 1,
    liked:[]
  };
  
  async componentDidMount(){

    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: this.state.currentMovie },
    });
    console.log(data);
    let moviesData = data.data.results;
    let pagesCount = data.data.total_pages; //3
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    this.setState({
      moviesData: moviesData,
      pages: pages,
    });
  }

  setMovies = async (newMovieName) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: newMovieName },
    });
    let moviesData = data.data.results;
    let pagesCount = data.data.total_pages; //3
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    this.setState({
      moviesData: moviesData,
      currentMovie: newMovieName,
      currPage:1,
      pages: pages,
      liked:[],
    });
  };

  nextPage = async(page)=>{
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: this.state.currPage+1, query: this.state.currentMovie },
    });
    let moviesData=data.data.results;
    this.setState({
      moviesData:moviesData,
      currPage: this.state.currPage+1,
    });
  }

  previousPage = async()=>{
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: this.state.currPage-1, query: this.state.currentMovie },
    });
    let moviesData=data.data.results;
    this.setState({
      moviesData:moviesData,
      currPage:this.state.currPage-1,
    });
  }

  setPage = async(page)=>{
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page:page, query: this.state.currentMovie },
    });
    let moviesData=data.data.results;
    this.setState({
      moviesData:moviesData,
      currPage:page,
    });
  }
  
  favmovies=(currmovie,isliked)=>{
    if(isliked){
      let updatedLiked=[];
      for(let i=0;i<this.state.liked.length;i++){
        updatedLiked.push(this.state.liked[i]);
      }
      updatedLiked.push(currmovie);
      this.setState({
        liked:updatedLiked,
      });
    }
    else{
      let updatedLiked = this.state.liked.filter(function(obj){
        if(obj.id===currmovie.id){
          return false;
        }
        return true;
      });
      this.setState({
        liked:updatedLiked,
      });

    }
    
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header setMovies={this.setMovies} liked={this.state.liked} favmovies={this.favmovies}></Header>

          <Switch>
            <Route path="/" exact>
            {this.state.moviesData.length ?
            ( <React.Fragment>
            <Movies movies={this.state.moviesData} favmovies={this.favmovies} ></Movies>
            <Pagination pages={this.state.pages}
                currPage={this.state.currPage}
                nextPage={this.nextPage}
                previousPage={this.previousPage}
                setPage={this.setPage}></Pagination>
            </React.Fragment>
            ):(
              <h1>Ooopss No Movies Found !!!</h1>
            )}
            </Route>
            <Route path="/fav" exact component={Favourite}></Route>
            <Route path="/moviepage" exact component={MoviePage}></Route>
          </Switch>
       </div>
     </Router>  
    );
  }
}

export default App;