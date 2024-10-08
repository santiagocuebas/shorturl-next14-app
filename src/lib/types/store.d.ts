import type {
	EnhancedStore,
	StoreEnhancer,
	ThunkDispatch,
	Tuple,
	UnknownAction
} from '@reduxjs/toolkit';
import type { IUser, ILink } from './global';


export type RootState = {
	user: { value: IUser | null };
	links: { value: ILink[] };
	link: { value: ILink | null };
};

export type AppDispatch = ThunkDispatch<RootState, undefined, UnknownAction>;

export type AppStore = EnhancedStore<
	RootState,
	UnknownAction,
	Tuple<[StoreEnhancer<{ dispatch: AppDispatch }>, StoreEnhancer]>
>;
