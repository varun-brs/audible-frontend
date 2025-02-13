import React from "react";
import { useDispatch, useSelector } from "react-redux";
const MyAudioBooks = () => {
  const bookList = useSelector((state) => state.auth.authorBookList);
  console.log(bookList);
  return (
    <div>
      {bookList.map((book, index) => {
        return (
          <div key={index} className="mt-8">
            <p>{book.book_name}</p>
            <p>{book.author_first_name}</p>
            <p>{book.author_id}</p>
            <p>{book.category}</p>
            <p>{book.language}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MyAudioBooks;
