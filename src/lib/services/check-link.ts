import validator from 'validator';

export const checkUrl = (url = '') => {
	if (!validator.isURL(url)) return 'Enter a valid url';
	else if (!validator.isLength(url, { max: 1024 })) {
		return 'The url is too long';
	}

	return '';
};

export const checkLink = (link = '') => {
	if (!validator.isLength(link, { min: 8, max: 24 })) {
		return 'The link must have between 8 and 24 characters';
	}

	return '';
};

export const checkDescription = (description = '') => {
	if (!validator.isLength(description, { max: 100 })) {
		return 'The description must be less than 100 characters';
	}

	return '';
};

export const checkDelete = (link: string, objetiveValue: string) => {
	if (link !== objetiveValue) return 'The values not match';

	return '';
};

export const checkUsername = (username: string) => {
	if (username.length === 0) return 'The username must contain at least one character';

	return '';
};
