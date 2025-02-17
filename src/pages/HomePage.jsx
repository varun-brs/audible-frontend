import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../store/user/authSlice";
import { useGetUserProfileAPIQuery } from "../store/user/userApiSlice";
import { useGetAudioBooksByCategoryAPIQuery } from "../store/audioBooks/audioBookApiSlice"; // Import the new API
import { useGetCategoriesQuery } from "../store/audioBooks/categoryApiSlice";
import AllAudioBooks from "../components/AllAudioBooks.jsx";
import { Link } from "react-router-dom";
import CategoryBooks from "../components/CategoryBooks";
import { useAllAudioBooksApiQuery } from "../store/audioBooks/audioBookApiSlice";

const HomePage = () => {
  const [selectedPage, setSelectedPage] = useState("create");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();
  const { data: userProfileData, refetch: refetchUserProfileData } =
    useGetUserProfileAPIQuery();
  const { data: categories, refetch: refetchCategories } =
    useGetCategoriesQuery();

  // Check if selectedCategory is not null before calling the API
  const {
    data: categoryAudioBooks,
    isLoading,
    isError,
  } = selectedCategory
    ? useGetAudioBooksByCategoryAPIQuery(selectedCategory)
    : { data: [], isLoading: false, isError: false };

  const safeCategoryAudioBooks = categoryAudioBooks ?? [];

  // Fetch all audio books when no category is selected
  const {
    data: allAudioBooks,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = selectedCategory
    ? { data: [], isLoading: false, isError: false }
    : useAllAudioBooksApiQuery();

  const safeAllAudioBooks = allAudioBooks ?? [];

  useEffect(() => {
    if (userProfileData) {
      dispatch(setUserProfile({ ...userProfileData }));
    }
  }, [userProfileData]);

  useEffect(() => {
    refetchUserProfileData();
    refetchCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId); // Set the selected category
    setSelectedPage("create"); // Optionally reset the page to 'create'
  };

  const handleAllAudioBooksClick = () => {
    setSelectedCategory(null); // Reset the selected category to null
    setSelectedPage("create"); // Optionally reset the page to 'create'
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading audio books.</p>;
  }

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
            onClick={handleAllAudioBooksClick} // Handle All Audio Books click
          >
            All Audio Books
          </Link>

          {/* Categories Dropdown */}
          {/* <div className="relative">
            <select
              className="block w-full px-4 py-2 rounded text-white bg-black"
              onChange={(e) => handleCategoryChange(e.target.value)}
              value={selectedCategory || ""}
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div> */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto h-full text-black">
        {selectedCategory ? (
          <CategoryBooks audioBooks={safeCategoryAudioBooks} />
        ) : (
          <AllAudioBooks audioBooks={safeAllAudioBooks} />
        )}
      </main>
    </div>
  );
};

export default HomePage;
