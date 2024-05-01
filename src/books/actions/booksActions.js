import { gql } from '@apollo/client'

export const SET_CURRENT_GENRE = gql`
query {
  savedGenre @client
}
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      genres
      author {
        name
      }
      published
      id
    }
  }
`

export const GET_BOOKS_BY_GENRE = gql`
  query getSelectedBooks($genre: String!){
    advancedSearch(genre: $genre) {
      title
      genres
      author {
        name
      }
      published
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
        born
        bookCount
        id
      }
      published
      genres
      id
    }
  }
`