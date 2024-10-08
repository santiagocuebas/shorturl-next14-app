import type { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import type { MutableRefObject } from 'react';
import type { IPropsData, ReactDispatch } from '../types/global';
import type { AppDispatch } from '../types/store';
import { useEffect } from 'react';

export function useOutClick(
	ref: MutableRefObject<HTMLDivElement | HTMLFormElement | null>,
	setVisible: ReactDispatch<boolean>
) {
	useEffect(() => {
		function handleClick(e: MouseEvent) {
			const target = e.target as HTMLElement;
	
			if (ref.current && !ref.current.contains(target)) {
				setVisible(false);
			}
		}
	
		document.addEventListener('click', handleClick, false);
	
		return () => document.removeEventListener('click', handleClick, false);
	}, [ref, setVisible]);
}

export function useOutClickForm(
	ref: MutableRefObject<HTMLDivElement | null>,
	setProps: ReactDispatch<IPropsData | null>,
	dispatch: AppDispatch,
	resetLink: ActionCreatorWithoutPayload<'link/resetLink'>,
) {
	useEffect(() => {
		function handleClick(e: MouseEvent) {
			const target = e.target as HTMLElement;
	
			if (ref.current && !ref.current.contains(target)) {
				setProps(null);
				dispatch(resetLink());
			}
		}
	
		document.addEventListener('click', handleClick, false);
	
		return () => document.removeEventListener('click', handleClick, false);
	}, [ref, setProps]);
}

