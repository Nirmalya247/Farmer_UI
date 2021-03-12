import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { RequestData } from '../../dataTypes/request_data';
import { LanguageService } from '../../services/language.service';
import { SellRequestService } from '../../services/sell-request.service';
@Component({
    selector: 'app-admin-sell-requests',
    templateUrl: './admin-sell-requests.page.html',
    styleUrls: ['./admin-sell-requests.page.scss'],
})
export class AdminSellRequestsPage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    request_datas: RequestData[] = [];
    page = 0;
    limit: Number = 5;
    lastPage = false;
    constructor(
        private languageService: LanguageService,
        public sellRequestService: SellRequestService
    ) { }
    ngOnInit() {
        this.page = 0;
        this.lastPage = false;
        this.getRequests(null);
    }
    getRequests(e) {
        //console.log('called', this.page, this.lastPage);
        if (this.lastPage == false) {
            if (this.page == 0) this.request_datas = [];
            this.sellRequestService.getAll(this.languageService.selected, this.page, this.limit).subscribe(res => {
                for (let i = 0; i < res.length; i++) {
                    res[i].user_phoneno = this.formatPhoneNumber(res[i].user_phoneno);
                    res[i].latestphoneno = this.formatPhoneNumber(res[i].latestphoneno);
                    this.request_datas.push(res[i]);
                }
                //console.log('res.length', res.length, 'this.limit', this.limit);
                if (res.length < this.limit) {
                    this.lastPage = true;
                } else {
                    this.page++;
                }
                if (e != null) e.target.complete();
            });
        }
    }
    setInfiniteScrollDisabled(val) {
        this.infiniteScroll.disabled = val;
    }
    getRequestsScroll(e) {
        //console.log('scroll called', this.page, this.lastPage);
        if (this.lastPage == false) {
            this.sellRequestService.getAll(this.languageService.selected, this.page, this.limit).subscribe(res => {
                for (let i = 0; i < res.length; i++) {
                    res[i].user_phoneno = this.formatPhoneNumber(res[i].user_phoneno);
                    res[i].latestphoneno = this.formatPhoneNumber(res[i].latestphoneno);
                    this.request_datas.push(res[i]);
                }
                //console.log('res.length', res.length, 'this.limit', this.limit);
                e.target.complete();
                if (res.length < this.limit) {
                    e.target.disabled = true;
                    this.lastPage = true;
                    console.log('scroll e off');
                } else {
                    this.page++;
                }
            });
        } else {
            e.target.complete();
        }
    }
    deleteRequest(requestId, requestIndex) {
        this.sellRequestService.delete(requestId).subscribe( res => {
            if (!res.err) {
                this.request_datas.splice(requestIndex, 1);
            }
        });
    }
    formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '+' + match[1] + ' (' + match[2] + ') ' + match[3] + '-' + match[4];
        }
        return null;
    }
    doRefresh(e) {
        this.page = 0;
        this.lastPage = false;
        this.setInfiniteScrollDisabled(false);
        this.getRequests(e);
    }
}
