import { Sora, Nunito, Inter } from "next/font/google";
import localFont from 'next/font/local';

export const staatlitches = localFont({
  src: '../public/fonts/Staatliches-Regular.ttf',
});

export const ibm_plex_sans = localFont({
  src: [
    {
      path: '../public/fonts/IBM-Plex-Sans/IBMPlexSans-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBM-Plex-Sans/IBMPlexSans-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../public/fonts/IBM-Plex-Sans/IBMPlexSans-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBM-Plex-Sans/IBMPlexSans-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../public/fonts/IBM-Plex-Sans/IBMPlexSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBM-Plex-Sans/IBMPlexSans-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/IBM-Plex-Sans/IBMPlexSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBM-Plex-Sans/IBMPlexSans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/IBM-Plex-Sans/IBMPlexSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBM-Plex-Sans/IBMPlexSans-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/IBM-Plex-Sans/IBMPlexSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBM-Plex-Sans/IBMPlexSans-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../public/fonts/IBM-Plex-Sans/IBMPlexSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBM-Plex-Sans/IBMPlexSans-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
})

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});
