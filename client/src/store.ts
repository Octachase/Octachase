
import { configureStore, Middleware } from "@reduxjs/toolkit";
import UserReducer from '@/slices/user.slice'
import authApi from "./apis/authApi";
import userApi from "./apis/usersApi";
import transactionsApi from "./apis/transactionsApi";
import contactsApi from "./apis/contactsApi";


const middlewares: Array<Middleware> = [
  authApi.middleware,
  userApi.middleware,
  transactionsApi.middleware,
  contactsApi.middleware
]

const makeStore = () => (
  configureStore({
    reducer: {
      user: UserReducer,
      [userApi.reducerPath]: userApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [transactionsApi.reducerPath]: transactionsApi.reducer,
      [contactsApi.reducerPath]: contactsApi.reducer
    },

    middleware: (getDefaultMiddleware: any) => (
      getDefaultMiddleware().concat(middlewares)),
  }))



export default makeStore