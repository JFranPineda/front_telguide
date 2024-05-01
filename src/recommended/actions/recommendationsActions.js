import { gql } from '@apollo/client'

export const GET_FAVORITE_BOOKS = gql`
  query {
    getRecommendations  {
      title
      author {
        name
      }
      published
      id
    }
  }
`