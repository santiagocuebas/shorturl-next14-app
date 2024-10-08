import type { IAxiosLink, IKeys } from '../types/global';
import axios from '../axios';

export async function handleForm(data: IKeys<unknown>): Promise<IAxiosLink> {
	return axios(data)
		.then(res => res.data)
		.catch(err => {
			console.error(err?.message);
			return err.response?.data ?? {
				errors: { message: 'An error occurred while trying to connect to the server. Please try again later.' }
			};
		});
}
