import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'

import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

import InitialDispatch from '@/components/molecules/InitialDispatch'
import Head from 'next/head'
import FloatingTransaction from '@/components/atoms/FloatingTransaction'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Octachase | Your Number One Trading Platform.',
  icons: {
    icon: '/favicon.png',
  },
  description:
    'We provide fastest trading using modern technologies. No delays in order executions and most accurate quotes. Our trading platform is available around the clock ...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <Head>
        <script
          src="//code.tidio.co/xevrw61fz7tan8wyni7q6mimyxxfaowi.js"
          async
        />
      </Head> */}
      <body className={inter.className}>
        <InitialDispatch>
          <FloatingTransaction />
          {children}
        </InitialDispatch>
      </body>
    </html>
  )
}
