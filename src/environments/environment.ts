// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { clientId, basicAuth, baseFhir, baseRest, oauth } from './nocommit'; //clientId is an exported string
//Note that oauth of nocommit file implements NoCommitAuth interface.  export const oauth: NoCommitAuth = {...}

export interface NoCommitAuth {
  authorizeUri: string, //authorize Uri
  tokenUri: string, //token uri once code available
  redirectUri: string, //redirect Uri from auth
  clientId: string, //clientId from the auth provider
  scopes: Array<string>, //openid, others
  resposeType: string, //code or token
  baseOAuthFhir: string, // baseUrl + /api/FHIR/DSTU2
}

export const environment = {
  production: false,
  clientId: oauth.clientId,
  authorizationUri: oauth.authorizeUri,
  tokenUri: oauth.tokenUri,
  redirectUri: oauth.redirectUri,
  postLogoutRedirectUri: oauth.redirectUri,
  oAuthAuthority: oauth.authorizeUri,
  baseFhir: baseFhir,
  baseOAuthFhir: oauth.baseOAuthFhir,
  baseRest: baseRest,
  basicAuth: basicAuth,
  scopes: [...oauth.scopes]
};
