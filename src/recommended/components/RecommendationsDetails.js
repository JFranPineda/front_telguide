import React from "react";

const Recommendation = ({ book }) => {
  return (
    <tr key={book.id}>
      <td>{book.title}</td>
      <td>{book.author && book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )
}

const RecommendationsDetails = ({ books }) => {
  return (
    <div>
      <h2>Recommendations</h2>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books && books.map((book) => (
            <Recommendation key={book.id} book={book} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendationsDetails;
