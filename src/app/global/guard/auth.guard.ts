import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const tokenExpirado = (token: string) => {
  const tokenDecode: any = jwtDecode(token);
  const dataAtual: Date = new Date();
  const dataExpiracao = new Date(tokenDecode.exp * 1000);

  return dataAtual > dataExpiracao;
};

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  if (token && !tokenExpirado(token)) {
    return true;
  } else {
    localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }
};
