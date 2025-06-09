'use client'

import React, { ReactNode, useEffect } from 'react'
import makeStore from '@/store'
import { Provider, useDispatch, useSelector } from 'react-redux'

import { setData, useUserSlice } from '@/slices/user.slice'
import { useFetchLoggedInUserRequestQuery } from '@/apis/usersApi'
import Loading from '../atoms/Loading'
const store: any = makeStore()

// This is where the fetch is made
const Component = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error } = useFetchLoggedInUserRequestQuery()
  const dispatch = useDispatch()
  const user = useSelector(useUserSlice)

  useEffect(() => {
    if (!data) return
    dispatch(setData(data))
  }, [data])

  return (
    <>
      {/* Small loading indicator in corner/header */}
      {isLoading && (
        <div className="fixed top-4 right-4 z-50">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {children}
    </>
  )
}

// This calls the Component as well as wraps the Provider in the whole app
const InitialDispatch = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Component>{children}</Component>
    </Provider>
  )
}

export default InitialDispatch
