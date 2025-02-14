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
        {/* <button
        
        className="px-4 py-2 added-sidebar  text-white rounded-r-lg hover:bg-green-600 focus:outline-none"
      >
        Search
      </button> */}
      </div>
      <div>
        {data && Array.isArray(data) && data.length > 0 ? (
          data.map((ele, index) => {
            return (
              <div
                key={index}
                className="mt-8 hover:bg-gray-300"
                onClick={() => handleClick(ele)}
              >
                <p>{ele.book_name}</p>
                <p>{ele.author_first_name}</p>
                <p>{ele.author_id}</p>
                <p>{ele.category}</p>
                <p>{ele.language}</p>
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
