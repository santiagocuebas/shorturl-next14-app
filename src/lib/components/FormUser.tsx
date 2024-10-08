'use client';

import type { FormBodyProps } from '../types/props';
import { Input } from './index';
import { inputValues } from '../dictionary';
import { initUserDeleteProps } from '../services';
import { useAppSelector } from '../store';

function Box({ dataForm }: FormBodyProps) {
	const user = useAppSelector(state => state.user.value);

	return (
		<Input
			values={inputValues.initUser(user?.email)}
			props={initUserDeleteProps(dataForm, user?.email ?? '')}
			message={dataForm.errors.delete}
		/>
	);
}

export default Box;
