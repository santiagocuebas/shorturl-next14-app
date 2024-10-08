'use client';

import type { UnlockProps } from '../types/props';
import { useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineUnlock } from 'react-icons/ai';
import { preventDefault, useOutClick } from '../services';

function Box({ setVisible, setEnable }: UnlockProps) {
	const divRef = useRef<HTMLDivElement | null>(null);

	useOutClick(divRef, setVisible);

	function handleEnable() {
		setVisible(false);
		setEnable(false);
	}

	return (
		<Component ref={divRef}>
			Editing the custom link will remove access from the previous link and it will be available to everyone. Are you sure you want to continue?
			<button onClick={preventDefault(() => setTimeout(handleEnable))}>
				<AiOutlineUnlock />
				Unlock
			</button>
		</Component>
	);
}

const Component = styled.div`
	display: flex;
	position: absolute;
	flex-direction: column;
	width: 280px;
	padding: 12px;
	border: 1px solid ${props => props.theme.isDark ? '#282828' : '#d7d7d7'};
	border-radius: 8px;
	background-color: ${props => props.theme.bgColor};
	box-shadow: 0 0 1px ${props => props.theme.isDark ? '#282828' : '#d7d7d7'};
	line-height: 20px;
	transform: translate(100%, 25%);
	row-gap: 8px;
	z-index: 50;

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 8px 0;
		border: 1px solid ${props => props.theme.isDark ? '#282828' : '#d7d7d7'};
		border-radius: 6px;
		column-gap: 8px;

		&:hover {
			border-color: ${props => props.theme.isDark ? '#383838' : ''};
			background-color: ${props => props.theme.isDark ? '#262626' : '#f2f4f6'};
		}
	}
`;

export default Box;
