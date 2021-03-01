import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CallbackService {
    callbackUrl : string;
    private callbackUrl$ = new BehaviorSubject<string>(this.callbackUrl);
    currentCurrentCallbackUrl = this.callbackUrl$.asObservable();

    codeChallenge : string;
    private codeChallenge$ = new BehaviorSubject<string>(this.codeChallenge);
    currentCodeChallenge = this.codeChallenge$.asObservable();

    changeArticleData(callbackUrl : string) {
      this.callbackUrl$.next(callbackUrl);
    }

    changeCodeChallenge(codeChallenge : string) {
      this.codeChallenge$.next(codeChallenge);
    }
}