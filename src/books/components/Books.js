import { useEffect, useState } from "react"
import BooksDetails from "./BooksDetails.js"
import { ALL_BOOKS, GET_BOOKS_BY_GENRE } from "../actions/booksActions.js"
import { useApolloClient, useQuery } from "@apollo/client"
import BookForm from "./BookForm.js"
import Notify from '../../components/Notify.js'
import BooksGenres from "./BooksGenres.js"

const Books = ({ show = false }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [genresList, setGenresList] = useState([])
  const [genre, setGenre] = useState('all-books')

  const booksByGenre = useQuery(GET_BOOKS_BY_GENRE, {
    variables: { genre: genre },
    onError: (error) => {
      console.log('error.graphQLErrors: ', error)
      const messages = error.graphQLErrors && error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    },
    onCompleted: (data) => {
      if (genre === 'all-books') {
        const allBooks = data?.advancedSearch || []  
        const uniqueGenresSet = new Set();
        allBooks.forEach(book => {
          book && book.genres && book.genres.forEach(g => {
            uniqueGenresSet.add(g);
          });
        });
        const uniqueGenresArray = Array.from(uniqueGenresSet);
        setGenresList([...uniqueGenresArray])
      }
    }
  });

  useEffect(() => {
    booksByGenre.refetch({ genre });
  }, [genre])

  if (!show) {
    return null
  }
  
  if (booksByGenre.loading)  {
    return <div>loading...</div>
  }

  const notifyBook = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return (
    <div>
      <BooksDetails books={booksByGenre.data.advancedSearch} />
      <BooksGenres genresList={genresList} setGenre={setGenre}/>
      <BookForm setError={notifyBook}/>
      <Notify errorMessage={errorMessage} />
    </div>
  )
}

export default Books