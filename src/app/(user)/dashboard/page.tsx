'use client';

import type { IInitForm, IKeys, IPropsData, ISuccess } from '@/lib/types/global';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
	AiOutlineCodepen,
	AiOutlinePlus,
	AiOutlineSearch,
	AiOutlineThunderbolt
} from 'react-icons/ai';
import { buttonProps, titleProps } from '@/lib/dictionary';
import { Form, Box, Link, Absolute, Create } from '@/lib/components';
import { handleForm } from '@/lib/services';
import {
	addLink,
	deleteLink,
	editLink,
	useAppDispatch,
	useAppSelector
} from '@/lib/store';
import { Method, Url } from '@/lib/types/enums';

function DashboardPage() {
	const dispatch = useAppDispatch();
	const rawLinks = useAppSelector(state => state.links.value);
	const [props, setProps] = useState<IPropsData | null>(null);
	const [message, setMessage] = useState<ISuccess>({});
	const [links, setLinks] = useState(rawLinks);

	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		const reloadLinks = rawLinks.filter(link => link.short_url.includes(e.currentTarget.value));
		setLinks(reloadLinks);
	}

	function handleButton() {
		setProps({
			initForm: [{ url: '', short: '', description: '' }, {}, undefined],
			element: Create,
			form: { method: Method.POST, url: Url.ADD },
			title: titleProps.add,
			button: buttonProps.add
		});
	}

	async function handleDash(dataForm: IInitForm, { method, url }: IKeys<string>) {
		const data = await handleForm({ method, url, data: dataForm.values });

		if (data?.message) console.log(data.message);
		else if (data?.errors) {
			if (data.errors.message) dataForm.setErrors({ message: data.errors.message});
			else if (data.errors.id) {
				setMessage({ success: false, content: data.errors.id });
				setProps(null);
				setTimeout(() => setMessage({}), 10000);
			} else dataForm.setErrors(data.errors);
		} else {
			const message = { success: data?.success, content: data?.content, url: '' };

			if (data?.link) {
				dispatch(addLink(data.link));
				message.url = data.link.short_url;
			} else if (data?.edit) {
				dispatch(editLink(data.edit));
				message.url = data.edit.short;
			} else if (data?.delete) {
				dispatch(deleteLink(data.delete));
				message.url = data.delete;
			}

			setMessage(message);
			setProps(null);
			setTimeout(() => setMessage({}), 7000);
		}
	}

	useEffect(() => setLinks(rawLinks), [rawLinks]);

	return (
		<>
			{
				props &&
					<Absolute setProps={setProps}>
						<Form props={props} setProps={setProps} handleForm={handleDash} />
					</Absolute>
			}
			<Page $isGrid={Boolean(links.length)}>
				<div>
					<div>
						<AiOutlineSearch />
						<input type='text' placeholder='Search input' onChange={handleInput} />
					</div>
					<div>
						<div>
							<AiOutlineCodepen fontSize={16} />
							{rawLinks.length} / 30
						</div>
						<button onClick={handleButton}>
							<AiOutlinePlus />
							Create Link
						</button>
					</div>
				</div>
				<div>
					{
						rawLinks.length
							? links.map(link => <Link key={link.id} link={link} setProps={setProps} setMessage={setMessage} />)
							: (
								<>
									<AiOutlineThunderbolt />
									<p>
										No links found
									</p>
									<button onClick={handleButton}>
										<AiOutlinePlus />
										Create a new link
									</button>
								</>
							)
					}
				</div>
			</Page>
			{typeof message.success === 'boolean' && <Box message={message} />}
		</>
	);
}

const Page = styled.div<{ $isGrid: boolean }>`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 1440px;
	padding: 0 16px;
	row-gap: 12px;

	> div:first-child {
		display: flex;
		justify-content: space-between;

		> div:first-child {
			display: flex;
			position: relative;
			align-items: center;
			width: 100%;
			max-width: 320px;

			svg {
				position: absolute;
				margin-left: 8px;
				font-size: 18px;
				fill: #a0a0a0;
			}

			input {
				width: 100%;
				padding: 4px 12px 4px 32px;
				border: 1px solid ${props => props.theme.isDark ? '#282828' : '#d7d7d7'};
				border-radius: 6px;
				line-height: 26px;

				&:focus-visible {
					box-shadow:
						0 0 0 ${props => props.theme.isDark ? '0' : '1px'} #a3a3a3,
						0 0 2px ${props => props.theme.isDark ? '#fffffff3' : '#0000000b'};
				}
			}
		}

		> div:last-child {
			display: flex;
			column-gap: 8px;

			> * {
				display: flex;
				align-items: center;
				padding: 0 16px;
				border-radius: 6px;
				font-weight: 500;
				column-gap: 8px;
			}

			div {
				border: 1px solid ${props => props.theme.isDark ? '#282828' : '#d7d7d7'};
			}

			button {
				background-color: ${props => props.theme.bgColorReverse};
				color: ${props => props.theme.textColorReverse};
				column-gap: 16px;

				&:hover { opacity: ${props => props.theme.isDark ? '.9' : '.8'}; }

				svg { stroke-width: 50; }
			}
		}
	}

	> div:last-child {
		display: ${props => props.$isGrid ? 'grid' : 'flex'};
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: min-content;
		flex-direction: column;
		align-items: center;
		gap: ${props => props.$isGrid ? '8px' : '12px'};

		> svg { font-size: 48px; }

		> p { font-size: 16px; }

		> button {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 8px 16px;
			border: 1px solid ${props => props.theme.isDark ? '#272727' : '#e0e0e0'};
			border-radius: 8px;
			overflow: hidden;
			font-weight: 500;
			column-gap: 12px;

			&:hover {
				background-color: ${props => props.theme.isDark ? '#282828' : '#f0f0f0'};
				border-color: ${props => props.theme.isDark ? '#3f3f3f' : '#d0d0d0'};
			}

			svg { font-size: 14px; }
		}

		@media (max-width: 1020px) { grid-template-columns: 1fr; }
	}
`;

export default DashboardPage;
function dispatch(arg0: any) {
	throw new Error('Function not implemented.');
}

