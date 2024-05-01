import { useState } from "react"
import RecommendationsDetails from "./RecommendationsDetails.js"
import { GET_FAVORITE_BOOKS } from "../actions/recommendationsActions.js"
import { useQuery } from "@apollo/client"

const Recommendations = ({ show = false }) => {
  const result = useQuery(GET_FAVORITE_BOOKS)

  if (!show) {
    return null
  }
  
  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <RecommendationsDetails books={result.data.getRecommendations} />
    </div>
  )
}

export default Recommendations