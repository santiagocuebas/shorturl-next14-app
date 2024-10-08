'use client';

import type { ITheme } from 'styled-components';
import type { NavProps } from '../types/props';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteCookie } from 'cookies-next';
import { FaGithub, FaArrowRight, FaUser } from 'react-icons/fa6';
import {
	AiOutlineSun,
	AiOutlineMoon,
	AiOutlineDesktop,
	AiOutlineSetting,
	AiOutlineHome,
	AiOutlineMenuUnfold,
	AiOutlineLogout
} from 'react-icons/ai';
import { Logo, List } from './index';
import { darkTheme, ligthTheme } from '../dictionary';
import {
	useAppDispatch,
	setUser,
	resetUser,
	useAppSelector,
	setLinks,
	resetLinks
} from '../store';

function NavBar({ rawUser = null, setTheme }: NavProps) {
	const user = useAppSelector(state => state.user.value);
	const dispath = useAppDispatch();
	const [listTheme, setListTheme] = useState(false);
	const [listUser, setListUser] = useState(false);

	async function handleTheme(theme: ITheme, themeName: string) {
		setListTheme(false);
		setTheme(theme);
		localStorage.setItem('data-theme', themeName);
	}

	async function handleUser() {
		setListUser(false);
	}

	async function handleLogout() {
		setListUser(false);
		deleteCookie('authenticate', { path: '/', maxAge: 0, sameSite: 'strict' });
		dispath(resetUser());
		dispath(resetLinks());
	}

	useEffect(() => {
		if (rawUser) {
			dispath(setUser(rawUser));
			dispath(setLinks(rawUser.links));
		}
	}, []);

	return (
		<Nav>
			<div className='box'>
				<Link className='title' href='/'>
					<Logo isRegister={false} />
					NJShort
				</Link>
				<div className='settings'>
					<a href="https://github.com" target='_blank'>
						<FaGithub />
					</a>
					<button onClick={() => setTimeout(() => setListTheme(!listTheme))}>
						<AiOutlineSun />
					</button>
					{
						user !== null
							? (
								<button onClick={() => setTimeout(() => setListUser(!listUser))}>
									<FaUser />
								</button>
							) : (
								<Link className='login' href='/auth'>
									Get Started
									<FaArrowRight fontSize={14} />
								</Link>
							)
					}
				</div>
				{
					listTheme &&
						<List setVisible={setListTheme} className='theme-list'>
							<h3>
								Theme
							</h3>
							<ul>
								<li onClick={() => handleTheme(ligthTheme, 'ligth-theme')}>
									<AiOutlineSun />
									Light
								</li>
								<li onClick={() => handleTheme(darkTheme, 'dark-theme')}>
									<AiOutlineMoon />
									Dark
								</li>
								<li onClick={() => handleTheme(ligthTheme, 'ligth-theme')}>
									<AiOutlineDesktop />
									System
								</li>
							</ul>
						</List>
				}
				{
					listUser &&
						<List setVisible={setListUser}>
							<h3>
								{user?.username}
								<span>
									{user?.email}
								</span>
							</h3>
							<ul>
								<Link href='/' onClick={handleUser}>
									<li>
										<AiOutlineHome />
										Home
									</li>
								</Link>
								<Link href='/dashboard' onClick={handleUser}>
									<li>
										<AiOutlineMenuUnfold />
										Dashboard
									</li>
								</Link>
								<Link href='/settings' onClick={handleUser}>
									<li>
										<AiOutlineSetting />
										Settings
									</li>
								</Link>
								<Link href='/auth' onClick={handleLogout}>
									<li>
										<AiOutlineLogout />
										Logout
									</li>
								</Link>
							</ul>
						</List>
				}
			</div>
		</Nav>
	);
}

export const Nav = styled.nav`
	position: relative;
	background-color: ${props => props.theme.bgColor};
	color: ${props => props.theme.textColor};
	z-index: 350;

	.title {
		display: flex;
		align-items: center;
		font-size: 18px;
		font-weight: 500;
		letter-spacing: -0.45px;
		gap: 12px;

		&:hover { opacity: .8; }
	}

	.box {
		display: flex;
		position: relative;
		justify-content: space-between;
		width: 100%;
		max-width: 1440px;
		margin: auto;
		padding: 16px 16px 12px;

		.settings {
			display: flex;
			gap: 6px;

			a, button {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 36px;
				height: 36px;
				border-radius: 6px;

				&:hover {
					background-color: ${props => props.theme.isDark ? '#383838' : '#f0f0f0'};
					color: ${props => props.theme.isDark ? '' : '#171717'};
				}

				svg { font-size: 20px; }
			}

			.login {
				width: max-content;
				padding: 0 16px;
				box-shadow: 0 0 2px ${props => props.theme.isDark ? '#a0a0a0' : '#b0b0b0'};
				font-weight: 500;
				gap: 12px;
			}
		}
	}
`;

export default NavBar;
