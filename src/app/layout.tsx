'use client'
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { MyThemeProvider } from "@/contexts/ThemeProvider";
import { QueryClient, QueryClientProvider } from "react-query";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const queryClient = new QueryClient()


  return (
    <html lang="en">
      <head>
        <title>My Pokemon</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Changa+One:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>
          <SettingsProvider>
            <MyThemeProvider>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </MyThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </body> 
    </html>
  );
}
