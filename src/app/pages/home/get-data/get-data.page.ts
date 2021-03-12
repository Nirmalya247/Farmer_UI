import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../auth/auth.service';
import { Product } from '../../../dataTypes/product';
import { LanguageService } from '../../../services/language.service';
import { ProductService } from '../../../services/product.service';
import { SellRequestService } from '../../../services/sell-request.service';

@Component({
    selector: 'app-get-data',
    templateUrl: './get-data.page.html',
    styleUrls: ['./get-data.page.scss'],
})
export class GetDataPage implements OnInit {
    @Input() productID: Number;
    product: Product = new Product(0, 'name', "", "noimage", "unit", 0);
    latestPhoneno: Number;
    quantity: Number = 0;
    unit: String = "kgs";
    units = ["kgs", "grams", "tons"];
    constructor(
        private languageService: LanguageService,
        public authService: AuthService,
        public productService: ProductService,
        private activatedRoute: ActivatedRoute,
        public sellRequestService: SellRequestService,
        private router: Router,
        public navCtrl: NavController,
        public toastController: ToastController,
        public modalController: ModalController
    ) { }
    ngOnInit() {
        this.authService.check();
        //this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
        this.getProduct(this.productID);
        this.getUnits();
    }
    close() {
        this.modalController.dismiss({ 'dismissed': true });
    }
    getProduct(id: Number) {
        this.productService.getSingleById(this.languageService.selected, id).subscribe( res => {
            if (res.length > 0)
                this.product = new Product(
                    res[0].productid,
                    res[0].name,
                    res[0].description,
                    res[0].img,
                    res[0].unit,
                    res[0].price
                );
        });
    }
    getUnits() {
        this.productService.getUnits().subscribe( res => {
            for (let i = 0; i < res.length; i++) {
                if (this.units.findIndex(unit => res[i].unit.toLowerCase() == unit.toLowerCase()) < 0) {
                    this.units.push(res[i].unit);
                }
            }
        });
    }
    unitSelectChange(e) {
        this.unit = e.target.value;
    }
    ok() {
		if (this.latestPhoneno == null || this.latestPhoneno.toString().length == 0) {
			this.latestPhoneno = this.authService.userAuth.phoneno;
		}
        if (this.latestPhoneno.toString().length == 10) this.latestPhoneno = parseInt('91' + this.latestPhoneno.toString());
        this.sellRequestService.sendRequest(this.productID, 0, this.quantity, this.unit, this.latestPhoneno).subscribe( res => {
            console.log(res);
            if (!res.err) {
                this.close();
                this.router.navigate(["home", "shop", this.productID.toString()]).then(x => console.log(x));
            } else {
                this.presentToast("some error!");
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
}