import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeProduct: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addActiveProduct: (state, action) => {
      state.activeProduct = action.payload;
      console.log('state.activeProduct', state.activeProduct);
    },
  },
});

export const { addActiveProduct } = productSlice.actions;

export default productSlice.reducer;
