import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    constructor(
        private languageService: LanguageService,
        public authService: AuthService
    ) { }

    ngOnInit() {
    }

}
