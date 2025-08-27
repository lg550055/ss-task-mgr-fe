import './global.css';
import { ReactNode } from 'react';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Task App',
  description: 'A simple task manager with FastAPI backend',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
