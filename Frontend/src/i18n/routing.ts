import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { config } from '../middleware';


export const locales =  ['en', 'de'];
export const routing = defineRouting({
  locales: locales,
  defaultLocale: 'en',
  localePrefix:"always",
  pathnames: {
    '/': '/',
    '/profile': {
      en: '/profile',
      de: '/profile'
    },
    '/links': {
      en: '/links',
      de: '/links'
    }
  }
});



export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const {Link, getPathname, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation(routing);