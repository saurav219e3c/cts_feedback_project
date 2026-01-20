
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user$ = new BehaviorSubject<User | null>(null);

  /** Current user stream */
  readonly user$ = this._user$.asObservable();
  /** Logged-in flag */
  readonly isLoggedIn$ = this.user$.pipe(map(u => !!u));
  /** Roles stream */
  readonly roles$ = this.user$.pipe(map(u => u?.roles ?? []));

  constructor(private tokenSvc: TokenService) {
    const token = this.tokenSvc.getToken();
    if (token) this.hydrateUserFromToken(token);
  }

  //get current user value
  getCurrentUserId(): string | null {
    return this._user$.getValue()?.id ?? null;
  }
  // For reactive components, expose as observable
  getCurrentUserId$(): Observable<string | null> {
    return this.user$.pipe(map(u => u?.id ?? null));
  }

  //get the username 
  getCurrentUserName$(): Observable<string | null> {
    return this.user$.pipe(map(u => u?.name ?? null));
  }



  /** Use this when backend returns a JWT */
  loginWithToken(token: string): void {
    this.tokenSvc.setToken(token);
    this.hydrateUserFromToken(token);
  }

  /** Use this now (no backend) to set auth state from your LoginService result */
  loginWithUser(user: User): void {
    this._user$.next(user);
  }

  logout(): void {
    this.tokenSvc.clearToken();
    this._user$.next(null);
  }

  hasRole$(role: Role): Observable<boolean> {
    return this.roles$.pipe(map(roles => roles.includes(role)));
  }

  hasAnyRole$(required: Role[]): Observable<boolean> {
    return this.roles$.pipe(map(roles => required.some(r => roles.includes(r))));
  }

  hasAllRoles$(required: Role[]): Observable<boolean> {
    return this.roles$.pipe(map(roles => required.every(r => roles.includes(r))));
  }

  private hydrateUserFromToken(token: string): void {
    const payload = this.tokenSvc.decodePayload<any>(token);
    const user: User | null = payload
      ? {
        id: payload.sub ?? payload.userId ?? 'unknown',
        name: payload.name ?? '',
        email: payload.email ?? '',
        roles: (payload.roles ?? payload['role'] ?? [])
          .map((r: string) => normalizeRole(r))
          .filter(Boolean) as Role[],
      }
      : null;
    this._user$.next(user);
  }
}

function normalizeRole(r: string): Role | null {
  const x = (r || '').trim().toLowerCase();
  if (x === 'admin') return 'Admin';
  if (x === 'manager') return 'Manager';
  if (x === 'employee') return 'Employee';
  return null;
}
