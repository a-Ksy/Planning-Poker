import { createReducer } from '@reduxjs/toolkit';
import { getKanyeQuote } from './actions';

export type KanyeState = {
  data: { quote: string };
  pending: boolean;
  error: boolean;
};

const initialState: KanyeState = {
  data: { quote: 'click that button' },
  pending: false,
  error: false,
};

export const kanyeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getKanyeQuote.pending, (state) => {
      state.pending = true;
    })
    .addCase(getKanyeQuote.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data = payload;
    })
    .addCase(getKanyeQuote.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });
});

export default kanyeReducer;
