import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthDataService } from './auth-data.service';
import { AuthService } from './auth.service';
const SESSION_ID = 'session_id';
const SESSION_USERID = 'session_userid';
@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        public authService: AuthService,
        public router: Router,
        private authDataService: AuthDataService
    ) {
        this.authService.check();
    }
    canActivate(): Observable<boolean> {
        return Observable.create(observer => {
            let auth: FormData = new FormData();
            auth.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
            auth.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
            this.authDataService.check(auth).subscribe (
                res=> {
                    if (!res.err && res.loggedin) {
                        observer.next(true);
                        observer.complete();
                    } else {
                        this.router.navigate(['register']);
                        observer.next(false);
                        observer.complete();
                    }
                }
            );
        });
    }
}