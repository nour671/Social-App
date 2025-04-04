import { TranslateModuleConfig } from './../../node_modules/@ngx-translate/core/public-api.d';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
// import { NgxSpinnerModule } from "ngx-spinner";
import { provideToastr } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './core/utils/httpLoadFiles';




export const appConfig: ApplicationConfig = {
providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes , withInMemoryScrolling({scrollPositionRestoration : 'top'})),
  provideClientHydration(withEventReplay()),
  provideHttpClient(withFetch(), withInterceptors([headersInterceptor ]))
  ,provideAnimations(),provideToastr()
  ,importProvidersFrom( TranslateModule.forRoot({
  defaultLanguage:'en',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
})) ]
};
