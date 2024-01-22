import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addActiveUser: (state, action) => {
      state.activeUser = action.payload;
      console.log('state.activeUser', state.activeUser);
    },
    clearActiveUser: (state, action) => {
      state.activeUser = null;
      console.log('state.activeUser', state.activeUser);
    },
  },
});

export const { addActiveUser, clearActiveUser } = userSlice.actions;

export default userSlice.reducer;
