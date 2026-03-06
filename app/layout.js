import './globals.css';

export const metadata = {
  title: 'EPIC Mobile — Your Caribbean Connection',
  description: 'Make calls, send airtime, and manage your EPIC wallet from anywhere in the Caribbean.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
