import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { createAuthorizationHeader } from '@/utils/cookies';

const tradesApi = createApi({
  reducerPath: 'tradesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/trades`,
    prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  tagTypes: ['TRADES'],

  endpoints: (builder) => ({
    postANewTrade: builder.mutation<{ success: boolean, message: string }, { amount: number; type: string }>({
      query: ({ amount, type }) => ({
        url: ``,
        method: 'POST',
        body: { amount, type }
      }),
      invalidatesTags: [{ type: 'TRADES' }]
    }),

    getUserTrades: builder.query<any, void>({
      query: () => ``,
      providesTags: (result, error) => [{ type: 'TRADES' }]
    }),
    getAllTrades: builder.query<any, void>({
      query: () => `/all`,
      providesTags: (result, error) => [{ type: 'TRADES' }]
    }),

  })
})

export const { usePostANewTradeMutation, useGetUserTradesQuery, useGetAllTradesQuery } = tradesApi
export default tradesApi