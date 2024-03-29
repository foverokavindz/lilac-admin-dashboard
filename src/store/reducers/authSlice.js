import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart: (state, action) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userSignOut: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { signInFailure, signInStart, signInSuccess, userSignOut } =
  authSlice.actions;

export default authSlice.reducer;
