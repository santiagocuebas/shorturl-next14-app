import { redirect } from 'next/navigation';

export default async function handleRedirect() {
  return redirect('/');
}
