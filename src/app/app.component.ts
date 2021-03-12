import { Component, OnInit, ViewChild, ɵbypassSanitizationTrustStyle } from '@angular/core';

import { IonRouterOutlet, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './services/language.service';
import { AuthService } from './auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;
    public selectedIndex = 0;
    public selectedSet = 0;
    // set 0
    public appPages = [
        {
            title: 'HOME',
            url: 'home',
            icon: 'home',
            login: false
        },
        {
            title: 'MY_SELL_REQUESTS',
            url: 'my-sell-requests',
            icon: 'cash',
            login: true
        }
    ];
    appPagesWithCheck() {
        return this.appPages.filter(x => x.login == false || (x.login == true && this.authService.loggedIn));
    }
    // set 1
    public userAnonymousPages = [
        {
            title: 'LOGIN',
            url: 'login',
            icon: 'person'
        },
        {
            title: 'REGISTER',
            url: 'register',
            icon: 'person-add'
        }
    ];
    // set 2
    public userPages = [
        {
            title: 'PROFILE',
            url: 'profile',
            icon: 'person',
            call: 'fakeCall'
        },
        {
            title: 'LOGOUT',
            url: 'login',
            icon: 'log-out',
            call: 'logout'
        }
    ];
    // set 3
    public adminPages = [
        {
            title: 'ADMIN_SELL_REQUESTS',
            url: 'admin-sell-requests',
            icon: 'cash'
        },
        {
            title: 'MANAGE_SHOP',
            url: 'manage-shop',
            icon: 'log-out'
        },
        {
            title: 'LANGUAGE',
            url: 'language',
            icon: 'language'
        }
    ];
    //public userPages = ['Login', 'Register', 'Notes', 'Work', 'Travel', 'Reminders'];


    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public languageService: LanguageService,
        public authService: AuthService,
        private router: Router,
        public navCtrl: NavController
    ) {
        this.initializeApp();
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                if (val.url.split('/')[1] == "" && !this.authService.loggedIn) {
                    this.setMenuColor('register');
                }else if (val.url.split('/')[1] == "" && this.authService.loggedIn) {
                    this.setMenuColor('home');
                } else {
                    this.setMenuColor(val.url.split('/')[1]);
                }
            }
        });
        this.platform.backButton.subscribeWithPriority(-1, () => {
            if (!this.routerOutlet.canGoBack()) {
                App.exitApp();
            }
        });
        this.languageService.setInitialAppLanguage();
        this.authService.check();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit() {
        //console.log(window.location.pathname.split('/'));
        /*
        if (window.location.pathname.split('/')[1] == "" && !this.authService.loggedIn) {
            this.setMenuColor('login');
        }else if (window.location.pathname.split('/')[1] == "" && this.authService.loggedIn) {
            this.setMenuColor('home');
        } else {
            this.setMenuColor(window.location.pathname.split('/')[1]);
        }
        */
    }
    setMenuColor(path) {
        //const path = window.location.pathname.split('/')[1];
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(page => page.url.toLowerCase() == path.toLowerCase());
            if (this.selectedIndex >= 0) this.selectedSet = 0;
            else {
                this.selectedIndex = this.userAnonymousPages.findIndex(page => page.url.toLowerCase() == path.toLowerCase());
                if (this.selectedIndex >= 0) this.selectedSet = 1;
                else {
                    this.selectedIndex = this.userPages.findIndex(page => page.url.toLowerCase() == path.toLowerCase());
                    if (this.selectedIndex >= 0) this.selectedSet = 2;
                    else {
                        this.selectedIndex = this.adminPages.findIndex(page => page.url.toLowerCase() == path.toLowerCase());
                        if (this.selectedIndex >= 0) this.selectedSet = 3;
                    }
                }
            }
        }
        //console.log('****path: ' + path + ', selectedIndex: ' + this.selectedIndex + ', selectedSet: ' + this.selectedSet);
    }
    logout() {
        this.authService.logout().subscribe(res => { });
    }
    changeLanguage(e) {
        this.languageService.setLanguage(e.target.value);
    }
    compareFnLanguage(l1, l2) {
        return l1 == l2;
    }
}