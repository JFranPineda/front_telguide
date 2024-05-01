import { useState } from "react"
import AuthorsDetails from "./AuthorsDetails.js"
import { ALL_AUTHORS } from "../actions/authorsActions.js"
import { useQuery } from "@apollo/client"
import BirthForm from "./BirthForm.js"
import Notify from '../../components/Notify.js'

const Authors = ({ show = false }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  if (!show) {
    return null
  }
  
  if (result.loading)  {
    return <div>loading...</div>
  }

  const notifyAuthor = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return (
    <div>
      <AuthorsDetails authors={result.data.allAuthors} />
      <BirthForm authors={result.data.allAuthors} setError={notifyAuthor}/>
      <Notify errorMessage={errorMessage} />
    </div>
  )
}

export default Authors