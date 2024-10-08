'use client';

import type { AbsoluteProps } from '../types/props';
import { useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useOutClickForm } from '../services';
import { resetLink, useAppDispatch } from '../store';

function Box({ children, setProps }: AbsoluteProps) {
	const dispatch = useAppDispatch();
	const divRef = useRef<HTMLDivElement | null>(null);

	useOutClickForm(divRef, setProps, dispatch, resetLink);

	return (
		<Component>
			<div ref={divRef}>
				<button onClick={() => setProps(null)}>
					<AiOutlineClose />
				</button>
				{children}
			</div>
		</Component>
	);
}

const Component = styled.div`
	display: flex;
	position: fixed;
	align-items: flex-start;
	width: 100%;
	height: 100%;
	top: 0;
	background-color: #181818d0;
	backdrop-filter: blur(4px);
	z-index: 1500;

	> div {
		display: flex;
		position: relative;
		flex-direction: column;
		width: 100%;
		min-width: 320px;
		max-width: 512px;
		margin: auto;
		padding: 24px;
		border-radius: 10px;
		background-color: ${props => props.theme.bgColor};
		box-shadow: 0 0 2px #606060;

		> button {
			position: absolute;
			top: 20px;
			right: 20px;
			z-index: 500;
		}
	}
`;

export default Box;
