import { Component, OnInit, ViewChild } from '@angular/core';
import { Shop } from '../../dataTypes/shop';
import { LanguageService } from '../../services/language.service';
import { ShopFindService } from '../../services/shop-find.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { DemandService } from '../../services/demand.service';
import { ProductSearch } from '../../dataTypes/product-search';
import { ProductService } from '../../services/product.service';
import { GetDataPage } from './get-data/get-data.page';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss', './shop-card.page.scss'],
})
export class HomePage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    products: ProductSearch[] = [];
    page = 0;
    limit: Number = 5;
    lastPage = false;
    searchText: String = null;
    constructor(
        private languageService: LanguageService,
        private productService: ProductService,
        public modalController: ModalController
    ) { }

    ngOnInit() {
        //console.log('home page init');
        this.page = 0;
        this.lastPage = false;
        this.getProducts(null);
    }
    getProductsScroll(e) {
        console.log('scroll called', this.page, this.lastPage);
        if (this.lastPage == false) {
            this.productService.search(this.languageService.selected, this.getSearchString(), this.page, this.limit).subscribe(res => {
                for (let i = 0; i < res.length; i++) this.products.push(res[i]);
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
    setInfiniteScrollDisabled(val) {
        this.infiniteScroll.disabled = val;
    }
    getProducts(e) {
        console.log('called', this.page, this.lastPage);
        if (this.lastPage == false) {
            if (this.page == 0) this.products = [];
            this.productService.search(this.languageService.selected, this.getSearchString(), this.page, this.limit).subscribe(res => {
                for (let i = 0; i < res.length; i++) this.products.push(res[i]);
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
        this.getProducts(null);
    }
    searchClear() {
        this.searchText = null;
        this.search();
    }
    doRefresh(e) {
        this.page = 0;
        this.lastPage = false;
        this.setInfiniteScrollDisabled(false);
        this.getProducts(e);
    }
    async openProduct(productID) {
        const modal = await this.modalController.create({
            component: GetDataPage,
            cssClass: './get-data/get-data.page.scss',
            componentProps: {
                'productID': productID
            }
        });
        return await modal.present();
    }
}