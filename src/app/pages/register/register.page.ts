import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthDataService } from '../../auth/auth-data.service';
import { AuthService } from '../../auth/auth.service';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    name: String = null;
    pincode: Number = null;
    area: String = null;
    phoneno: Number = null;
    otp: number = null;
    password: String = null;
    password_re: String = null;
    otp_id: Number = null;
    otp_code: Number = null;
    constructor(
        private languageService: LanguageService,
        private authService: AuthService,
        private authDataService: AuthDataService,
        private router: Router,
        public toastController: ToastController
    ) { }
    ngOnInit() {
    }
    sendOTP() {
        if (this.phoneno == null || this.phoneno == 0 || this.phoneno.toString().length < 12) {
            this.presentToast("enter correct phoneno");
        } else {
            this.authDataService.sendOTP(this.phoneno).subscribe( res => {
                if (!res.err) {
                    this.otp_id = res.id;
                    this.otp_code = res.code;
                    this.presentToast("OTP sent");
                }
            });
        }
    }
    register() {
        this.check().subscribe( resCheck => {
            if (resCheck.err) {
                this.presentToast(resCheck.msg);
            } else {
                if (this.phoneno.toString().length == 10) this.phoneno = parseInt('91' + this.phoneno.toString());
                this.authDataService.register(
                    this.otp_id,
                    this.otp_code,
                    this.otp,
                    this.phoneno,
                    this.name,
                    this.password,
                    this.pincode,
                    this.area
                ).subscribe( res => {
                    if (!res.err) {
                        this.presentToast("you are registered");
                        this.router.navigate(['login']).then(x => console.log(x));
                    } else {
                        this.presentToast(res.msg);
                    }
                });
            }
        });
    }
    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }
    check(): Observable<any> {
        console.log(this.phoneno);
        return Observable.create(observer => {
            if (this.name == null || this.name == "") { observer.next({err: true, msg: "enter name"}); observer.complete(); }
            if (this.area == null || this.area == "") { observer.next({err: true, msg: "enter area"}); observer.complete(); }
            if (this.phoneno == null || this.phoneno == 0 || this.phoneno.toString().length < 10 || this.phoneno.toString().length > 12) { observer.next({err: true, msg: "enter correct phoneno"}); observer.complete(); }
            if (this.otp == null || this.otp == 0 || this.otp.toString().length < 6) { observer.next({err: true, msg: "enter otp"}); observer.complete(); }
            if (this.password == null || !/[a-zA-Z\d@_#$%^&]{5,}/.test(this.password.toString())) { observer.next({err: true, msg: "password accepts (a-z,A-Z,0-9,@_#$%&) and 5 char long"}); observer.complete(); }
            if (this.password_re == null || (this.password != this.password_re)) { observer.next({err: true, msg: "password did not match"}); observer.complete(); }
            this.authDataService.getPincode(this.pincode).subscribe( res => {
                if (res.length == 0) { observer.next({err: true, msg: "wrong pincode"}); observer.complete(); }
                else { observer.next({err: false, msg: "all data is correct"}); observer.complete(); }
            })
        });
    }
}
