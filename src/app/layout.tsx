import { ToastContainer } from 'react-toastify';
import './globals.css';
import Providers from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='preload'
          as='image'
          href='/icons/heroHeader.svg'
          fetchPriority='high'
        />
      </head>
      <body suppressHydrationWarning={process.env.NODE_ENV === 'development'}>
        <Providers>
          <div className='w-full max-w-[1440px] mx-auto'>{children}</div>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
