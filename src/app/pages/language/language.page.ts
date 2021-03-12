import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-language',
    templateUrl: './language.page.html',
    styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
    tabIndex = "translate";
    tabIndexes = [
        {
            text: "translate",
            icon: "language"
        },
        {
            text: "add_language",
            icon: "add"
        }
    ]
    // add translate
    selectedLanguage: String;
    en: String = null;
    translated: String = null;
    // add language
    languageCode: String = null;
    languageName: String = null;
    constructor(
        private languageService: LanguageService,
        public navCtrl: NavController,
        public toastController: ToastController
    ) {
        this.selectedLanguage = this.languageService.selected;
    }
    ngOnInit() {
    }
    close() {
        this.navCtrl.back();
    }
    // selected language change
    selectedLanguageChange(e) {
        this.selectedLanguage = e.target.value;
    }
    addTranslate() {
        if (this.selectedLanguage == null || this.en == null || this.translated == null || this.en == "" || this.translated == "") {
            this.presentToast("some fields are empty");
        } else {
            this.languageService.addTranslate(this.selectedLanguage, this.en, this.translated).subscribe( res => {
                if (res.id > 0) {
                    console.log("added");
                    this.presentToast("added");
                }
            });
        }
    }
    nextTranslate() {
        this.languageService.nextTranslate(this.selectedLanguage).subscribe( res => {
            if (res.length > 0) {
                console.log("got next");
                this.en = res[0].next;
            } else this.en = null;
        });
    }
    addLanguage() {
        if (this.languageCode == null || this.languageName == null || this.languageCode == "" || this.languageName == "") {
            this.presentToast("some fields are empty");
        } else {
            this.languageService.addLanguage(this.languageCode, this.languageName).subscribe( res => {
                if (res.id > 0) {
                    console.log("added");
                    this.presentToast("added");
                    this.languageService.languages.push(res);
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
}
