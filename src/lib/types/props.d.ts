import type {
	IButton,
	IInitForm,
	IInitProps,
	IInputProps,
	IKeys,
	ILink,
	IPropsData,
	ISuccess,
	ITheme,
	IUser,
	IUserWithLinks,
	IValues,
	ReactDispatch
} from './global';

export type ChildProps = Readonly<{ children: React.ReactNode; }>

export interface MetadataProps {
	params: IKeys<string | string[] | undefined>;
	searchParams: IKeys<string | string[] | undefined>;
}

export interface AbsoluteProps extends ChildProps {
	setProps: ReactDispatch<IPropsData | null>;
}

export interface StoreProps extends ChildProps {
	data: { user: IUserWithLinks, token: string } |  null;
}

export interface NavProps {
	rawUser?: IUserWithLinks | null;
	setTheme: ReactDispatch<ITheme>;
}

export interface ListProps extends ChildProps {
	className?: string;
	setVisible: ReactDispatch<boolean>;
}

export interface FormProps {
	props: IPropsData;
	setProps: ReactDispatch<IPropsData | null>;
	handleForm: (values: IInitForm, formProps: IKeys<string>) => Promise<void>;
}

export interface ButtonProps {
	props: IButton,
	loading: boolean,
	disabled?: boolean,
	setProps: ReactDispatch<IPropsData | null>
}

export interface FormBodyProps {
	dataForm: IInitForm;
}

export interface LinkProps {
	link: ILink;
	setProps: ReactDispatch<IPropsData | null>;
	setMessage: ReactDispatch<ISuccess>;
}

export interface InputProps {
	children?: React.ReactNode;
	values: IValues;
	props: IInputProps;
	message: string;
	isEmail?: boolean;
}

export interface UnlockProps extends CreateProps {
	setEnable: ReactDispatch<boolean>;
	setVisible: ReactDispatch<boolean>;
}
