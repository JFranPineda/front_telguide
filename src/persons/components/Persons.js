import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import PersonsDetails from './PersonsDetails.js'
import { PERSON_ADDED, ALL_PERSONS } from '../actions/personsActions.js'
import PersonForm from './PersonForm.js'
import { useState } from 'react'
import Notify from '../../components/Notify.js'
import PhoneForm from './PhoneForm.js'
import { updateCache } from '../hooks/persons.js'

const Persons = ({ show = false }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()
  
  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      console.log('person on subscription: ', data)
      const addedPerson = data?.data?.personAdded
      notifyPerson(`${addedPerson?.name} added`)
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
    }
  })

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