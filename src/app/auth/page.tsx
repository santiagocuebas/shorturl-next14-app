'use client';

import type { IAxiosRegister } from '@/lib/types/global';
import type { MetadataProps } from '@/lib/types/props';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import axios from '@/lib/axios';
import { GITHUB_URI, GOOGLE_URI } from '@/lib/config';
import { Logo } from '@/lib/components';
import { loadToken } from '@/lib/services';
import { setLinks, setUser, useAppDispatch } from '@/lib/store';
import { Method } from '@/lib/types/enums';

function AuthPage(metadata: MetadataProps) {
	const dispath = useAppDispatch();
	const { searchParams } = metadata;
	const router = useRouter();

	async function getUserData(url: string) {
		const data: IAxiosRegister | null = await axios({ method: Method.POST, url })
			.then(res => res.data)
			.catch(err => {
				console.log(err?.message);
				return null;
			});

		if (data !== null) {
			loadToken(data.token);
			dispath(setUser(data.user));
			dispath(setLinks(data.user.links ?? []));
			router.push('/dashboard');
		}
	}

	async function handleGoogle() {
		const state = crypto
			.getRandomValues(new Uint8Array(16))
			.reduce((val, acc) => val += acc.toString(16), '');
		
		localStorage.setItem('latestCSRFToken', state);

		window.location.assign(GOOGLE_URI + `&state=${state}&redirect_uri=${location.origin}/auth?type=google`);
	};
  
	async function handleGithub() {
		window.location.assign(GITHUB_URI + `&redirect_uri=${location.origin}/auth?type=github`);
	};

	useEffect(() => {
		if (searchParams?.type === 'google' &&
			searchParams.state === localStorage.getItem('latestCSRFToken')) {
			localStorage.removeItem('latestCSRFToken');

			getUserData('/auth/googleRegister?code=' + searchParams.code);
		}
	}, []);

	useEffect(() => {
		if (searchParams?.type === 'github' && searchParams.code) {
			getUserData('/auth/githubRegister?code=' + searchParams.code);
		}
	}, []);

	return (
		<Auth>
			<Logo isRegister={true} />
			<h2>
				Join to NJShort
			</h2>
			<p>
				Log in with your favorite social provider to get started:
			</p>
			<button onClick={handleGoogle}>
				<FcGoogle fontSize={16} />
				Continue with Google
			</button>
			<button onClick={handleGithub}>
				<FaGithub fontSize={16} />
				Continue with Github
			</button>
		</Auth>
	);
}

const Auth = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 60px;
	width: 100%;
	max-width: 384px;
	padding: 24px;
	border: 1px solid ${props => props.theme.isDark ? '#303030' : '#e0e0e0'};
	border-radius: 8px;
	text-align: center;
	gap: 8px;

	h2 {
		font-size: 24px;
		font-weight: 500;
		letter-spacing: -0.6px;
	}

	p {
		margin-bottom: 16px;
		color: #777777;
		line-height: 20px;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 8px;
		border: 1px solid ${props => props.theme.isDark ? '#303030' : '#e0e0e0'};
		border-radius: 6px;
		font-weight: 500;
		line-height: 1.5;
		gap: 8px;

		svg { stroke-width: 0; }

		&:hover {
			background-color: ${props => props.theme.isDark ? '#9999993d' : '#dddddd44'};
		}
	}
`;

export default AuthPage;
