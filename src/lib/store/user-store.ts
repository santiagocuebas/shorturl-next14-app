import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser, IUserWithLinks } from '../types/global';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { value: IUser | null } = { value: null };

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		changeUsername: (state, action: PayloadAction<string>) => {
			if (state.value) state.value.username = action.payload;
		},
		setUser: (state, action: PayloadAction<IUserWithLinks>) => {
			state.value = {
				id: action.payload.id,
				username: action.payload.username,
				email: action.payload.email,
				created_at: action.payload.created_at
			};
		},
		resetUser: () => initialState
	}
});
