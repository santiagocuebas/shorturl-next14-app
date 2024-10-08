import type { AppDispatch, AppStore, RootState } from '../types/store';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { userSlice } from './user-store';
import { linksSlice } from './links-store';
import { linkSlice } from './link-store';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
      links: linksSlice.reducer,
      link: linkSlice.reducer
    }
  })
};

export const useAppStore = useStore.withTypes<AppStore>();

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();

export const { changeUsername, resetUser, setUser } = userSlice.actions;

export const {
  addLink,
  deleteLink,
  clickLink,
  editLink,
  resetLinks,
  setLinks
} = linksSlice.actions;

export const { resetLink, setLink } = linkSlice.actions;
