'use server';

import { cookies } from 'next/headers';

const COOKIE_NAME = 'locale';

export async function setUserLocale(locale: 'th' | 'en') {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale, { path: '/' });
}
