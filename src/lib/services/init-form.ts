import type { IInitForm, IInputProps, IKeys } from '../types/global';
import { useState } from 'react';
import {
	checkDelete,
	checkDescription,
	checkLink,
	checkUrl,
	checkUsername
} from '../services';

export function initForm(
	initValues = {},
	initErrors = {},
	isDisabled?: boolean
): IInitForm {
	const [values, setValues] = useState<IKeys<string>>(initValues);
	const [errors, setErrors] = useState<IKeys<string>>(initErrors);
	const [disabled, setDisabled] = useState<boolean | undefined>(isDisabled);

	return {
		get values() { return values; },
		get errors() { return errors; },
		get disabled() { return disabled; },
		setUrl(value) {
			setValues({ ...values, url: value });
			setErrors({ ...errors, url: checkUrl(value) });
		},
		setShort(value) {
			setValues({ ...values, short: value });
			setErrors({ ...errors, short: checkLink(value) });
		},
		setDescription(value) {
			setValues({ ...values, description: value });
			setErrors({ ...errors, description: checkDescription(value) });
		},
		setDelete(value, objetiveValue) {
			if (disabled !== undefined) {
				setDisabled(value !== objetiveValue);
			}

			setValues({ ...values, delete: value });
			setErrors({ ...errors, delete: checkDelete(value, objetiveValue) });
		},
		setUsername(value, username) {
			setDisabled(value === username);
			setValues({ ...values, username: value });
			setErrors({ ...errors, username: checkUsername(value) });
		},
		setDisabled,
		setErrors(data) { setErrors(data); },
		checkAll(value = '') {
			if (values.delete !== undefined) {
				const result = checkDelete(values.delete, value);
				setErrors({ delete: result });
				return Boolean(result);
			}

			if (values.username !== undefined) {
				const result = checkUsername(values.username);
				setErrors({ ...errors, username: result });
				return Boolean(result);
			}

			const [url, short, description] =
				[checkUrl(values.url), checkLink(values.short), checkDescription(values.description)];

			setErrors({ url, short, description });

			return Boolean(url || short || description);
		}
	};
}

export function initInputProps(
	dataForm: IInitForm,
	disabled?: boolean
): IInputProps[] {
	return [
		{
			id: 'url',
			type: 'text',
			name: 'url',
			placeholder: 'Enter a url',
			defaultValue: dataForm.values.url,
			onChange: e => dataForm.setUrl(e.target.value)
		},
		{
			id: 'short',
			type: 'text',
			name: 'short',
			placeholder: 'mylink',
			disabled,
			value: dataForm.values.short,
			onChange: e => dataForm.setShort(e.target.value)
		},
		{
			id: 'description',
			name: 'description',
			placeholder: 'Enter a description',
			rows: 5,
			defaultValue: dataForm.values.description,
			onChange: e => dataForm.setDescription(e.target.value)
		}
	];
}

export function initDeleteProps(dataForm: IInitForm, shortUrl: string): IInputProps {
	return {
		id: 'delete',
		type: 'text',
		name: 'delete',
		autoComplete: 'off',
		defaultValue: dataForm.values.delete,
		onChange: e => dataForm.setDelete(e.target.value, shortUrl)
	};
}

export function initUserProps(dataForm: IInitForm, username = ''): IInputProps[] {
	return [
		{
			id: 'username',
			type: 'text',
			name: 'username',
			value: dataForm.values.username,
			onChange: e => dataForm.setUsername(e.target.value, username)
		},
		{
			id: 'email',
			type: 'text',
			name: 'email',
			disabled: true,
			defaultValue: dataForm.values.email,
			onChange: () => {}
		}
	];
}

export function initUserDeleteProps(
	dataForm: IInitForm,
	email: string
): IInputProps {
	return {
		id: 'delete',
		type: 'text',
		name: 'delete',
		autoComplete: 'off',
		placeholder: 'Your email address',
		value: dataForm.values.delete,
		onChange: e => dataForm.setDelete(e.target.value, email)
	};
}
