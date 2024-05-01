import { useState } from 'react'
import { ALL_BOOKS, CREATE_BOOK, GET_BOOKS_BY_GENRE, SET_CURRENT_GENRE } from '../actions/booksActions.js'
import { ALL_AUTHORS } from '../../authors/actions/authorsActions.js'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'

const BookForm = ({ setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(null)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const client = useApolloClient()

  const savedGenreData = client.readQuery({ query: SET_CURRENT_GENRE });
  const savedGenre = savedGenreData?.savedGenre || 'all-books'
  
  const [ createBook ] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors && error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    },
    update: (cache, { data }) => {
      const addedBook = data && data.addBook
      const addedAuthor = addedBook.author

      cache.updateQuery({ query: ALL_AUTHORS }, (prevData) => {
        const allAuthors = prevData.allAuthors
        const authorIndex = allAuthors.findIndex((a) => a.id === addedAuthor.id)
        const authorsList = allAuthors.filter((a) => a.id !== addedAuthor.id)
        const newAuthor = {
          ...addedAuthor,
          bookCount: 1 
        }
        if (authorIndex < 0) {
          return {
            allAuthors: [...authorsList, newAuthor]
          }
        }
        return { allAuthors: allAuthors }
      })
    },
    onCompleted: (data) => {
      const cache = client.cache
      const addedBook = data && data.addBook
      cache.updateQuery({
        query: GET_BOOKS_BY_GENRE,
        variables: { genre: savedGenre },
      }, (prevData) => {
        if (savedGenre === 'all-books') {
          return {
            ...prevData,
            advancedSearch: [...prevData.advancedSearch, addedBook]
          }
        }
        if (addedBook && addedBook.genres.includes(savedGenre)) {
          return {
            ...prevData,
            advancedSearch: [...prevData.advancedSearch, addedBook]
          }
        }
        return {
          ...prevData
        }
      })
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    console.log('add book...')
    createBook({  variables: { title, published: +published, author, genres } })
    setTitle('')
    setPublished(null)
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>Create New Book</h2>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published
          <input
            type="number"
            value={published || ""}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            Add Genre
          </button>
        </div>
        <div>Genres: {genres.join(' ')}</div>
        <button type="submit">CREATE</button>
      </form>
    </div>
  )
}

export default BookForm