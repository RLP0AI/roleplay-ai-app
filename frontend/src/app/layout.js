import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Roleplay AI - Chat with Custom AI Characters',
  description: 'Create and chat with custom AI characters for immersive roleplay experiences',
  keywords: 'roleplay, AI, chat, characters, artificial intelligence',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
