'use client';

import type { FormBodyProps } from '../types/props';
import { useState } from 'react';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';
import { Input, UnlockBox } from './index';
import { inputValues } from '../dictionary';
import { initInputProps, preventDefault } from '../services';
import { useAppSelector } from '../store';

function Link({ dataForm }: FormBodyProps) {
	const link = useAppSelector(state => state.link.value);
	const [disable, setDisable] = useState(!!link);
	const [unlock, setUnlock] = useState(false);
	const inputsProps = initInputProps(dataForm, disable);

	function handleUnlock() {
		if (!disable) setDisable(true);
		else setUnlock(true);
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
				<button onClick={preventDefault(handleUnlock)}>
					{disable ? <AiOutlineLock /> : <AiOutlineUnlock />}
				</button>
				{unlock && <UnlockBox setVisible={setUnlock} setEnable={setDisable} />}
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
