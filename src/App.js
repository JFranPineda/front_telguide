import { useState } from 'react';
import Persons from './persons/components/Persons.js'
import Authors from './authors/components/Authors.js';
import Books from './books/components/Books.js';
import Recommendations from './recommended/components/Recommendations.js';
import Login from './login/components/Login.js';
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div><Login setToken={setToken}/></div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("recommendations")}>recommendations</button>
        <button onClick={() => setPage("persons")}>persons</button>
        <button onClick={logout}>logout</button>
      </div>
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <Recommendations show={page === "recommendations"} />
      <Persons show={page === "persons"} />
    </div>
  )
}

export default App;
