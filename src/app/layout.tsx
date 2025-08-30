import type { Metadata } from "next";
import "../shared/styles/globals.css";
import { AuthProvider } from "@/shared/context";
import { ToastProvider } from "@/shared/hooks/use-toast";
 
export const metadata: Metadata = {
  title: "Influence Hub",
  description: "A platform for influencer's",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
