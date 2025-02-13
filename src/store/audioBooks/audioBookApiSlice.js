import { apiSlice } from "../apiSlice";
const USER_ENDPOINT = "/api/audiobooks";

export const audioBookAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    audioBookRegisterAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}/register`,
        method: "POST",
        body: data,
      }),
    }),
    getAudioBookAPI: builder.query({
      query: () => ({
        url: `${USER_ENDPOINT}/getaudiobooks`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAudioBookRegisterAPIMutation, useGetAudioBookAPIQuery } =
  audioBookAPISlice;
