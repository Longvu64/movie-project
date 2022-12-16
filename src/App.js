import { Fragment, useState, createContext } from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home/Home";
import GenrePage from "./pages/GenrePage/GenrePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Header from "./components/Header/Header";
import DetailPage from "./pages/DetailPage/DetailPage";
import WatchPage from "./pages/WatchPage/WatchPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

document.title= ' Movie'
export const MovieIdContext = createContext()
function App() {
  const [movieId, setMovieId] = useState('')
  const [type, setType] = useState('')
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
    getGenreName,
  }

  return (
    <Fragment>
      <Router>
        <ScrollToTop/>
      <MovieIdContext.Provider value={context}>
        <Header />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path={`/type=:typeURL/genre=:genreIdURL/page=:pageURL`} element={<GenrePage type={type} page={page} getPage={getPage} genreId={genreId}/>}/>
            <Route path={`/type=:typeURL/search=:searchURL`} element={<SearchPage />}/>
            <Route path={`/type=:typeURL/id=:movieIdURL`} element={<DetailPage/>}/>
            <Route path={`/watch/type=:typeURL/id=:movieIdURL`} element={<WatchPage/>}/>
            <Route path={`/watch/type=:typeURL/id=:movieIdURL/s=:season/e=:episode`} element={<WatchPage/>}/>
          </Routes>
      </MovieIdContext.Provider>
      </Router>
    </Fragment>
  )
}

export default App;
