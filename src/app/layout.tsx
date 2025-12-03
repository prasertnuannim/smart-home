import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = { title: "Smart Home Dashboard" };

export default function RootLayout({ children }: any) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-[#dfe9f3] to-[#ffffff] dark:from-[#141622] dark:to-[#0e0f14]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
