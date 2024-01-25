import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { createAuthorizationHeader } from '@/utils/cookies';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
    prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),

  endpoints: (builder) => ({
    fetchLoggedInUserRequest: builder.query<any, void>({
      query: () => ({
        url: "/get-user",
      }),
    }),

    updateUserProfileRequest: builder.mutation<{ success: boolean, message: string; lastname: string; firstname: string }, { firstname: string; lastname: string }>({
      query: ({ firstname, lastname }) => ({
        url: "/update-profile",
        method: 'PUT',
        body: { firstname, lastname }
      }),
    }),
    updateUserProfileImageRequest: builder.mutation<{ success: boolean, message: string, url: string }, { file: any }>({
      query: ({ file }) => {
        const formData = new FormData();
        // Append the file to the formData
        formData.append('Content-Type', file.type);
        formData.append('image', file);
        return {
          url: `/update-profile-image`,
          method: 'PUT',
          body: formData
        }
      }
    }),
    getUserMetrics: builder.query<any, void>({
      query: () => '/get-metrics'
    }),
    getAdminMetrics: builder.query<any, void>({
      query: () => '/admin-metrics'
    }),
    fetchAllUsersRequest: builder.query<any, number>({
      query: (page) => ({
        url: `/get-users?page=${page}`,
      }),
    }),

  })
})

export const {
  useFetchLoggedInUserRequestQuery,
  useUpdateUserProfileRequestMutation,
  useGetUserMetricsQuery,
  useUpdateUserProfileImageRequestMutation,
  useLazyFetchAllUsersRequestQuery,
  useGetAdminMetricsQuery
} = userApi
export default userApi