import { Component, OnInit, ViewChild } from '@angular/core';
import { Shop } from '../../dataTypes/shop';
import { LanguageService } from '../../services/language.service';
import { ShopFindService } from '../../services/shop-find.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { DemandService } from '../../services/demand.service';

@Component({
    selector: 'app-manage-shop',
    templateUrl: './manage-shop.page.html',
    styleUrls: ['./manage-shop.page.scss'],
})
export class ManageShopPage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    shops: Shop[] = [];
    page = 0;
    limit: Number = 5;
    sortOn = "id";
    lastPage = false;
    searchText: String = null;
    constructor(
        private languageService: LanguageService,
        private shopfind: ShopFindService,
        private demandService: DemandService
    ) { }

    ngOnInit() {
        console.log('home page init');
        this.page = 0;
        this.lastPage = false;
        this.getShops(null);
    }
    getShopsScroll(e) {
        console.log('scroll called', this.page, this.lastPage);
        if (this.lastPage == false) {
            this.shopfind.find(this.getSearchString(), this.page, this.limit).subscribe(res => {
                for (let i = 0; i < res.length; i++) {
                    let shop = new Shop(
                        res[i].id,
                        res[i].name,
                        res[i].phoneno,
                        res[i].alternateno,
                        res[i].pincode,
                        res[i].area,
                        res[i].division,
                        res[i].taluk,
                        res[i].state,
                        res[i].district,
                        res[i].detail,
                        this.demandService
                    );
                    this.shops.push(shop);
                }
                console.log('res.length', res.length, 'this.limit', this.limit);
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
    setInfiniteScrollDisabled(val) {
        this.infiniteScroll.disabled = val;
    }
    getShops(e) {
        console.log('called', this.page, this.lastPage);
        if (this.lastPage == false) {
            if (this.page == 0) this.shops = [];
            this.shopfind.find(this.getSearchString(), this.page, this.limit).subscribe(res => {
                for (let i = 0; i < res.length; i++) {
                    let shop = new Shop(
                        res[i].id,
                        res[i].name,
                        res[i].phoneno,
                        res[i].alternateno,
                        res[i].pincode,
                        res[i].area,
                        res[i].division,
                        res[i].taluk,
                        res[i].state,
                        res[i].district,
                        res[i].detail,
                        this.demandService
                    );
                    this.shops.push(shop);
                }
                console.log('res.length', res.length, 'this.limit', this.limit);
                if (res.length < this.limit) {
                    this.lastPage = true;
                } else {
                    this.page++;
                }
                if (e != null) e.target.complete();
            });
        }
    }
    getSearchString() {
        if (this.searchText == null || this.searchText == "") {
            return ".*"
        }
        else {
            return this.searchText.split(" ").join("|");
        }
    }
    search() {
        console.log(this.searchText);
        this.page = 0;
        this.lastPage = false;
        this.setInfiniteScrollDisabled(false);
        this.getShops(null);
    }
    searchClear() {
        this.searchText = null;
        this.search();
    }
    doRefresh(e) {
        this.page = 0;
        this.lastPage = false;
        this.setInfiniteScrollDisabled(false);
        this.getShops(e);
    }
}