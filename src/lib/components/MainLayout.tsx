'use client';

import type { ChildProps } from '../types/props';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

function MainLayout({ children }: ChildProps) {
	return (
		<Main>
			<GlobalStyle />
			{children}
		</Main>
	);	
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const GlobalStyle = createGlobalStyle<{ $whiteColor?: boolean; }>`
	.rotate { animation: ${rotate} .25s linear infinite; }
`

const Main = styled.main`
	display: grid;
	position: relative;
	grid-auto-rows: min-content;
	place-items: flex-start center;
	width: 100%;
	height: calc(100% - 64px);
	min-height: calc(100vh - 64px);
	background-color: ${props => props.theme.bgColor};
	color: ${props => props.theme.textColor};
	gap: 20px;
`;

export default MainLayout;
