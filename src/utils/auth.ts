'use client';

import Cookies from 'js-cookie';

export function setAuthToken(token: string) {
  Cookies.set('token', token, { expires: 1 });
  localStorage.setItem('token', token);
}

export function clearAuth() {
  Cookies.remove('token');
  localStorage.removeItem('token');
  localStorage.removeItem('companyName');
}

export function isTokenValid(token: string) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}