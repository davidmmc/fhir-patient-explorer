// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { clientId, basicAuth } from './nocommit'; //clientId is an exported string

export const environment = {
  production: false,
  clientId: clientId,
  oAuthAuthority: 'https://ic-fhirworks.epic.com/interconnect-fhirworks-oauth/oauth2/authorize',
  authorizationUri: 'https://ic-fhirworks.epic.com/interconnect-fhirworks-oauth/oauth2/authorize',
  tokenUri: 'https://ic-fhirworks.epic.com/interconnect-fhirworks-oauth/oauth2/token',
  redirectUri: 'http://localhost:4200/',
  postLogoutRedirectUri: 'http://localhost:4200/',
  baseFhir: 'https://ic-fhirworks.epic.com/interconnect-fhirworks-username/api/FHIR/DSTU2/',
  baseRest: 'https://ic-fhirworks.epic.com/interconnect-fhirworks-username/api/epic/2015/',
  basicAuth: basicAuth,
};
