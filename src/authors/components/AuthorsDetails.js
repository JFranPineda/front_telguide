import React, { useState } from "react";
import { gql, useQuery } from '@apollo/client'
// import { FIND_PERSON } from "../actions/personsActions.js";

const Author = ({ author }) => {
  return (
    <tr key={author.id}>
      <td>{author.name}</td>
      <td>{author.born}</td>
      <td>{author.bookCount}</td>
    </tr>
  )
}

const AuthorsDetails = ({ authors }) => {
  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((author) => (
            <Author key={author.id} author={author} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AuthorsDetails;
