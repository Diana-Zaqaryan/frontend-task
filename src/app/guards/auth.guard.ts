import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class authGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const routePath = route.url[0]?.path;

    if (isLoggedIn && routePath === 'login') {
      console.log('mtav')
      this.router.navigate(['system']);
      return false;
    }

    if (!isLoggedIn && routePath === 'system') {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
