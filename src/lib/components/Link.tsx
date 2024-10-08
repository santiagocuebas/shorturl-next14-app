'use client';

import type { LinkProps } from '../types/props';
import styled from 'styled-components';
import {
	AiFillSignal,
	AiOutlineBlock,
	AiOutlineDelete,
	AiOutlineSetting
} from 'react-icons/ai';
import { Delete, Edit } from './index';
import { buttonProps, titleProps } from '../dictionary';
import { getDate } from '../services';
import { useAppDispatch, setLink, clickLink } from '../store';
import { Method, Url } from '../types/enums';

function Link({ link, setMessage, setProps }: LinkProps) {
	const dispatch = useAppDispatch();

	async function copyURL() {
		await navigator.clipboard
			.writeText(`${location.origin}/redirect/${link.short_url}`)
			.then(() =>
				setMessage({ success: true, content: 'Link copied successfully', url: link.short_url }))
			.catch(() =>
				setMessage({ success: false, content: 'Failed to copy link', url: link.short_url }));

		setTimeout(() => setMessage({}), 7000);
	}

	async function editLink() {
		dispatch(setLink(link));
		setProps({
			initForm: [{
				url: link.original_url,
				short: link.short_url,
				description: link.description
			}, {}, undefined],
			element: Edit,
			form: { method: Method.PUT, url: Url.EDIT + link.id },
			title: titleProps.edit(link.short_url),
			button: buttonProps.edit
		});
	}

	async function deleteLink() {
		dispatch(setLink(link));
		setProps({
			initForm: [{ delete: '' }, {}, undefined],
			element: Delete,
			form: { method: Method.DELETE, url: Url.DELETE + link.id },
			title: titleProps.delete(link.short_url),
			button: buttonProps.delete
		});
	}

	return (
		<Component>
			<div>
				<span>/</span>
				<a
					href={'/redirect/' + link.short_url}
					target='_blank'
					onClick={() => dispatch(clickLink(link.id))}
				>{link.short_url}</a>
				<div>
					<span>
						<AiFillSignal />
						{link.click_count} clicks
						<p></p>
					</span>
					<button onClick={copyURL}>
						<AiOutlineBlock />
					</button>
					<button onClick={editLink}>
						<AiOutlineSetting />
					</button>
					<button onClick={deleteLink}>
						<AiOutlineDelete />
					</button>
				</div>
			</div>
			<p>
				{link.original_url}
			</p>
			<div>
				<p>
					{link.description}
				</p>
				<p>
					{getDate(link.created_at)}
				</p>
			</div>
		</Component>
	);
}

const Component = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 12px;
	border: 1px solid ${props => props.theme.isDark ? '#282828' : '#e0e0e0'};
	border-radius: 8px;
	box-shadow: 0 0 2px ${props => props.theme.isDark ? '#383838' : '#f0f0f0'};
	overflow: hidden;
	gap: 8px;

	* {
		overflow: hidden;
		font-family: 'Geist Mono', monospace;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	> div {
		display: flex;
		align-items: center;
		column-gap: 2px;

		&:last-child {
			* {
				font-size: 12px;
				font-weight: 500;
				color: ${props => props.theme.isDark ? '#b0b0b0' : '#505050'};
			}

			> p:first-child { max-width: 70%; }
		}

		> *:last-child {
			width: max-content;
			margin-left: auto;
		}

		> span {
			font-family: 'Inter Variable', monospace;
			color: ${props => props.theme.isDark ? '#b0b0b0' : '#808080'};
		}

		a {
			max-width: 60%;
			font-size: 16px;
			font-weight: 500;
			font-family: 'Inter Variable', monospace;
		}

		div {
			display: flex;
			align-items: center;
			column-gap: 12px;

			span {
				display: flex;
				align-items: center;
				font-size: 12px;
				column-gap: 6px;

				svg { stroke-width: 0; }

				p {
					flex: none;
					width: 1px;
					height: 16px;
					margin-left: 2px;
					background-color: ${props => props.theme.isDark ? '#303030' : '#a0a0a0'};
				}
			}

			button {
				display: flex;
				flex: none;

				&:hover { opacity: ${props => props.theme.isDark ? '.9' : '.8'}; }

				svg { font-size: 16px; }
			}
		} 
	}

	> p {
		max-width: 90%;
		color: ${props => props.theme.isDark ? '#b0b0b0' : '#808080'};
	}
`;

export default Link;
