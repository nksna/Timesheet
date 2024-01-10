// auth.guard.ts

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('token2')) {
      console.log('AuthGuard checking authentication status');

      return true;
    } else {
      // User is not authenticated, redirect to the login page
      this.router.navigateByUrl('');
      return false;
    }
  }
}
