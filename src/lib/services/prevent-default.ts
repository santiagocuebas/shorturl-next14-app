import { FormEvent, MouseEvent } from 'react';

export function preventDefault(fn: Function) {
  return function (this: Function, event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    fn.call(this, event);
  }
}
