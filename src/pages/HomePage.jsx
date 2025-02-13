import React from "react";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../store/user/authSlice";
import { useGetUserProfileAPIQuery } from "../store/user/userApiSlice";
import { useState, useEffect } from "react";
// import { useGetAudioBookAPIQuery } from "../store/audioBooks/audioBookApiSlice";
// import { getAuthorBookList } from "../store/user/authSlice";

const HomePage = () => {
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
    <>
      <h1 className="mt-6">homepage</h1>
    </>
  );
};

export default HomePage;
