import { Fragment, useState, createContext } from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home/Home";
import GenrePage from "./pages/GenrePage/GenrePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Header from "./components/Header/Header";
import WatchPage from "./pages/WatchPage/WatchPage";

document.title= ' Movie'
export const MovieIdContext = createContext()
function App() {
  
  const [movieId, setMovieId] = useState('')
  const [type, setType] = useState('movie')
  const [genreId, setGenreId] = useState('')
  const [page, setPage] = useState(1)
  const [genreName, setGenreName] = useState('')
  const [movieName, setMovieName] = useState('')
  const getPage = ((number) => {
    setPage(number)
})
const getMovieId = ((id) => {
  setMovieId(id)
})

const getGenreName = ((name) => {
  setGenreName(name)
})

const getMovieName = ((movieName) => {
  setMovieName(movieName)
})

const handleTypeMovie = (() => {
  setType('movie')
})

const handleTypeTv = (() => {
  setType('tv')
})

const getGenre = ((id) => {
  setGenreId(id)
})
const context= {
  movieId,
  type,
  genreId,
  page,
  movieName,
  genreName,
  getMovieId,
  getGenre,
  handleTypeTv,
  handleTypeMovie,
  getPage,
  getMovieName,
  getGenreName
}

  return (
    <Fragment>
      <Router>
      <MovieIdContext.Provider value={context}>
        <Header type={type} 
                handleTypeMovie={handleTypeMovie} 
                handleTypeTv={handleTypeTv}
                getPage={getPage}
                page={page}
                getMovieName={getMovieName}
                onGetGenre={getGenre}/>
          <Routes>
            <Route 
              path='/' 
              element={
              <Home 
                type={type} 
                handleTypeMovie={handleTypeMovie} 
                handleTypeTv={handleTypeTv}
                onGetGenre={getGenre}
                getMovieId={getMovieId}
              />}
            />
            <Route path={`/type=:typeURL/genre=:genreIdURL/page=:pageURL`} element={<GenrePage type={type} page={page} getPage={getPage} genreId={genreId}/>}/>
            <Route path={`/type=:typeURL/search=:searchURL`} element={<SearchPage movieName={movieName}/>}/>
            <Route path={`/type=:typeURL/id=:movieIdURL`} element={<WatchPage type={type} movieId={movieId}/>}/>
          </Routes>
      </MovieIdContext.Provider>
      </Router>
    </Fragment>
  )
}

export default App;
