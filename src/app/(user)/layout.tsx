'use client';

import type { ChildProps } from '@/lib/types/props';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import {
	AiOutlineSetting,
	AiOutlineLink,
	AiOutlineLoading3Quarters
} from 'react-icons/ai';
import { useAppSelector } from '@/lib/store';

function UserLayout({ children }: ChildProps) {
	const user = useAppSelector(state => state.user.value);
	const pathname = usePathname();

	return (
		<>
			<NavComponent>
				<div>
					<Link
						href='/dashboard'
						className={pathname === '/dashboard' ? 'selected' : ''}
					>
						<AiOutlineLink />
						Links
					</Link>
					<Link
						href='/settings'
						className={pathname === '/settings' ? 'selected' : ''}
					>
						<AiOutlineSetting />
						Settings
					</Link>
				</div>
			</NavComponent>
			{
				user
					? children
					: (
						<LoadingComponent>
							<AiOutlineLoading3Quarters className='rotate' />
							Loading...
						</LoadingComponent>
					)
			}
		</>
	);
}

const NavComponent = styled.nav`
	position: relative;
	width: 100%;
	box-shadow: 0 0 3px ${props => props.theme.isDark ? '#909090' : '#c0c0c0'};
	z-index: 300;

	div {
		display: flex;
		width: 100%;
		max-width: 1440px;
		margin: auto;
		padding: 0 16px;
		gap: 5%;
		z-index: 300;
	}

	a {
		display: flex;
		align-items: center;
		height: 48px;
		padding: 4px;
		border-bottom: 1px solid transparent;
		font-weight: 500;
		color: ${props => props.theme.isDark ? '#a6a6a6' : '#737373'};
		gap: 10px;

		svg { font-size: 18px; }

		&:hover, &.selected {
			color: ${props => props.theme.isDark ? '#f0f0f0' : '#171717'};

			svg { fill: ${props => props.theme.isDark ? '#f0f0f0' : '#070707'}; }
		}

		&.selected {
			border-bottom-color: ${props => props.theme.isDark ? '#f0f0f0' : '#171717'};
		}
	}
`;

const LoadingComponent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5%;
	font-size: 20px;
	font-weight: 500;
	color: #808080;
	row-gap: 20px;

	svg { font-size: 20px; }
`;

export default UserLayout;
