import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeOrder: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
      console.log('state.activeOrder', state.activeOrder);
    },
    clearActiveOrder: (state, action) => {
      state.activeOrder = null;
      console.log('state.activeOrder', state.activeOrder);
    },
  },
});

export const { addActiveOrder, clearActiveOrder } = orderSlice.actions;

export default orderSlice.reducer;
