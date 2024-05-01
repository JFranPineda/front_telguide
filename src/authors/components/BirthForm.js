import { useEffect, useState } from 'react'
import { ALL_AUTHORS, EDIT_BIRTH } from '../actions/authorsActions.js'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const BirthForm = ({ setError, authors }) => {
  const [name, setName] = useState('')
  const [newBorn, setNewBorn] = useState(null)

  const [ editBirth, result ] = useMutation(EDIT_BIRTH, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    }
  })

  const options = authors.map((a) => ({ value: a.name, label: a.name }));

  useEffect(() => {
    if(result.data && result.data.editAuthor === null) {
      setError('Author is not found...')
    }
  },[result.data])

  const submit = async (event) => {
    event.preventDefault()
    console.log('edit author birth...')
    editBirth({  variables: { name, setBornTo: +newBorn } })
    setName('')
    setNewBorn(null)
  }

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          Name
          <Select
            value={options.find(option => option.value === name)}
            name="name"
            onChange={(selectedOption) => setName(selectedOption.value)}
            options={options}
          />
        </div>
        <div>
          New Birth Year
          <input
            value={newBorn || ""}
            onChange={({ target }) => setNewBorn(target.value)}
          />
        </div>
        <button type="submit">UPDATE</button>
      </form>
    </div>
  )
}

export default BirthForm