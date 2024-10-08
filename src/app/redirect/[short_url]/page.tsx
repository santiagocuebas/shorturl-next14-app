import type { IKeys } from '@/lib/types/global';
import type { MetadataProps } from '@/lib/types/props';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axios from '@/lib/axios';

async function getData(data: IKeys<string | string[] | undefined>) {
	const token = cookies().get('authenticate');

	if (token) {
		const url = await axios<string>({
			url: '/links/' + data.short_url,
			headers: { Authorization: token.value }
		}).then(res => res.data)
			.catch(() => null);

    if (url) return redirect(url);
  }

  return redirect('/');
}

export default async function Redirect({ params }: MetadataProps) {
	await getData(params);
	return <></>;
}
