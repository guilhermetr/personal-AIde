export enum Theme {
    Light = 'light',
    Dark = 'dark'
}

// Precondition: str is a valid theme
export function convertStringToTheme(str: string): Theme {
    const themeValues = Object.values(Theme);
    const theme = themeValues.find((value) => value === str.toLowerCase());
    return theme as Theme;
  }