import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { config } from '../middleware';


export const locales =  ['en', "tr", "bn", 'de'];
export const routing = defineRouting({
  locales: locales,
  defaultLocale: 'en',
  localePrefix:"always",
  pathnames: {
    '/': '/',
    '/profile': {
      en: '/profile',
      tr: '/profil',
      bn: '/প্রোফাইল',
      de: '/Profil'
    },
    '/links': {
      en: '/links',
      tr: '/bağlantılar',
      bn: '/লিঙ্ক',
      de: '/links',
    }
  }
});



export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const {Link, getPathname, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation(routing);