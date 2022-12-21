'use client';
import '../styles/globals.css';
import styles from '../styles/layout.module.css';
import Link from 'next/link';
import Header from '../components/header';

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <Header />
        <div>
          <Link href='/'>Main</Link>
          <Link href='/search'>Search</Link>
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
