import { UserManager } from 'oidc-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import * as ClientOAuth2 from 'client-oauth2';

import { environment } from '../environments/environment';

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

export interface AuthService {
  //getCode(): Observable<any>;
  doOAuth(): Observable<any>;
}

export class OAuthService implements AuthService {
  mgr: UserManager = new UserManager(settings);
  fhirAuth: ClientOAuth2;

  constructor() { 
    this.fhirAuth = new ClientOAuth2({
      clientId: environment.clientId,
      clientSecret: '123notSoSecret', //not required for token AND not able to secure within web app
      accessTokenUri: environment.tokenUri,
      authorizationUri: environment.authorizationUri,
      redirectUri: environment.redirectUri,
      scopes: [...environment.scopes]
    })
  }

  async doOAuth() {
    console.log("Doing Auth")
    const uri = await this.fhirAuth.code.getUri();
    console.log(uri);
    //return Observable.fromPromise(uri);
    const authToken = await this.fhirAuth.code.getToken()

    //if has code in URI

    //if has auth token in localStorage

    //else - init oauth

    //return this.getOauthToken;
  }

  private getOauthToken() {
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
  