import { createSlice } from '@reduxjs/toolkit'

type userSliceType = {
  email: string
  firstname: string
  lastname: string
  profit: number
  _id: string
  is_admin: boolean
  createdAt: string
  profile: string
}

const initialState: userSliceType = {
  email: '',
  firstname: '',
  lastname: '',
  profit: 0.0,
  _id: '',
  is_admin: false,
  createdAt: '',
  profile: '',
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setData: (state, action) => {
      return { ...state, ...action.payload }
    },
    logout: () => {
      return initialState
    },
  },
})

export const useUserSlice = (state: any) => state.user
export const { setData, logout } = userSlice.actions

export default userSlice.reducer
