import './App.css'
import { useCallback, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovie } from './hoock/useMovie'
import { useSearch } from './hoock/useSearch'
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort] = useState(false)

  const { error, setError, search, updateSearch } = useSearch()
  const { movies, getMovie, loading } = useMovie({ search, sort })

  const debouncedGetMovie = useCallback(
    debounce(search => {
      getMovie({ search })
    }, 500),
    [getMovie]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    // no controlado osea a travez del DOM
    // const fields = new FormData(e.target)
    // const query = fields.get('query')

    // recuperar varios imputs
    // const { query } = Object.fromEntries(new window.FormData(e.target))
    getMovie({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (e) => {
    // controlado por react
    // if (newQuery.startsWith(' ')) return
    const newSearch = e.target.value.trim()
    updateSearch(newSearch)
    debouncedGetMovie(newSearch)
    setError(null)
  }

  return (
    <div className="page">
      <header>
        <h1>Bucador de peliculas</h1>
        <form onSubmit={handleSubmit} className='form' >
          <input
            onChange={handleChange}
            name='query'
            placeholder='Avengers, Star Wars, The Matrix ...'
            value={search}
          />
          <input
            className={movies?.length > 0
              ? 'sort-checked'
              : 'sort'}
            type="checkbox"
            onChange={handleSort}
            checked={sort}
          />
          <button>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading
            ? <p>Cargando...</p>
            : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
