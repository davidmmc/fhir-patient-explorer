import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { OAuthService } from './auth/auth.service';

if (environment.production) {
  enableProdMode();
}

const authService = new OAuthService();

authService.doOAuth();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));