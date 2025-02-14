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
    searchAudioBookAPI: builder.query({
      query: (searchQuery) => ({
        url: `${USER_ENDPOINT}/search?q=${searchQuery}`, // Pass search query as query parameter
        method: "GET",
      }),
    }),
    updateAudioBook: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `${USER_ENDPOINT}/editaudiobooks/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
    }),
    // Delete audiobook
    deleteAudioBookApi: builder.mutation({
      query: (bookId) => ({
        url: `${USER_ENDPOINT}/deleteaudiobooks/${bookId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAudioBookRegisterAPIMutation,
  useGetAudioBookAPIQuery,
  useSearchAudioBookAPIQuery,
  useUpdateAudioBookMutation,
  useDeleteAudioBookApiMutation,
} = audioBookAPISlice;
