import { Injectable, InjectionToken } from '@angular/core';
import { UserManager } from 'oidc-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { environment } from '../../../environments/environment';

export interface AuthService {
  getOauthToken(): Observable<any>;

 }
export const AUTH_SERVICE = new InjectionToken<AuthService>('AuthService');

@Injectable()
export class FhirAuthService implements AuthService {

  constructor() { }

  getOauthToken() {
    const respStr = environment.clientId;
    console.log(respStr);
    return Observable.of(respStr);
  }
}
