import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem("userdata")) || null;
const token = JSON.parse(localStorage.getItem("token")) || null;
const rawUserData = localStorage.getItem("authorBookList");
const searchrawData = localStorage.getItem("searchAudioBookList");
const allrawData = localStorage.getItem("allAudioBooks");
const authorBookList =
  rawUserData && rawUserData !== "undefined" ? JSON.parse(rawUserData) : null;
const searchAudioBookList =
  searchrawData && searchrawData !== "undefined"
    ? JSON.parse(searchrawData)
    : null;
const allAudioBooks =
  allrawData && allrawData !== "undefined" ? JSON.parse(allrawData) : null;
// const authorBookList = JSON.parse(localStorage.getItem("authorBookList")) || [];

const initialState = {
  token,
  isLoggedIn: !!token,
  userData,
  authorBookList,
  searchAudioBookList,
  allAudioBooks,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.token = null;
      state.userData = null;
      state.authorBookList = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userdata");
      localStorage.removeItem("authorBookList");
      localStorage.removeItem("searchAudioBookList");
      state.isLoggedIn = false;
    },
    setUserProfile: (state, action) => {
      state.userData = action.payload.profileData;
      localStorage.setItem(
        "userdata",
        JSON.stringify(action.payload.profileData)
      );
    },
    getAuthorBookList: (state, action) => {
      state.authorBookList = action.payload;
      localStorage.setItem("authorBookList", JSON.stringify(action.payload));
      console.log(state.authorBookList);
    },
    searchAudioBooks: (state, action) => {
      state.authorBookList = action.payload;
      localStorage.setItem(
        "searchAudioBookList",
        JSON.stringify(action.payload)
      );
    },
    deleteAudioBook: (state, action) => {
      const updatedBookList = state.authorBookList.filter(
        (book) => book._id !== action.payload
      );
      state.authorBookList = updatedBookList;
      localStorage.setItem("authorBookList", JSON.stringify(updatedBookList));
    },
    allAudioBooks: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("allAudioBooks", JSON.stringify(action.payload));
    },
    // updateUserProfile: (state, action) => {
    //   state.userData = { ...userData, ...action.payload };
    //   localStorage.setItem("userdata", JSON.stringify(state.userData));
    // },
    // toggleLanguageSelection: (state, action) => {
    //   const langugageId = action.payload;
    //   const index = state.userData.languages.indexOf(langugageId);
    //   if (index === -1) {
    //     state.userData.languages.push(langugageId);
    //   } else {
    //     state.userData.languages.splice(index, 1);
    //   }
    //   const updatedData = { ...userData, languages: state.userData.languages };
    //   localStorage.setItem("userdata", JSON.stringify(updatedData));
    // },
    // toggleSidebar: (state) => {
    //   state.isSidebarOpen = !state.isSidebarOpen;
    // },
    // setStoryInfo: (state, action) => {
    //   (state.storyInfo.id = action.payload.s_id),
    //     (state.storyInfo.name = action.payload.s_name);
    // },
    // updateSpotifyToken: (state, action) => {
    //   state.spotifyToken = action.payload.spotifyToken.access_token;
    //   localStorage.setItem(
    //     "spotifytoken",
    //     JSON.stringify(action.payload.spotifyToken.access_token)
    //   );
    // },
  },
});

export const {
  login,
  logout,
  setUserProfile,
  getAuthorBookList,
  searchAudioBooks,
  deleteAudioBook,
  //   updateUserProfile,
  //   toggleLanguageSelection,
  //   toggleSidebar,
  //   setStoryInfo,
  //   updateSpotifyToken,
} = authSlice.actions;

export default authSlice.reducer;
