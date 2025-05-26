import { useEffect, useState } from "react"

export function useSearch () {
    const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (search === '') {
      // setError("no se puede buscar una pelicula vacia")
      return
    }

    if (search.match(/^\d+$/)) {
      setError("no se puede buscar una pelicula con solo numeros")
      return
    }

    if (search.length < 3) {
      setError("no se puede buscar una pelicula con menos de 3 caracteres")
      return
    }

    // setError(null)
  }, [search])

  return {
    search,
    updateSearch,
    error,
    setError
  }
}