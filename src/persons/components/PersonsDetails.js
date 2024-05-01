import React, { useState } from "react";
import { gql, useQuery } from '@apollo/client'
import { FIND_PERSON } from "../actions/personsActions.js";

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  )
}

const PersonsDetails = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null)
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  })

  const getResultsFilter = () => {
    if (nameToSearch && result.data) {
      return (
        <Person
          person={result.data.findPerson}
          onClose={() => setNameToSearch(null)}
        />
      )
    }
    return null
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>
            show address
          </button>
        </div>
      )}
      {getResultsFilter()}
    </div>
  )
}

export default PersonsDetails;
