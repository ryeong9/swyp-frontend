import { ToastContainer } from 'react-toastify';
import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'INDEX',
  description: '감정 중심 독서 기록 서비스',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'INDEX',
    description: '감정 중심 독서 기록 서비스',
    url: 'https://index-pi-nine-40.vercel.app/',
    siteName: 'INDEX',
    images: [
      {
        url: '/thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: 'INDEX 서비스 미리보기',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

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
