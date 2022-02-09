import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AppState } from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'planning-poker-client';

  private languageChangedSubscription?: Subscription;

  constructor(
    private store: Store<AppState>,
    private translate: TranslateService
  ) {
    translate.addLangs(['en', 'nl']);
    const preferredLanguage = this.preferredLanguage();
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(preferredLanguage);
  }

  private preferredLanguage(): string {
    const languageSetting = localStorage.getItem('language');
    if (languageSetting) {
      const languageIndex = this.translate.langs.indexOf(languageSetting);
      if (languageIndex >= 0) {
        return languageSetting;
      }
    }

    let browserLanguage = this.translate.langs[0];
    window.navigator.languages.some((val) => {
      const languageIndex = this.translate.langs.indexOf(val);
      if (languageIndex >= 0) {
        browserLanguage = val;
        return true;
      }
      return false;
    });

    return browserLanguage;
  }
  ngOnInit(): void {
    this.languageChangedSubscription = this.store
      .select((str) => str.systemState.language)
      .subscribe((language) => {
        if (language) {
          localStorage.setItem('language', language);
        }
      });
  }
  ngOnDestroy(): void {
    if (this.languageChangedSubscription) {
      this.languageChangedSubscription.unsubscribe();
    }
  }
}
