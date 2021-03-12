import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Auth } from './auth'
//const PATH = "http://localhost:8080/";
//const PATH = "http://192.168.0.101:8080/";
const PATH = "https://thefarmerguy.herokuapp.com/";
const SESSION_ID = 'session_id';
const SESSION_USERID = 'session_userid';
@Injectable({
    providedIn: 'root'
})
export class AuthDataService {
    constructor(private http:HttpClient) { }
    // check if logged in
    check(auth: FormData):Observable<any> {
        let url = PATH + 'users/checklogin';
        return this.http.post(url, auth);
    }
    login(auth: FormData):Observable<any> {
        let url = PATH + 'users/login';
        return this.http.post(url, auth);
    }
    logout(auth: FormData):Observable<any> {
        let url = PATH + 'users/logout';
        return this.http.post(url, auth);
    }
    getPincode(pincode: Number): Observable<any> {
        let data: FormData = new FormData();
        data.append("pincode", pincode.toString());
        let url = PATH + 'users/getPincode';
        return this.http.post<any>(url, data);
    }
    // register
    register(
        otp_id: Number,
        otp_code: Number,
        otp_otp: Number,
        phoneno: Number,
        name: String,
        password: String,
        pincode: Number,
        area: String
        ):Observable<any> {
            let data: FormData = new FormData();
            data.append("otp_id", otp_id.toString());
            data.append("otp_code", otp_code.toString());
            data.append("otp_otp", otp_otp.toString());
            data.append("phoneno", phoneno.toString());
            data.append("name", name.toString());
            data.append("password", password.toString());
            data.append("pincode", pincode.toString());
            data.append("area", area.toString());
            let url = PATH + 'users/register';
            return this.http.post(url, data);
    }
    // profile
    profileEdit(name: String, pincode: Number, area: String, password: String): Observable<any> {
        let data: FormData = new FormData();
        data.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
        data.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
        data.append("name", name.toString());
        data.append("pincode", pincode.toString());
        data.append("area", area.toString());
        data.append("password", password.toString());
        let url = PATH + 'users/profileEdit';
        return this.http.post<any>(url, data);
    }
    profileChangePassword(newPassword: String, oldPassword: String): Observable<any> {
        let data: FormData = new FormData();
        data.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
        data.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
        data.append("newPassword", newPassword.toString());
        data.append("oldPassword", oldPassword.toString());
        let url = PATH + 'users/profileChangePassword';
        return this.http.post<any>(url, data);
    }
    profileChangePhoneno(
            otp_id: Number,
            otp_code: String,
            otp_otp: Number,
            old_phoneno: Number,
            new_phoneno: Number,
            password: String
        ): Observable<any> {
        let data: FormData = new FormData();
        data.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
        data.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
        data.append("otp_id", otp_id.toString());
        data.append("otp_code", otp_code.toString());
        data.append("otp_otp", otp_otp.toString());
        data.append("old_phoneno", old_phoneno.toString());
        data.append("new_phoneno", new_phoneno.toString());
        data.append("password", password.toString());
        let url = PATH + 'users/profileChangePhoneno';
        return this.http.post<any>(url, data);
    }
    sendOTP(phoneno: Number): Observable<any> {
        let data: FormData = new FormData();
        data.append("phoneno", phoneno.toString());
        let url = PATH + 'otp/sendOTP';
        return this.http.post<any>(url, data);
    }
    loginForgotPassword(
            otp_id: Number,
            otp_code: String,
            otp_otp: Number,
            password: String
        ): Observable<any> {
        let data: FormData = new FormData();
        data.append("otp_id", otp_id.toString());
        data.append("otp_code", otp_code.toString());
        data.append("otp_otp", otp_otp.toString());
        data.append("phoneno", window.sessionStorage.getItem("phoneno"));
        data.append("password", password.toString());
        let url = PATH + 'users/loginForgotPassword';
        return this.http.post<any>(url, data);
    }
}