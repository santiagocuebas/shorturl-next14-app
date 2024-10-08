'use client';

import styled from 'styled-components';

function Logo({ isRegister }: { isRegister: boolean }) {
	return (
		<Svg
			$register={isRegister}
			width={0}
			height={0}
			viewBox="0 0 512 512"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect rx='25%' />
			<svg width={512} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" x='20%' y='20%'>
				<path d="M12.58,38a12.63,12.63,0,0,1-8.83-3.63A12.36,12.36,0,0,1,3.6,16.79l2.51-2.56a2,2,0,0,1,2.86,0A2,2,0,0,1,9,17L6.49,19.57a8.41,8.41,0,0,0,.1,12,8.58,8.58,0,0,0,6,2.48h0.05a8.46,8.46,0,0,0,6-2.54l2.51-2.57a2,2,0,0,1,2.86,0,2,2,0,0,1,0,2.82l-2.52,2.6A12.49,12.49,0,0,1,12.66,38H12.58Z" />
				<path d="M30.44,24.38A2,2,0,0,1,29,23.82,2,2,0,0,1,29,21l2.52-2.56a8.41,8.41,0,0,0-.1-12,8.58,8.58,0,0,0-6-2.48H25.37a8.47,8.47,0,0,0-6,2.55L16.86,9.12a2,2,0,0,1-2.86,0,2,2,0,0,1,0-2.82l2.52-2.6A12.49,12.49,0,0,1,25.35,0h0.07a12.63,12.63,0,0,1,8.83,3.63,12.36,12.36,0,0,1,.15,17.58l-2.51,2.56A2,2,0,0,1,30.44,24.38Z" />
				<path d="M14.06,26a2,2,0,0,1-1.42-.58,2,2,0,0,1,0-2.83l9.87-9.9a2,2,0,0,1,2.86,0,2,2,0,0,1,0,2.83l-9.87,9.9A2,2,0,0,1,14.06,26Z" />
			</svg>
		</Svg>
	);
}

const Svg = styled.svg<{ $register: boolean; }>`
  width: ${props => props.$register ? '40px' : '30px'};
  height: ${props => props.$register ? '40px' : '30px'};
	margin-bottom: ${props => props.$register ? '8px' : '0'};

	& rect {
		width: 100%;
		height: 100%;
	}

	& path { fill: #bfbfbf; }
`;

export default Logo;
