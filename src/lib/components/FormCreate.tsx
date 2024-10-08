'use client';

import type { FormBodyProps } from '../types/props';
import { AiOutlineQuestion } from 'react-icons/ai';
import { Input } from './index';
import { inputValues } from '../dictionary';
import { initInputProps, preventDefault } from '../services';

function Link({ dataForm }: FormBodyProps) {
	const inputsProps = initInputProps(dataForm);

	function handleRandomize() {
		const random = Math.random().toString(36).substring(2, 10);
		dataForm.setShort(random);
	}

	return (
		<>
			<Input
				values={inputValues.url}
				props={inputsProps[0]}
				message={dataForm.errors.url}
			/>
			<Input
				values={inputValues.short}
				props={inputsProps[1]}
				message={dataForm.errors.short}
			>
				<button onClick={preventDefault(handleRandomize)}>
					<AiOutlineQuestion /> Randomize
				</button>
			</Input>
			<Input
				values={inputValues.description}
				props={inputsProps[2]}
				message={dataForm.errors.description}
			/>
		</>
	);
}

export default Link;
