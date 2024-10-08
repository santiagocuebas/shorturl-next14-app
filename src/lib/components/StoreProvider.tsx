'use client';

import type { ITheme } from 'styled-components';
import type { AppStore } from '../types/store';
import type { StoreProps } from '../types/props';
import { redirect } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { deleteCookie } from 'cookies-next';
import { darkTheme, ligthTheme } from '../dictionary';
import { MainLayout, Nav } from '../components';
import { loadToken } from '../services';
import { makeStore } from '../store';

export default function StoreProvider({ children, data }: StoreProps) {
	const storeRef = useRef<AppStore>();
	const [theme, setTheme] = useState<ITheme>(ligthTheme);

	if (!storeRef.current) {
		storeRef.current = makeStore();
	}

	useEffect(() => {
		if (data) loadToken(data.token);
		else {
			deleteCookie('authenticate', { path: '', maxAge: 0, sameSite: 'strict' });
			if (location.pathname !== '/auth' && location.pathname !== '/') {
				redirect('/auth');
			}
		}
	}, []);

	useEffect(() => {
		const theme = localStorage.getItem('data-theme');
		setTheme(theme === null || theme === 'ligth-theme' ? ligthTheme : darkTheme);
	}, []);

	return (
		<Provider store={storeRef.current}>
			<ThemeProvider theme={theme}>
				<Nav rawUser={data?.user} setTheme={setTheme} />
				<MainLayout>
					{children}
				</MainLayout>
			</ThemeProvider>
		</Provider>
	);
}
