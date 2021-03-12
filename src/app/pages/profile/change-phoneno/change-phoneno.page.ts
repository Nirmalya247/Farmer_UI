import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthDataService } from '../../../auth/auth-data.service';
import { AuthService } from '../../../auth/auth.service';
import { LanguageService } from '../../../services/language.service';
@Component({
    selector: 'app-change-phoneno',
    templateUrl: './change-phoneno.page.html',
    styleUrls: ['./change-phoneno.page.scss'],
})
export class ChangePhonenoPage implements OnInit {
    newPhoneNo: Number = null;
    otp: Number = null;
    password: String = null;
    otp_id: Number;
    otp_code: String;
    constructor(
        private languageService: LanguageService,
        public authService: AuthService,
        public authDataService: AuthDataService,
        public navCtrl: NavController,
        public toastController: ToastController
    ) { }
    ngOnInit() {
    }
    close() {
        this.navCtrl.back();
    }
    sendOTP() {
        this.authDataService.sendOTP(this.newPhoneNo).subscribe( res => {
            if (!res.err) {
                this.otp_id = res.id;
                this.otp_code = res.code;
                this.presentToast("OTP sent");
            }
        });
    }
    save() {
        let tCheck = this.check();
        if (tCheck.err) {
            this.presentToast(tCheck.msg);
        } else {
            if (this.newPhoneNo.toString().length == 10) this.newPhoneNo = parseInt('91' + this.newPhoneNo.toString());
            this.authDataService.profileChangePhoneno(
                this.otp_id,
                this.otp_code,
                this.otp,
                this.authService.userAuth.phoneno,
                this.newPhoneNo,
                this.password
            ).subscribe( res => {
                if (!res.err) {
                    this.authService.userAuth.phoneno = this.newPhoneNo;
                    this.presentToast("phone number changed");
                }
            });
        }
    }
    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }
    check() {
        if (this.newPhoneNo == null || this.newPhoneNo == 0 || this.newPhoneNo.toString().length < 10 || this.newPhoneNo.toString().length > 12) return {err: true, msg: "enter correct phoneno"};
        if (this.otp == null || this.otp == 0 || this.otp.toString().length < 6) return {err: true, msg: "enter otp"};
        if (this.password == null) return {err: true, msg: "enter password"};
        return {err: false, msg: "all data is correct"};
    }
}
