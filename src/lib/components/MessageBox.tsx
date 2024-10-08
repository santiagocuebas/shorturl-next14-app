'use client';

import type { ISuccess } from '../types/global';
import styled from 'styled-components';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

function MessageBox({ message }: { message: ISuccess }) {
	return (
		<Component $existUrl={Boolean(message.url)}>
			<div>
				{message.success ? <AiFillCheckCircle /> : <AiFillCloseCircle />}
			</div>
			<div>
				<p>{message.content}</p>
			</div>
			{message.url && <div>{location.origin + '/redirect/' + message.url}</div>}
		</Component>
	);
}

const Component = styled.div<{ $existUrl: boolean }>`
	display: grid;
	position: fixed;
	grid-template-columns: min-content 1fr;
	grid-auto-rows: min-content;
	justify-self: flex-end;
	align-items: center;
	width: 90%;
	min-width: 320px;
	max-width: 400px;
	right: 16px;
	bottom: 50px;
	padding: 16px 12px;
	border: 1px solid ${props => props.theme.isDark ? '#282828' : '#e0e0e0'};
	border-radius: 8px;
	box-shadow: 0 0 2px ${props => props.theme.isDark ? '#383838' : '#f0f0f0'};
	background-color: ${props => props.theme.bgColor};
	color: ${props => props.theme.textColor};
	row-gap: 4px;
	column-gap: 8px;

	> div {
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	div:first-child { grid-row: 1 / span 2; }

	svg {
		font-size: 24px;
		stroke-width: 0;
	}

	div:nth-child(2) { grid-row: ${props => !props.$existUrl && '1 / span 2'}; }

	p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 500;
	}

	div:last-child {
		font-family: 'Geist Mono', monospace;
		letter-spacing: -0.45px;
	}
`;

export default MessageBox;
