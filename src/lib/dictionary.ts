import type { IButton, IKeys, ITheme, IValues } from './types/global';
import { createElement } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsRocketTakeoffFill, BsSave2Fill } from 'react-icons/bs';

export const ligthTheme: ITheme = {
	bgColor: '#ffffff',
	bgColorReverse: '#000000',
	textColor: '#000000',
	textColorReverse: '#ffffff',
	isDark: false
};

export const darkTheme: ITheme = {
	bgColor: '#000000',
	bgColorReverse: '#ffffff',
	textColor: '#ffffff',
	textColorReverse: '#000000',
	isDark: true
};

export const titleProps = {
	add: { title: 'Create new link' },
	edit: (shortUrl = '') => {
		return { title: 'Edit link', content: '/' + shortUrl };
	},
	delete: (shortUrl = '') => {
		return { 
			title: 'Delete /' + shortUrl,
			content: 'Access to the link will be permanently removed. This action cannot be undone.',
			className: 'delete'
		};
	},
	change: {
		title: 'General',
		content: 'Update your personal information:',
		settings: true
	},
	account: {
		title: 'Account',
		content: 'Update your account settings:',
		settings: true
	},
	deleteUser: {
		title: 'Delete Account',
		content: [
			createElement('span', { key: 'u' }, 'This action cannot be undone. '),
			'This will permanently delete your account and remove all links from our servers.'
		]
	}
};

export const inputValues = {
	url: { name: 'url', content: 'Destination URL:', type: 'input' },
	short: { name: 'short', content: 'Short link:', type: 'input' },
	description: {
		name: 'description',
		content: 'Description (optional):',
		type: 'textarea'
	},
	initDelete: (value = ''): IValues => {
		return {
			name: 'delete',
			content: ['Type ', createElement('span', { key: value }, value), ' to confirm:'],
			type: 'input'
		};
	},
	username: { name: 'username', content: 'Your name:', type: 'input' },
	email: { name: 'email', content: 'Your email:', type: 'input' },
	initUser: (value = ''): IValues => {
		return {
			name: 'delete',
			content: [
				'To confirm, please type your email address: ',
				createElement('span', { key: 'y' }, value)
			],
			type: 'input',
			fontWeight: true
		};
	}
};

export const buttonProps: IKeys<IButton> = {
	add: { text: 'Create', icon: BsRocketTakeoffFill({}) },
	edit: { text: 'Save', icon: BsSave2Fill({}) },
	delete: { text: 'Delete', className: 'delete', icon: AiOutlineDelete({}) },
	change: { text: 'Save', icon: BsSave2Fill({}), cancel: true },
	deleteUser: { text: 'Delete', className: 'delete', icon: null }
};
