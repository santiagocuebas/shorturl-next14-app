import type { PayloadAction } from '@reduxjs/toolkit';
import type { ILink, IPartialLink } from '../types/global';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { value: ILink[] } = { value: [] };

export const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
		addLink: (state, action: PayloadAction<ILink>) => {
			state.value = [action.payload, ...state.value];
		},
		editLink: (state, action: PayloadAction<IPartialLink>) => {
			state.value = state.value.map(link => {
				if (link.id === action.payload.id) {
					link.original_url = action.payload.url;
					link.short_url = action.payload.short;
					link.description = action.payload.description;
				}

				return link;
			});
		},
		deleteLink: (state, action: PayloadAction<string>) => {
			state.value = state.value.filter(link => link.short_url !== action.payload);
		},
		clickLink: (state, action: PayloadAction<string>) => {
			state.value = state.value.map(link => {
				if (link.id === action.payload) link.click_count += 1;

				return link;
			});
		},
		setLinks: (state, action: PayloadAction<ILink[]>) => {
			state.value = action.payload;
		},
		resetLinks: () => initialState
  }
});
