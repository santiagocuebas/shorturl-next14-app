'use client';

import type { IInitForm, IKeys, IPropsData, ISuccess } from '@/lib/types/global';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';
import { deleteCookie } from 'cookies-next';
import { AiFillHeart, AiOutlineArrowDown } from 'react-icons/ai';
import { buttonProps, titleProps } from '@/lib/dictionary';
import { Absolute, Box, Change, Form, Title, UserDelete } from '@/lib/components';
import { handleForm } from '@/lib/services';
import {
	changeUsername,
	resetLinks,
	resetUser,
	useAppDispatch,
	useAppSelector
} from '@/lib/store';
import { Method, Url } from '@/lib/types/enums';

function SettingsPage() {
	const dispatch = useAppDispatch();
	const user = useAppSelector(state => state.user.value);
	const links = useAppSelector(state => state.links.value);
	const router = useRouter();
	const [message, setMessage] = useState<ISuccess>({});
	const [props, setProps] = useState<IPropsData>({
		initForm: [
			{ username: user?.username ?? '', email: user?.email ?? '' },
			{ email: 'Email address is managed by your OAuth provider.' },
			true
		],
		element: Change,
		form: { method: Method.POST, url: Url.CHANGE },
		title: titleProps.change,
		button: buttonProps.change,
	});
	const [deleteProps, setDeleteProps] = useState<IPropsData | null>(null);

	function handleButton() {
		setDeleteProps({
			initForm: [{ delete: '' }, {}, true],
			element: UserDelete,
			form: { method: Method.DELETE, url: Url.DELETEUSER },
			title: titleProps.deleteUser as any,
			button: buttonProps.deleteUser
		});
	}

	function downloadObjectAsJson() {
		if (!links.length) {
			setMessage({ success: false, content: 'No exists links to exported' });
			setTimeout(() => setMessage({}), 7000);
			return;
		}

		const linksToDownload = links.map(({ short_url, original_url, created_at }) => {
			return { short_url, original_url, created_at };
		});

		const encodeData = encodeURIComponent(JSON.stringify(linksToDownload, null, 2));
		const download = document.createElement('a');
		download.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeData);
		download.setAttribute('download', 'njshort-links.json');
		document.body.appendChild(download);
		download.click();
		download.remove();

		setMessage({ success: true, content: 'Links exported successfully' });
		setTimeout(() => setMessage({}), 7000);
	}

	async function handleUser(dataForm: IInitForm, { method, url }: IKeys<string>) {
		const data = await handleForm({ method, url, data: dataForm.values });

		if (data.message) console.log(data.message);
		else if (data.errors) {
			if (data.errors.message) dataForm.setErrors({ message: data.errors.message });
			else dataForm.setErrors(data.errors);
		} else {
			if (data.username) dispatch(changeUsername(data.username));

			setMessage({ success: data.success, content: data.content });
			dataForm.setDisabled(true);
			setTimeout(() => setMessage({}), 7000);
		}
	}

	async function handleDelete(dataForm: IInitForm, { method, url }: IKeys<string>) {
		const data = await handleForm({ method, url, data: dataForm.values });

		if (data.message) console.log(data.message);
		else if (data.errors) {
			if (data.errors.message) dataForm.setErrors({ message: data.errors.message });
			else dataForm.setErrors(data.errors);
		} else {
			if (data.delete) {
				deleteCookie('authenticate', { path: '/', secure: true, maxAge: 0 });
				router.push('/auth');
				dispatch(resetLinks());
				dispatch(resetUser());
			}

			setDeleteProps(null);
		}
	}

	return (
		<>
			{
				deleteProps &&
					<Absolute setProps={setDeleteProps}>
						<Form
							props={deleteProps}
							setProps={setDeleteProps}
							handleForm={handleDelete}
						/>
					</Absolute>
			}
			<Page>
				<div>
					<Form props={props} setProps={setProps as any} handleForm={handleUser} />
				</div>
				<div>
					<Title props={titleProps.account} />
					<div className='account'>
						<p>
							Export links:
						</p>
						<button onClick={downloadObjectAsJson}>
							<AiOutlineArrowDown />
							Export Links
						</button>
					</div>
					<div className='account'>
						<p>
							Delete account:
						</p>
						<button className='delete' onClick={handleButton}>
							<AiFillHeart />
							Delete Account
						</button>
					</div>
				</div>
			</Page>
			{typeof message.success === 'boolean' && <Box message={message} />}
		</>
	);
}

const Page = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 1440px;
	padding: 0 16px;
	row-gap: 16px;

	> div {
		display: flex;
		flex-direction: column;
		padding: 16px;
		border: 1px solid ${props => props.theme.isDark ? '#282828' : '#e6e6e6'};
		border-radius: 6px;
		row-gap: 24px;

		.account {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			row-gap: 8px;

			p { font-size: 16px; }

			button {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 210px;
				height: 32px;
				border: 1px solid ${props => props.theme.isDark ? '#282828' : '#d7d7d7'};
				border-radius: 6px;
				font-size: 12px;
				font-weight: 500;
				column-gap: 12px;

				&:hover {
					border-color: ${props => props.theme.isDark ? '#3a3a3a' : ''};
					background-color: ${props => props.theme.isDark ? '#262626' : '#f2f4f6'};
				}

				&.delete {
					border-width: 0;
					background-color:
						${props => props.theme.isDark ? '#7f1b1bf1' : '#e94242f1'};
					color: #ffffff;

					&:hover {
						background-color:
							${props => props.theme.isDark ? '#7f1b1be2' : '#e94242e2'};
					}
				}
			}
		}

		form { row-gap: 24px; }
	}
`;

export default SettingsPage;
