import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Beat } from "../types";

const apiEnv = process.env.REACT_APP_API_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: apiEnv }),
  tagTypes: ["Beat"], // Used for automatic cache invalidation
  endpoints: (builder) => ({
    // ----------------- PUBLIC ENDPOINTS -----------------
    getBeats: builder.query<Beat[], void>({
      query: () => "/",
      providesTags: ["Beat"],
    }),
    getBeatById: builder.query<Beat, string>({
      query: (id) => `/track/${id}`,
      providesTags: (result, error, id) => [{ type: "Beat", id }],
    }),

    // ----------------- ADMIN ENDPOINTS -----------------
    getAdminBeats: builder.query<Beat[], void>({
      query: () => "/admin",
      providesTags: ["Beat"],
    }),
    getAdminBeatById: builder.query<Beat, string>({
      query: (id) => `/admin/${id}`,
      providesTags: (result, error, id) => [{ type: "Beat", id }],
    }),
    createBeat: builder.mutation<Beat, Partial<Beat>>({
      query: (newBeat) => ({
        url: "/admin",
        method: "POST",
        body: newBeat,
      }),
      invalidatesTags: ["Beat"],
    }),
    updateBeat: builder.mutation<Beat, { id: string; updates: Partial<Beat> }>({
      query: ({ id, updates }) => ({
        url: `/admin/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Beat", id }, "Beat"],
    }),
    deleteBeat: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Beat"],
    }),
  }),
});

export const {
  useGetBeatsQuery,
  useGetBeatByIdQuery,
  useGetAdminBeatsQuery,
  useGetAdminBeatByIdQuery,
  useCreateBeatMutation,
  useUpdateBeatMutation,
  useDeleteBeatMutation,
} = apiSlice;
