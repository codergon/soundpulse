import { ColorSchemeName, useColorScheme as _colorScheme } from "react-native";

export default function useColorScheme(): NonNullable<ColorSchemeName> {
  const systemTheme = _colorScheme() as NonNullable<ColorSchemeName>;
  return systemTheme;
}
