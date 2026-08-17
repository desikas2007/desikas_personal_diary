import type { Metadata } from 'next';
import { AuthProvider } from '@/components/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Personal Vault - Diary & Password Manager',
  description: 'Your private digital diary and secure password vault',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
