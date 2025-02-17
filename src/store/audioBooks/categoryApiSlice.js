import { apiSlice } from "../apiSlice";

const CATEGORY_ENDPOINT = "/api/categories";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: `${CATEGORY_ENDPOINT}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApiSlice;
