import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/app/lib/utils';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Simple Weather App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'bg-neutral-100 tracking-wider text-sm antialiased',
          montserrat.className
        )}>
        <div id='app' className='h-screen flex flex-col items-center'>
          {children}
        </div>
      </body>
    </html>
  );
}
