
function ListOfMovies({ movies }) {
  return (
    <ul className='movies'>
      {
        movies.map(movie => (
          <li className='movie' key={movie.id}>
            <div>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
            </div>
            <div>
              <img src={movie.image} alt={movie.title} />
            </div>
          </li>
        ))
      }
    </ul>
  )
}

function NoMoviesResults() {
  return (
    <p className='no-results'>No se encontraron resultados</p>
  )
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResults />
  )
}