'use client';

import type { ITitle } from '../types/global';
import styled from 'styled-components';

function Box({ props }: { props: ITitle }) {
	const { title, content, className, settings = false } = props;

	return (
		<Compoment $hidden={Boolean(content)} $settings={settings}>
			{title}
			<p className={className}>
				{content}
			</p>
		</Compoment>
	);
}

const Compoment = styled.h2<{ $hidden: boolean, $settings: boolean }>`
	display: flex;
	flex-direction: column;
	font-size: ${props => props.$settings ? '24px' : '18px'};
	font-weight: 600;
	color: ${props => props.$settings ? '' : '#808080'};
	letter-spacing: -0.6px;
	row-gap: 8px;

	p {
		display: ${props => props.$hidden ? 'block' : 'none'};
		opacity: ${props => props.$settings ? '0.7' : '1'};
		color: ${props => props.theme.isDark && !props.$settings ? '#c0c0c0' : ''};
		line-height: 20px;
		letter-spacing: 0;

		&.delete, span { color: #ec3636; }
	}
`;

export default Box;
