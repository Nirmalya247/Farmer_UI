import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthDataService } from '../../../auth/auth-data.service';
import { AuthService } from '../../../auth/auth.service';
import { LanguageService } from '../../../services/language.service';
@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
    otp: Number;
    newPassword: String;
    newPasswordRe: String;
    otp_id: Number;
    otp_code: String;
    constructor(
        private languageService: LanguageService,
        public authService: AuthService,
        public authDataService: AuthDataService,
        public navCtrl: NavController,
        public toastController: ToastController
    ) {
        this.sendOTP();
    }
    ngOnInit() {
    }
    close() {
        this.navCtrl.back();
    }
    sendOTP() {
        this.authDataService.sendOTP(parseInt(window.sessionStorage.getItem("phoneno"))).subscribe(res => {
            if (!res.err) {
                this.otp_id = res.id;
                this.otp_code = res.code;
                this.presentToast("OTP sent");
            }
        });
    }
    save() {
        this.authDataService.loginForgotPassword(
            this.otp_id,
            this.otp_code,
            this.otp,
            this.newPassword
        ).subscribe(res => {
            if (!res.err) {
                this.presentToast("password changed");
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
}