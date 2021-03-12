import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { Language } from '../dataTypes/language';
import { HttpClient } from '@angular/common/http';
import { Translate } from '../dataTypes/translate';
//const PATH = "http://localhost:8080/";
//const PATH = "http://192.168.0.101:8080/";
const PATH = "https://thefarmerguy.herokuapp.com/";
const SESSION_ID = 'session_id';
const SESSION_USERID = 'session_userid';
const LNG_KEY = 'SELECTED_LANGUAGE';
@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    selected = '';
    languages = [];

    constructor(private translate: TranslateService, private storage: Storage, private http: HttpClient) { }
    setInitialAppLanguage() {
        let language = this.translate.getBrowserLang();
        this.translate.setDefaultLang(language);
        this.storage.get(LNG_KEY).then(val => {
            if (val) {
                this.setLanguage(val);
                this.selected = val;
            } else {
                this.setLanguage("en");
                this.selected = "en";
            }
        });
        this.getLanguages().subscribe( res => {
            this.languages = res;
        });
    }

    getLanguages(): Observable<Language[]> {
        let url = PATH + 'language/getAllLanguages';
        return this.http.get<Language[]>(url);
        // return [
        //   { text: 'English', value: 'en', img: 'assets/' },
        //   { text: 'తెలుగు', value: 'te', img: 'assets/' }
        // ]
    }

    setLanguage(lng) {
        this.translate.use(lng);
        this.selected = lng;
        this.storage.set(LNG_KEY, lng);
    }
    // add language
    addLanguage(
        languagecode: String,
        name: String
        ): Observable<Language> {
            //console.log("updated shop", id, name, phoneno, alternateno, pincode, landmark, detail);
            let data: FormData = new FormData();
            data.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
            data.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
            data.append("languagecode", languagecode.toString());
            data.append("name", name.toString());
            let url = PATH + 'language/addLanguage';
            return this.http.post<Language>(url, data);
    }
    // add translate
    addTranslate(
        languagecode: String,
        en: String,
        translated: String
        ): Observable<Translate> {
            //console.log("updated shop", id, name, phoneno, alternateno, pincode, landmark, detail);
            let data: FormData = new FormData();
            data.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
            data.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
            data.append("languagecode", languagecode.toString());
            data.append("en", en.toString());
            data.append("translated", translated.toString());
            let url = PATH + 'language/addTranslate';
            return this.http.post<Translate>(url, data);
    }
    // next translate
    nextTranslate(
        languagecode: String
        ): Observable<any> {
            //console.log("updated shop", id, name, phoneno, alternateno, pincode, landmark, detail);
            let data: FormData = new FormData();
            data.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
            data.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
            data.append("languagecode", languagecode.toString());
            let url = PATH + 'language/nextTranslate';
            return this.http.post<any>(url, data);
    }
}
