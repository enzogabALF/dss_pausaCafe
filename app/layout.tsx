import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pausa Cafe DSS',
  description: 'Sistema de soporte a la toma de decisiones para Pausa Cafe',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
