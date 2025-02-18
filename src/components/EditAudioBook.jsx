import React, { useState } from "react";
import { useSearchAudioBookAPIQuery } from "../store/audioBooks/audioBookApiSlice";
import { useNavigate } from "react-router-dom";

const EditAudioBook = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchAudioBookAPIQuery(query, {
    skip: !query, // Skip the request if searchQuery is empty
  });

  const handleClick = (ele) => {
    navigate(`/edit-page/${ele._id}`, { state: { book: ele } });
  };

  return (
    <>
      <div className="flex justify-center mt-2.5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {data && Array.isArray(data) && data.length > 0 ? (
          data.map((ele, index) => {
            return (
              <div
                key={index}
                className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 cursor-pointer hover:shadow-xl hover:scale-105 transition-transform transition-shadow duration-300 ease-in-out"
                onClick={() => handleClick(ele)}
              >
                <div className="font-bold text-xl mb-2">{ele.book_name}</div>
                <p className="text-gray-700 text-base mb-4">{ele.category}</p>
                <p className="text-gray-500 text-sm">
                  Author: {ele.author_first_name}
                </p>
                <p className="text-gray-500 text-sm">
                  Language: {ele.language}
                </p>
              </div>
            );
          })
        ) : (
          <p>No data available or loading...</p> // Optionally display a message when there's no data
        )}
      </div>
    </>
  );
};

export default EditAudioBook;
