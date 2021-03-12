import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDataService } from './auth-data.service';
import { Auth } from './auth';
const SESSION_ID = 'session_id';
const SESSION_USERID = 'session_userid';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    loggedIn = false;
    isAdmin = 0;
    phoneno = 0;
    userAuth: Auth;

    constructor(
        private authDataService: AuthDataService
    ) { }
    check() {
        let auth: FormData = new FormData();
        auth.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
        auth.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
        this.authDataService.check(auth).subscribe (
            res=> {
                this.loggedIn = !res.err && res.loggedin;
                this.isAdmin = (!res.err && res.loggedin) ? res.isadmin : 0;
                this.phoneno = parseInt(window.localStorage.getItem(SESSION_USERID));
                let tAuth: Auth = new Auth(
                    res.id,
                    res.phoneno,
                    null,
                    res.name,
                    res.isadmin,
                    res.pincode,
                    res.area
                );
                this.userAuth = tAuth;
            }
        );
    }
    login(phoneno: Number, password: String): Observable<any> {
        let auth: FormData = new FormData();
        auth.append("phoneno", phoneno.toString());
        auth.append("password", password.toString());
        auth.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
        auth.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
        return Observable.create(observer => {
            this.authDataService.login(auth).subscribe (
                res=> {
                    this.loggedIn = !res.err && res.loggedin;
                    this.isAdmin = (!res.err && res.loggedin) ? res.isadmin : 0;
                    if (!res.err && res.loggedin) {
                        window.localStorage.setItem(SESSION_ID, res[SESSION_ID]);
                        window.localStorage.setItem(SESSION_USERID, res[SESSION_USERID]);
                        let tAuth: Auth = new Auth(
                            res.id,
                            res.phoneno,
                            null,
                            res.name,
                            res.isadmin,
                            res.pincode,
                            res.area
                        );
                        this.userAuth = tAuth;
                    }
                    observer.next(res);
                    observer.complete();
                }
            );
        });
    }
    logout(): Observable<any> {
        let auth: FormData = new FormData();
        auth.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
        auth.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
        return Observable.create(observer => {
            this.authDataService.logout(auth).subscribe (
                res=> {
                    if (!res.err) {
                        window.localStorage.setItem(SESSION_ID, "null");
                        window.localStorage.setItem(SESSION_USERID, "null");
                        this.loggedIn = !res.loggedout;
                        this.isAdmin = 0;
                    }
                    observer.next(res);
                    observer.complete();
                }
            );
        });
    }
}