import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './pages/home/home.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { storeFreeze } from 'ngrx-store-freeze';
import { INITIAL_APPSTATE, reducers } from './state/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { SessionEffects } from './state/session/session.effects';
import { SessionsModule } from './pages/sessions/sessions.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json');
}

let metaReducers: any[] = [];
if (environment.production === false) {
  metaReducers = [storeFreeze];
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HomeModule,
    SessionsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      initialState: INITIAL_APPSTATE,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 5 }),
    EffectsModule.forRoot([SessionEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
