import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { createAuthorizationHeader } from '@/utils/cookies';

const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/contacts`,
    prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),

  endpoints: (builder) => ({

    postANewContactMessage: builder.mutation<{ success: boolean, message: string }, { email: string; message: string, type: string, name: string }>({
      query: ({ email, message, type, name }) => ({
        url: ``,
        method: 'POST',
        body: { email, message, type, name }
      }),

    }),

  })
})

export const { usePostANewContactMessageMutation } = contactsApi
export default contactsApi