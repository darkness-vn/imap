import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  auth: {
    username: string,
    _id: string
  } | null
}

const initialState: AuthState = {
  auth: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string, _id: string }>) => {
      state.auth = action.payload
    },
    logout: (state) => {
      state.auth = null
    }
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer