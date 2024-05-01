import React, { useState } from "react";
import { gql, useQuery } from '@apollo/client'
// import { FIND_PERSON } from "../actions/personsActions.js";

const Book = ({ book }) => {
  return (
    <tr key={book.id}>
      <td>{book.title}</td>
      <td>{book.author && book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )
}

const BooksDetails = ({ books }) => {
  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BooksDetails;
