'use client';

import type { FormBodyProps } from '../types/props';
import { Input } from './index';
import { inputValues } from '../dictionary';
import { initDeleteProps } from '../services';
import { useAppSelector } from '../store';

function Box({ dataForm }: FormBodyProps) {
	const link = useAppSelector(state => state.link.value);

	return (
		<Input
			values={inputValues.initDelete(link?.short_url)}
			props={initDeleteProps(dataForm, link?.short_url ?? '')}
			message={dataForm.errors.delete}
		/>
	);
}

export default Box;
