import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { createAuthorizationHeader } from '@/utils/cookies'

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
        url: '/get-user',
      }),
    }),

    updateUserProfileRequest: builder.mutation<
      {
        success: boolean
        message: string
        lastname: string
        firstname: string
      },
      { firstname: string; lastname: string }
    >({
      query: ({ firstname, lastname }) => ({
        url: '/update-profile',
        method: 'PUT',
        body: { firstname, lastname },
      }),
    }),
    updateUserProfileImageRequest: builder.mutation<
      { success: boolean; message: string; url: string },
      { file: any }
    >({
      query: ({ file }) => {
        const formData = new FormData()
        // Append the file to the formData
        formData.append('Content-Type', file.type)
        formData.append('image', file)
        return {
          url: `/update-profile-image`,
          method: 'PUT',
          body: formData,
        }
      },
    }),
    getUserMetrics: builder.query<any, void>({
      query: () => '/get-metrics',
    }),
    getAdminMetrics: builder.query<any, void>({
      query: () => '/admin-metrics',
    }),
    fetchAllUsersRequest: builder.query<any, number>({
      query: (page) => ({
        url: `/get-users?page=${page}`,
      }),
    }),
    fetchAllUsersNoPagesRequest: builder.query<any, void>({
      query: () => ({
        url: `/get-users-no-pages`,
      }),
    }),
    addProfitToUserRequest: builder.mutation<
      { success: boolean },
      { amount: number; user: string }
    >({
      query: ({ amount, user }) => ({
        url: '/add-profit',
        method: 'PUT',
        body: { amount, user },
      }),
    }),
    suspendUserRequest: builder.mutation<
      { success: boolean; message: string },
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: '/suspend-user',
        method: 'PUT',
        body: { userId },
      }),
    }),
    unsuspendUserRequest: builder.mutation<
      { success: boolean; message: string },
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: '/unsuspend-user',
        method: 'PUT',
        body: { userId },
      }),
    }),
  }),
})

export const {
  useFetchLoggedInUserRequestQuery,
  useUpdateUserProfileRequestMutation,
  useGetUserMetricsQuery,
  useUpdateUserProfileImageRequestMutation,
  useLazyFetchAllUsersRequestQuery,
  useFetchAllUsersRequestQuery,
  useGetAdminMetricsQuery,
  useFetchAllUsersNoPagesRequestQuery,
  useAddProfitToUserRequestMutation,
  useSuspendUserRequestMutation,
  useUnsuspendUserRequestMutation,
} = userApi
export default userApi
