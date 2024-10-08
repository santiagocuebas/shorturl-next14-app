import 'styled-components';

declare module 'styled-components' {
  export interface ITheme {
    bgColor: string;
    bgColorReverse: string;
    textColor: string;
    textColorReverse: string;
    isDark: boolean;
  }
}
