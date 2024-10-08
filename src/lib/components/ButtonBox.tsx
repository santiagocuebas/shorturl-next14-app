'use client';

import type { ButtonProps } from '../types/props';
import styled from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Box({ props, loading, disabled, setProps }: ButtonProps) {
	const { text, className = 'create', icon, cancel } = props;

	return (
		<Component>
			<button className={className} disabled={loading || disabled}>
				{loading ? <AiOutlineLoading3Quarters className='rotate' /> : icon}
				{text}
			</button>
			{
				!cancel &&
					<button onClick={() => setProps(null)} disabled={loading}>
						Cancel
					</button>
			}
		</Component>
	);
}

const Component = styled.div`
	display: flex;
	flex-direction: row-reverse;
	column-gap: 2px;

	button {
		padding: 8px 16px;
		font-weight: 500;
		line-height: 20px;
		
		&:disabled {
			pointer-events: none;
			opacity: .5;
		}

		&.create, &.delete {
			display: flex;
			align-items: center;
			border-radius: 6px;
			background-color: ${props => props.theme.bgColorReverse};
			color: ${props => props.theme.textColorReverse};
			column-gap: 12px;

			&:hover {
				background-color: ${props => props.theme.isDark ? '#e8e8e8' : '#383838'};
			}

			svg {
				font-size: 16px;
				stroke-width: 0;
			}
		}

		&.delete {
			background-color: #e43841;
			color: #ffffff;
			
			&:hover { background-color: #f35656; }
		}
	}
`;

export default Box;
