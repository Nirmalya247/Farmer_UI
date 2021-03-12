import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { ToastController  } from '@ionic/angular';
import { Shop } from '../../../dataTypes/shop';
import { ShopFindService } from '../../../services/shop-find.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { SellRequestService } from '../../../services/sell-request.service';
import { DemandService } from '../../../services/demand.service';
import { ProductService } from '../../../services/product.service';
import { ShopService } from '../../../services/shop.service';
import { LanguageService } from '../../../services/language.service';
import { Product } from '../../../dataTypes/product';
import { ShopByProduct } from '../../../dataTypes/shop_by_product';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.page.html',
    styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    productId: Number;
    product: Product = new Product(0, 'name', "", "noimage", "unit", 0);
    shopByProduct: ShopByProduct[] = [];
    page = 0;
    limit: Number = 5;
    lastPage = false;
    searchText: String = null;
    constructor(
        private languageService: LanguageService,
        public modalCtrl: ModalController,
        public location: Location,
        public navCtrl: NavController,
        public productService: ProductService,
        public shopService: ShopService,

        public demandService: DemandService,
        private activatedRoute: ActivatedRoute,
        public authService: AuthService,
        public sellRequestService: SellRequestService,
        public toastController: ToastController
    ) { }
    ngOnInit() {
        this.authService.check();
        this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
        this.getProduct(this.productId);
        this.page = 0;
        this.lastPage = false;
        this.getShops();
    }
    close() {
        this.navCtrl.back();
    }
    getProduct(id: Number) {
        this.productService.getSingleById(this.languageService.selected, id).subscribe(res => {
            if (res.length > 0)
                this.product = new Product(
                    res[0].productid,
                    res[0].name,
                    res[0].description,
                    res[0].img,
                    res[0].unit,
                    res[0].price,
                );
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
    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }
    getShopsScroll(e) {
        //console.log('scroll called', this.page, this.lastPage);
        if (this.lastPage == false) {
            this.shopService.getByProduct(this.languageService.selected, "", this.productId, this.page, this.limit).subscribe(res => {
                for (let i = 0; i < res.length; i++) this.shopByProduct.push(res[i]);
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
    getShops() {
        // console.log('called', this.page, this.lastPage);
        if (this.lastPage == false) {
            if (this.page == 0) this.shopByProduct = [];
            this.shopService.getByProduct(this.languageService.selected, "", this.productId, this.page, this.limit).subscribe(res => {
                for (let i = 0; i < res.length; i++) this.shopByProduct.push(res[i]);
                // console.log('res.length', res.length, 'this.limit', this.limit);
                if (res.length < this.limit) {
                    this.lastPage = true;
                } else {
                    this.page++;
                }
                console.log(this.shopByProduct, res);
            });
        }
    }
}