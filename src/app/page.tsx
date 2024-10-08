'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { FaLink, FaGithub } from 'react-icons/fa6';
import { useAppSelector } from '@/lib/store';

function Home() {
	const user = useAppSelector(state => state.user.value);

	return (
		<Page>
			<h1>
				Enhance Your Link Management
			</h1>
			<p>
				NJShort is an open-source platform that allows you to create, manage, and share short links with ease. It's fast, secure, and easy to use.
			</p>
			<Link href={user ? '/dashboard' : '/auth'} className='register'>
				<FaLink fill='#ffffff' fontSize={16} />
				Create a Link
			</Link>
			<a href="https://github.com" target='_blank'>
				<FaGithub fontSize={16} />
				Github Repo
			</a>
		</Page>
	);
}

const Page = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	max-width: 800px;
	margin-top: 120px;
	text-align: center;
	gap: 24px;

	h1 {
		font-size: 48px;
		font-weight: 700;
		letter-spacing: -1.2px;
	}

	p {
		font-size: 16px;
		line-height: 24px;
	}

	a {
		display: flex;
		align-items: center;
		padding: 16px 24px;
		border-radius: 8px;
		box-shadow: 0 0 2px ${props => props.theme.isDark ? '#a0a0a0' : '#b0b0b0'};
		font-weight: 500;
		gap: 12px;

		&.register {
			background-color: ${props => props.theme.isDark ? '#ffffff' : '#000000'};
			color: ${props => props.theme.isDark ? '#000000' : '#ffffff'};

			svg { fill: ${props => props.theme.isDark ? '#000000' : '#ffffff'}; }
		}
	}
`;

export default Home;
