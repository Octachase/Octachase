import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { createAuthorizationHeader } from '@/utils/cookies';

const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/transactions`,
    prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  tagTypes: ['TRANSACTIONS', 'TRANSACTION'],

  endpoints: (builder) => ({
    postANewDepositProof: builder.mutation<{ success: boolean, message: string }, { amount: string; file: any, txnId: string }>({
      query: ({ amount, file, txnId }) => {
        const formData = new FormData();
        // Append the file to the formData
        formData.append('Content-Type', file.type);
        formData.append('image', file);
        formData.append('amount', amount)
        formData.append('txnId', txnId)
        return {
          url: `/add-deposit`,
          method: 'POST',
          body: formData
        }
      },
      invalidatesTags: [{ type: 'TRANSACTIONS' }]
    }),
    postANewWithdrawalRequest: builder.mutation<{ success: boolean, message: string }, { amount: string; address?: string, details: any, accountNumber?: string, tag?: string }>({
      query: ({ amount, address, details, accountNumber, tag }) => ({
        url: `/add-withdrawal`,
        method: 'POST',
        body: { amount, address, details, accountNumber, tag }
      }),
      invalidatesTags: [{ type: 'TRANSACTIONS' }]
    }),
    getPendingTransactions: builder.query<any, string>({
      query: (type) => `/get-pending-txns?type=${type}`
    }),
    getPendingWithdrawalRequests: builder.query<any, void>({
      query: () => `/get-pending-deposits`
    }),
    getUserTransactions: builder.query<any, { page?: number; type?: string }>({
      query: ({ page, type }) => `?page=${page}&type=${type}`,
      providesTags: (result, error, { page }) =>
        [{ type: 'TRANSACTIONS', page }]
    }),
    getATransaction: builder.query<any, { txnId: string }>({
      query: ({ txnId }) => `/${txnId}`,
      providesTags: (result, error, { txnId }) =>
        [{ type: 'TRANSACTIONS', txnId }]
    }),
    getAllTransactions: builder.query<any, { page?: number; type?: string }>({
      query: ({ page, type }) => `/all?page=${page}&type=${type}`,
      providesTags: () => [{ type: "TRANSACTIONS" }]
    }),
    moderateTxnStatus: builder.mutation<{ success: boolean, message: string }, { status: string, txnId: string }>({
      query: ({ status, txnId }) => ({
        url: `/${txnId}/status`,
        method: 'PUT',
        body: { status }
      }),
      invalidatesTags: [{ type: 'TRANSACTIONS' }]
    }),
    addFeesToATxn: builder.mutation<{ success: boolean, message: string }, { fees: number, txnId: string }>({
      query: ({ fees, txnId }) => ({
        url: `/${txnId}/fees`,
        method: 'PUT',
        body: { fees }
      }),
      invalidatesTags: [{ type: 'TRANSACTIONS' }]
    }),
  })
})

export const {
  usePostANewDepositProofMutation,
  usePostANewWithdrawalRequestMutation,
  useLazyGetUserTransactionsQuery,
  useLazyGetAllTransactionsQuery,
  useModerateTxnStatusMutation,
  useGetPendingTransactionsQuery,
  useLazyGetATransactionQuery,
  useAddFeesToATxnMutation
} = transactionsApi
export default transactionsApi