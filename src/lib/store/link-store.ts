import type { PayloadAction } from '@reduxjs/toolkit';
import type { ILink } from '../types/global';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { value: ILink | null } = { value: null };

export const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers: {
		setLink: (state, action: PayloadAction<ILink>) => {
      state.value = action.payload;
    },
		resetLink: () => initialState
  }
});
