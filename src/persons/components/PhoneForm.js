import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from '../actions/personsActions.js'

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [ changeNumber, result ] = useMutation(EDIT_NUMBER)
  
  const submit = async (event) => {
    event.preventDefault()
    changeNumber({ variables: { name, phone } })
    setName('')
    setPhone('')
  }

  useEffect(() => {
    if(result.data && result.data.editNumber === null) {
      setError('Person is not found...')
    }
  },[result.data])

  return (
    <div>
      <h2>Change Number</h2>
      <form onSubmit={submit}>
        <div>
          Name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Phone <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type='submit'>CHANGE</button>
      </form>
    </div>
  )
}

export default PhoneForm