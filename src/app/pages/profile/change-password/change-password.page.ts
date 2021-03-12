import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthDataService } from '../../../auth/auth-data.service';
import { AuthService } from '../../../auth/auth.service';
import { LanguageService } from '../../../services/language.service';
@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.page.html',
    styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
    newPassword: String = null;
    newPasswordRe: String = null;
    oldPassword: String = null;
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
    save() {
        let tCheck = this.check();
        if (tCheck.err) {
            this.presentToast(tCheck.msg);
        } else {
            this.authDataService.profileChangePassword(this.newPassword, this.oldPassword).subscribe(res => {
                if (!res.err) {
                    this.presentToast("password changed");
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
        if (this.newPassword == null || !/[a-zA-Z\d@_#$%^&]{5,}/.test(this.newPassword.toString())) return { err: true, msg: "new password accepts (a-z,A-Z,0-9,@_#$%&) and 5 char long" };
        if (this.newPasswordRe == null || (this.newPassword != this.newPasswordRe)) return { err: true, msg: "new password did not match" };
        if (this.oldPassword == null) return { err: true, msg: "enter password" };
        return { err: false, msg: "all data is correct" };
    }
}
