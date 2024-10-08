'use client';

import type { FormProps } from '../types/props';
import { useState } from 'react';
import styled from 'styled-components';
import { ButtonBox, Title } from './index';
import { useAppSelector } from '../store';
import { initForm, preventDefault } from '../services';

function Box({ props, handleForm, setProps }: FormProps) {
	const link = useAppSelector(state => state.link.value);
	const user = useAppSelector(state => state.user.value);
	const [loading, setLoading] = useState(false);
	const dataForm = initForm(...props.initForm);

	async function handleSubmit() {
		if (dataForm.checkAll(link?.short_url ?? user?.email)) return;
		
		setLoading(true);
		await handleForm(dataForm, props.form);
		setLoading(false);
	}

	return (
		<Component onSubmit={preventDefault(handleSubmit)}>
			<Title props={props.title} />
			{dataForm.errors.message &&
				<div className='warm'>{dataForm.errors.message}</div>}
			{props.element({ dataForm })}
			<ButtonBox
				props={props.button}
				loading={loading}
				disabled={dataForm.disabled}
				setProps={setProps}
			/>
		</Component>
	);
}

const Component = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	row-gap: 16px;

	.warm {
		padding: 12px;
		border: 1px solid #c29b1b;
		border-radius: 8px;
		background-color: #f6f8c0;
		box-shadow: 0 0 0 1px #c29b1b;
		text-align: center;
		font-weight: 500;
		color: #92690f;
	}
`;

export default Box;
