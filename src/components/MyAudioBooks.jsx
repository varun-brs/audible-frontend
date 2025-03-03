import React from "react";
import { useDispatch, useSelector } from "react-redux";

const MyAudioBooks = () => {
  const bookList = useSelector((state) => state.auth.authorBookList);

  if (bookList.length === 0) {
    return <p>No audio books available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
      {bookList.map((book, index) => (
        <div
          key={index}
          className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
        >
          <div className="font-bold text-xl mb-2">{book.book_name}</div>
          <p className="text-gray-700 text-base mb-4">{book.category}</p>
          <p className="text-gray-500 text-sm">
            Author: {book.author_first_name}
          </p>
          <p className="text-gray-500 text-sm">Language: {book.language}</p>
        </div>
      ))}
    </div>
  );
};

export default MyAudioBooks;
