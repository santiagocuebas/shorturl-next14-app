export function getDate(created_at: string) {
  const date = new Date(created_at);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return `${date.getDate() + 1} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}
