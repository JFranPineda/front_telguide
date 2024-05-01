import { SET_CURRENT_GENRE } from "../actions/booksActions.js"
import { useApolloClient } from "@apollo/client"

const BooksGenres = ({ genresList = [], setGenre }) => {
  const client = useApolloClient()

  const saveGenre = (newGenre) => {
    client.writeQuery({
      query: SET_CURRENT_GENRE,
      data: {
        savedGenre: newGenre
      },
    });
    setGenre(newGenre)
  }

  return (
    <div>
      <div>
        { genresList.map((genre) => (
            <button key={genre} onClick={() => saveGenre(genre)}>{genre}</button>
        ))}
        <button onClick={() => saveGenre('all-books')}>all genres</button>
      </div>
    </div>
  )
}

export default BooksGenres