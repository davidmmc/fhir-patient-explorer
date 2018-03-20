import { Injectable, InjectionToken } from '@angular/core';
import { UserManager } from 'oidc-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import * as ClientOAuth2 from 'client-oauth2';

import { environment } from '../../../environments/environment';


export interface AuthService {
  getOauthToken(): Observable<any>;

 }
export const AUTH_SERVICE = new InjectionToken<AuthService>('AuthService');

//see https://github.com/jmurphzyo/Angular2OidcClient/blob/master/src/app/shared/services/auth.service.ts
const settings: any = {
  authority: environment.oAuthAuthority,
  client_id: environment.clientId,
  redirect_uri: environment.redirectUri,
  post_logout_redirect_uri: environment.postLogoutRedirectUri,
  response_type: 'id_token token',
  scope: 'openid email roles',
  silent_redirect_uri: environment.redirectUri,
  automaticSilentRenew: true,
  accessTokenExpiringNotificationTime: 4,
  // silentRequestTimeout:10000,
  filterProtocolClaims: true,
  loadUserInfo: true
};

@Injectable()
export class FhirAuthService implements AuthService {
  mgr: UserManager = new UserManager(settings);
  fhirAuth: ClientOAuth2;

  constructor() { 
    this.fhirAuth = new ClientOAuth2({
      clientId: environment.clientId,
      clientSecret: '123',
      accessTokenUri: environment.tokenUri,
      authorizationUri: environment.authorizationUri,
      redirectUri: environment.redirectUri,
      scopes: ['notifications', 'gist']
    })
  }

  getOauthToken() {
    return Observable.fromPromise(
      //this.fhirAuth.token.getOauthToken(environment.tokenUri)
      this.fhirAuth.token.getToken(environment.tokenUri)
        .then(res => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
    )
  }

  /*
  getOauthCode() {
    return Observable.fromPromise(
      this.fhirAuth.code.getToken
      this.fhirAuth.getOauthCode()
        .then(res => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
    )
  }
  */
}
 /*
    console.log(settings);
    const respStr = environment.clientId;
    console.log("Auth Service");
    //return Observable.of(respStr);
    return Observable.fromPromise(
      //Promise.resolve("response");
      this.mgr.signinRedirect()
        .then(res => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          //this.loggedIn = false;
          console.log('error');
        })
      );
      */
  