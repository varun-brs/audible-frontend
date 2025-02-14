import React from "react";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../store/user/authSlice";
import { useGetUserProfileAPIQuery } from "../store/user/userApiSlice";
import { useState, useEffect } from "react";
// import { useGetAudioBookAPIQuery } from "../store/audioBooks/audioBookApiSlice";
// import { getAuthorBookList } from "../store/user/authSlice";
import AllAudioBooks from "../components/AllAudioBooks.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
  // State to track selected item
  const [selectedPage, setSelectedPage] = useState("create");
  const dispatch = useDispatch();
  const { data: userProfileData, refetch: refetchUserProfileData } =
    useGetUserProfileAPIQuery();

  useEffect(() => {
    if (userProfileData) {
      dispatch(setUserProfile({ ...userProfileData }));
    }
  }, [userProfileData]);

  useEffect(() => {
    refetchUserProfileData();
  }, []);

  // Function to handle link click
  const handleLinkClick = (page) => {
    setSelectedPage(page);
  };

  // const { data: authorBookList, refetch: refetchAuthorBookList } =
  //   useGetAudioBookAPIQuery();

  // useEffect(() => {
  //   if (authorBookList) {
  //     dispatch(getAuthorBookList(authorBookList));
  //     console.log("Fetched authorBookList:", authorBookList);
  //   }
  // }, [authorBookList]);

  // useEffect(() => {
  //   refetchAuthorBookList();
  // }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 added-sidebar text-white p-4 space-y-4 overflow-y-auto h-full">
        <nav className="space-y-2 mt-7">
          <Link
            to="#"
            className={`block px-4 py-2 rounded ${
              selectedPage === "create" ? "added-sidebar-hover " : ""
            }`}
            onClick={() => handleLinkClick("create")}
          >
            All Audio Books
          </Link>
          <Link
            to="#"
            className={`block px-4 py-2 rounded ${
              selectedPage === "myAudioBooks" ? "added-sidebar-hover " : ""
            }`}
            onClick={() => handleLinkClick("myAudioBooks")}
          >
            Categories
          </Link>
          <Link
            to="#"
            className={`block px-4 py-2 rounded ${
              selectedPage === "settings" ? "added-sidebar-hover " : ""
            }`}
            onClick={() => handleLinkClick("settings")}
          >
            Edit Audio book
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto h-full text-black">
        {/* Conditional Rendering */}
        {selectedPage === "create" && (
          // <CreateAudioBook /> // Uncomment when you import the component
          <div>{<AllAudioBooks />}</div>
        )}
        {selectedPage === "myAudioBooks" && (
          // <MyAudioBooks /> // Uncomment when you import the component
          <div>{<MyAudioBooks />}</div>
        )}
        {selectedPage === "settings" && (
          // <Settings /> // Uncomment when you import the component
          <div>{<EditAudioBook />}</div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
