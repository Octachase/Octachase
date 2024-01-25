import { createSlice } from '@reduxjs/toolkit'

type userSliceType = {
  email: string,
  firstname: string,
  lastname: string,
  balance: number,
  _id: string,
  is_admin: boolean,
  createdAt: string,
  profile: string
}

const initialState: userSliceType = {
  email: '',
  firstname: '',
  lastname: '',
  balance: 0.00,
  _id: '',
  is_admin: false,
  createdAt: '',
  profile: ''
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
    setBalance: (state, action) => {
      state.balance = action.payload
    },


  }
})

export const useUserSlice = (state: any) => state.user
export const { setData, logout, } = userSlice.actions

export default userSlice.reducer