import type {
	ReactElement,
	ReactNode,
	Dispatch,
	SetStateAction,
	ChangeEvent,
	DetailedReactHTMLElement
} from 'react';
import { FormBodyProps } from './props';

export type ReactDispatch<T> = Dispatch<SetStateAction<T>>;

export interface IKeys<T> {
	[index: string]: T;
}

export interface IUser {
	id: string;
	username: string;
	email: string;
	created_at: string;
}

export interface IUserWithLinks extends IUser {
	links: ILink[];
}

export interface ILink {
	id: string;
	user_id: string;
	original_url: string;
	short_url: string;
	description: string;
	click_count: number;
	created_at: string;
}

export interface IInputs {
	url: string;
	short: string;
	description: string;
}

export interface IPartialLink extends IInputs {
	id: string;
}

export interface IAxiosRegister {
	user: IUserWithLinks;
	token: string;
}

export interface IAxiosLink {
	message?: string;
	content?: string;
	errors: IKeys<string>;
	success?: boolean;
	link?: ILink;
	edit?: IPartialLink;
	delete?: string;
	username?: string;
}

export interface ISuccess {
	success?: boolean;
	content?: string;
	url?: string;
}

export interface IValues {
	name: string;
	content: string | [string, ReactElement, string] | [string, ReactElement];
	type: string;
	fontWeight?: boolean;
}

export interface IInitForm {
	readonly values: IKeys<string>;
	readonly errors: IKeys<string>;
	readonly disabled?: boolean;
	setDisabled: ReactDispatch<boolean | undefined>;
	setUrl(value: string): void;
	setShort(value: string): void;
	setDescription(value: string): void;
	setDelete(value: string, shortUrl: string): void;
	setUsername(value: string, username: string): void;
	setErrors(values: IKeys<string>): void;
	checkAll(value?: string): boolean;
}

export interface IInputProps {
	id: string;
	className?: string;
	type?: string;
	name: string;
	placeholder?: string;
	rows?: number;
	disabled?: boolean;
	autoComplete?: string;
	defaultValue?: string;
	value?: string;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface IPropsData {
	initForm: [IKeys<string>, IKeys<string>, boolean | undefined];
	element: (values: FormBodyProps) => ReactElement;
	form: { method: string, url: string };
	title: ITitle;
	button: IButton;
}

export interface ITitle {
	title: string;
	content?: string | [ReactElement, string];
	className?: string;
	settings?: boolean;
}

export interface IButton {
	text: string;
	className?: string;
	icon: ReactElement | null;
	cancel?: boolean;
}
