import React from 'react'
import {useEffect, useState} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard'


const API_URL = 'http://www.omdbapi.com?apikey=ec422e95'

const App = () => {


    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const movie1 = 
        {
            "Title": "The Matrix Reloaded",
            "Year": "2003",
            "imdbID": "tt0234215",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
        }

    const searchMovies = async (title) => {

        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }


    useEffect( () => {
        searchMovies('Matrix');
    }, [])

  


    return (
      <div className = "app">
          <h1>Movies</h1>

        <div className = "search">
            <input 
                placeholder="Search for movies..." 
                value={searchTerm}
                onChange = {(e) => {setSearchTerm(e.target.value)}}
                onKeyDown = {(e) => { if(e.key == 'Enter') { searchMovies(searchTerm); } } } />

            <img src={SearchIcon}
                alt="Search"
                onClick = {() => {searchMovies(searchTerm)}} />
        </div>

        {
            movies.length > 0 ? (
                <>

                <div>
                    <select >
                        {
                            movies.map((movie) => (
                                <option value={movie.Title} title = {movie.Title}>{movie.Title} </option>
                            ))
                        }
                    </select>
                </div>

                <div className = "container"> 
                {
                        movies.map((movie) => (
                            <MovieCard movie={movie} />
                    ))
                }
                </div>
                </>
            ) : 
            (
                <div className = "empty">
                    <h2>No movies found</h2>
                </div>
            )
        }
</div>



    )
}

export default App;