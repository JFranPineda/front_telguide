import { gql, useQuery } from '@apollo/client'
import PersonsDetails from './PersonsDetails.js'
import { ALL_PERSONS } from '../actions/personsActions.js'
import PersonForm from './PersonForm.js'
import { useState } from 'react'
import Notify from '../../components/Notify.js'
import PhoneForm from './PhoneForm.js'

const Persons = ({ show = false }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)

  if (!show) {
    return null
  }
  
  if (result.loading)  {
    return <div>loading...</div>
  }

  const notifyPerson = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return (
    <div>
      <PersonsDetails persons={result.data.allPersons}/>
      <PersonForm setError={notifyPerson}/>
      <PhoneForm setError={notifyPerson}/>
      <Notify errorMessage={errorMessage} />
    </div>
  )
}

export default Persons;