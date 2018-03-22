import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import * as ClientOAuth2 from 'client-oauth2';

import { environment } from '../environments/environment';
import { oauth } from '../environments/nocommit';

export interface AuthService {
  //getCode(): Observable<any>;
  doOAuth(): Observable<any>;
}

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
    //has auth code
    const authCode = queryStringHasAccessCode();

    if (authCode) {
      this.getOauthToken();
    }

    else {
      const uri = await this.fhirAuth.code.getUri();
      window.location.replace(uri); //redirect to auth page
    }
    //return Observable.fromPromise(uri);
    //const authToken = await this.fhirAuth.code.getToken();

    //TODO - if code in URI

    //if has code in URI

    //if has auth token in localStorage

    //else - init oauth

    //return this.getOauthToken;
  }

  private getOauthToken() {
    const options = {
      clientId: environment.clientId
    }

    return Observable.fromPromise(
      this.fhirAuth.code.getToken(window.location.search, options)
        .then(res => {
          console.log(res);
        })
        .catch((err) => {
          console.log('Error', err);
        })
    )
  }
}

function queryStringHasAccessCode() {
  const queryStringArr = window.location.search ? window.location.search.slice(1, -1).split('&') : [];
  let queryStringObj = {};
  queryStringArr.forEach((element) => {
    if (element.indexOf('=')) {
      let eleSplit = element.split('=');
      queryStringObj[eleSplit[0]] = eleSplit[1];
    }
  });
  console.log(queryStringObj);
  return queryStringObj['code'];
}
 