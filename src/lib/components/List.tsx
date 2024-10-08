'use client';

import type { ListProps } from '../types/props';
import { useRef } from 'react';
import styled from 'styled-components';
import { useOutClick } from '../services';
import { useAppSelector } from '../store';

function ListTheme({ children, setVisible, className = '' }: ListProps) {
	const user = useAppSelector(state => state.user.value);
	const listRef = useRef<HTMLDivElement | null>(null);

	useOutClick(listRef, setVisible);

	return (
		<List ref={listRef} className={className} $existsUser={Boolean(user)}>
			{children}
		</List>
	);
}

const List = styled.div<{ $existsUser: boolean }>`
	display: flex;
	position: absolute;
	flex-direction: column;
	width: 240px;
	right: 16px;
	margin-top: 40px;
	border: 1px solid ${props => props.theme.isDark ? '#2f2f2f' : '#e0e0e0'};
	border-radius: 8px;
	background-color: ${props => props.theme.bgColor};
	box-shadow: 0 4px 2px ${props => props.theme.isDark ? '#2f2f2f' : '#e7e7e7'};
	overflow: hidden;
	word-break: break-all;
	z-index: 1000;

	&.theme-list {
		width: 160px;
		right: ${props => props.$existsUser ? '58px' : '156px'};
	}

	h3 {
		display: flex;
		flex-direction: column;
		padding: 12px 12px 8px;
		font-weight: 500;
	}

	span {
		font-size: 12px;
		color: #a0a0a0;
		line-height: 16px;
	}

	ul {
		display: flex;
		flex-direction: column;
		padding: 4px 0;
	}

	li {
		display: flex;
		align-items: center;
		padding: 6px 12px;
		cursor: default;
		gap: 12px;

		&:hover {
			background-color: ${props => props.theme.isDark ? '#2f2f2f' : '#f0f0f0'};
		}
	}
`;

export default ListTheme;
