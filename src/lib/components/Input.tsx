'use client';

import type { InputProps } from '../types/props';
import { createElement } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import styled from 'styled-components';

function Input({ children, values, message, props, isEmail }: InputProps) {
	const input = createElement(values.type, props);

	return (
		<Component $isEmail={isEmail} $isNormal={values.fontWeight}>
			<label htmlFor={values.name} className={message && 'error'}>
				{values.content}
			</label>
			<span>
				{input}
				{children}
			</span>
			{
				message &&
					<p className={message && 'error'}>
						{isEmail && <AiOutlineWarning />}
						{message}
					</p>
			}
		</Component>
	);
}

const Component = styled.div<{ $isEmail?: boolean, $isNormal?: boolean }>`
	display: flex;
	position: relative;
	flex-direction: column;
	row-gap: 12px;

	label {
		max-width: fit-content;
		font-weight: ${props => props.$isNormal ? '400' : '500'};
		line-height: 20px;

		span {
			font-family: 'Geist Mono';
			font-weight: ${props => props.$isNormal ? '400' : '500'};
		}
	}

	input, textarea {
		width: 100%;
		padding: 8px 12px;
		border: 1px solid ${props => props.theme.isDark ? '#282828' : '#d7d7d7'};
		outline: none;
		border-radius: 6px;
		overflow: hidden;

		&:focus-visible {
			box-shadow:
				0 0 0 ${props => props.theme.isDark ? '0' : '1px'} #a3a3a3,
				0 0 2px ${props => props.theme.isDark ? '#fffffff3' : '#0000000b'};
		}

		&[disabled] {
			color: ${props => props.theme.isDark ? '#d0d0d0' : '#707070'};
			cursor: not-allowed;
		}
	}

	.error { color: ${props => !props.$isEmail && '#e41f1f'} }

	p {
		display: flex;
		align-items: center;
		color:
			${props => props.$isEmail && props.theme.isDark ? '#d0d0d0' : '#707070'};
		column-gap: 6px;
	}

	> span {
		width: 100%;
		display: flex;
		position: relative;

		> button {
			display: flex;
			position: absolute;
			align-items: center;
			justify-content: center;
			width: min-content;
			height: 100%;
			right: 0;
			padding: 0 12px;
			border: 1px solid ${props => props.theme.isDark ? '#282828' : '#d7d7d7'};
			border-top-right-radius: 6px;
			border-bottom-right-radius: 6px;
			font-weight: 500;
			column-gap: 8px;
			z-index: 60;

			&:hover {
				border-color: ${props => props.theme.isDark ? '#3a3a3a' : ''};
				background-color: ${props => props.theme.isDark ? '#262626' : '#f2f4f6'};
			}
		}
	}
`;

export default Input;
