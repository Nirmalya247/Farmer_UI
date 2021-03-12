import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../auth/auth.service';
import { AuthDataService } from '../../../auth/auth-data.service';
import { LanguageService } from '../../../services/language.service';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
    name: String = null;
    pincode: Number = null;
    area: String = null;
    password: String = null;
    constructor(
        private languageService: LanguageService,
        public authService: AuthService,
        public authDataService: AuthDataService,
        public navCtrl: NavController,
        public toastController: ToastController
    ) {
        this.name = this.authService.userAuth.name;
        this.pincode = this.authService.userAuth.pincode;
        this.area = this.authService.userAuth.area;
    }
    ngOnInit() {
    }
    close() {
        this.navCtrl.back();
    }
    save() {
        this.check().subscribe( resCheck => {
            if (resCheck.err) {
                this.presentToast(resCheck.msg);
            } else {
                this.authDataService.profileEdit(
                    this.name,
                    this.pincode,
                    this.area,
                    this.password
                ).subscribe( res => {
                    if (!res.err) {
                        this.authService.userAuth.name = this.name;
                        this.authService.userAuth.pincode = this.pincode;
                        this.authService.userAuth.area = this.area;
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
        return Observable.create(observer => {
            if (this.name == null || this.name == "") { observer.next({err: true, msg: "enter name"}); observer.complete(); }
            if (this.area == null || this.area == "") { observer.next({err: true, msg: "enter area"}); observer.complete(); }
            if (this.password == null) { observer.next({err: true, msg: "enter password"}); observer.complete(); }
            this.authDataService.getPincode(this.pincode).subscribe( res => {
                if (res.length == 0) { observer.next({err: true, msg: "wrong pincode"}); observer.complete(); }
                else { observer.next({err: false, msg: "all data is correct"}); observer.complete(); }
            })
        });
    }
}