import React from "react";

const CategoryBooks = ({ audioBooks }) => {
  if (!Array.isArray(audioBooks)) {
    return <p>No audio books found for this category.</p>;
  }

  return (
    <div>
      <h2>Audio Books in this Category</h2>
      <ul>
        {audioBooks?.map((book) => (
          <li key={book._id}>
            <h3>{book.book_name}</h3>
            <p>{book.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryBooks;
