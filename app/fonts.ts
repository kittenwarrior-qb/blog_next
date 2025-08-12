// app/fonts.ts
import localFont from 'next/font/local'

export const qurova = localFont({
  src: [
    {
      path: '../public/fonts/Qurova-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Qurova-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Qurova-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Qurova-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-qurova',
  display: 'swap',
})
