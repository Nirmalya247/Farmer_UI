import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    phoneno: Number;
    password: String;
    constructor(
        private languageService: LanguageService,
        private authService: AuthService,
        private router: Router,
        public toastController: ToastController
    ) { }

    ngOnInit() {
    }
    login() {
        if (this.phoneno.toString().length == 10) this.phoneno = parseInt('91' + this.phoneno.toString());
        this.authService.login(this.phoneno, this.password).subscribe(res=> {
            if (!res.err) {
                this.phoneno = null;
                this.password = null;
                this.router.navigate(['home']).then(x => console.log(x));
            } else {
                this.presentToast(res.msg);
            }
        });
    }
    openForgotPassword() {
        if (this.phoneno == null) {
            this.presentToast("enter phone no");
            return;
        }
        window.sessionStorage.setItem("phoneno", this.phoneno.toString());
        this.router.navigate(['login', 'forgot-password']).then(x => console.log(x));
    }
    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }
}
