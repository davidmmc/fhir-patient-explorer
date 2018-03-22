import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import * as ClientOAuth2 from 'client-oauth2';

import { environment } from '../environments/environment';
import { oauth } from '../environments/nocommit';

export interface AuthService {
  //getCode(): Observable<any>;
  doOAuth(): Promise<void>;
}

export interface AccessTokenResponse {
  access_token: string,
  token_type: string,
  expires_in: any
}

export const LS_ACCESS_TOKEN = "fhirAuthToken";
const TOKEN_EXPIRES_AT = "expiresAt";
const EXPIRE_OFFSET = 1000 * 60 * 5; // 5 minutes

export class OAuthService implements AuthService {
  fhirAuth: ClientOAuth2;

  constructor() { 
    this.fhirAuth = new ClientOAuth2({
      clientId: environment.clientId,
      accessTokenUri: environment.tokenUri,
      authorizationUri: environment.authorizationUri,
      redirectUri: environment.redirectUri,
      scopes: [...environment.scopes]
    })
  }

  async doOAuth() {
    //if has auth token in localStorage
    if(hasValidAccessToken()) { 
      return;
    }

    const authCode = queryStringHasParam('code');

    if (authCode) {
      this.getOauthToken();
    }

    //if have launch code still need to exchange for authorization code
    else if (queryStringHasParam('launch')) {
      const redirectSnippet = `redirect_uri=${encodeURIComponent(environment.redirectUri)}`;
      const clientIdSnippet = `client_id=${environment.clientId}`;
      const scopeSnippet = `scope=launch`;
      const responseTypeSnippet = `response_type=code`;
      const launchSnippet = `launch=${queryStringHasParam('launch')}`;
      const launchCodeExchangeUri = `${environment.authorizationUri}?${clientIdSnippet}&${redirectSnippet}&${scopeSnippet}&${launchSnippet}&${responseTypeSnippet}`;
      //console.log(launchCodeExchangeUri);
      window.location.replace(launchCodeExchangeUri); //redirect to auth page
    }

    else {
      const uri = await this.fhirAuth.code.getUri();
      window.location.replace(uri); //redirect to auth page
    }
  }

  private getOauthToken() {
    const options = {
      clientId: environment.clientId
    }

    this.fhirAuth.code.getToken(window.location.search, options)
      .then(res => {
        let st: AccessTokenResponse = {
          access_token: res.accessToken,
          expires_in: res.data.expires_in,
          token_type: res.tokenType,
        };
        storeToken(st);
      })
      .catch((err) => {
      })
  }
}

function storeToken(tokenRes: AccessTokenResponse) {
  let st = {
    access_token: tokenRes.access_token,
    token_type: tokenRes.token_type,
  }
  st[TOKEN_EXPIRES_AT] = (new Date()).getTime() + (tokenRes.expires_in * 1000);
  localStorage.setItem(LS_ACCESS_TOKEN, JSON.stringify(st));
}

function hasValidAccessToken() {
  let isValidAuthToken = false;
  const strAuthToken = localStorage.getItem(LS_ACCESS_TOKEN);
  if(strAuthToken) {
    const authToken = JSON.parse(strAuthToken);
    const hasToken = authToken['access_token'] ? true : false;
    if (authToken[TOKEN_EXPIRES_AT]) {
      isValidAuthToken = (((new Date)).getTime() + EXPIRE_OFFSET) > authToken[TOKEN_EXPIRES_AT] ? false : true;
    }
  }
  return isValidAuthToken;
}

function queryStringHasParam(paramName: string) {
  const queryStringArr = window.location.search ? window.location.search.slice(1).split('&') : [];
  let queryStringObj = {};
  queryStringArr.forEach((element) => {
    if (element.indexOf('=')) {
      let eleSplit = element.split('=');
      queryStringObj[eleSplit[0]] = eleSplit[1];
    }
  });
  return queryStringObj[paramName];
}