"use client";

import { ThemeProvider as NextThemes } from "next-themes";

export function ThemeProvider({ children, ...props }: any) {
  return <NextThemes {...props}>{children}</NextThemes>;
}
