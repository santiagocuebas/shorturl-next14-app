'use client';

import type { FormBodyProps } from '../types/props';
import { Input } from './index';
import { inputValues } from '../dictionary';
import { initUserProps } from '../services';
import { useAppSelector } from '../store';

function Link({ dataForm }: FormBodyProps) {
	const user = useAppSelector(state => state.user.value);
	const inputsProps = initUserProps(dataForm, user?.username);

	return (
		<>
			<Input
				values={inputValues.username}
				props={inputsProps[0]}
				message={dataForm.errors.username}
			/>
			<Input
				values={inputValues.email}
				props={inputsProps[1]}
				message={dataForm.errors.email}
				isEmail={true}
			/>
		</>
	);
}

export default Link;
