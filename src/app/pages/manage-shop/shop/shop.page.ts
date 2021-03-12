import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Shop } from '../../../dataTypes/shop';
import { ShopFindService } from '../../../services/shop-find.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { SellRequestService } from '../../../services/sell-request.service';
import { Product } from '../../../dataTypes/product';
import { ProductService } from '../../../services/product.service';
import { DemandService } from '../../../services/demand.service';
import { Demand } from '../../../dataTypes/demand';
import { ShopService } from '../../../services/shop.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.page.html',
    styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
    toEdit: boolean = false;
    new: boolean = false;
    changed: boolean = false;
    shop: Shop = new Shop(0, null, null, null, null, null, null, null, null, null, null);
    products: Array<Product> = [];
    images = [
        'noimage',
        'adzuki-bean',
        'apple',
        'bananas',
        'beans',
        'bell-pepper',
        'berry',
        'black-eyed-bean',
        'black-gram-bean',
        'branch',
        'cabbage',
        'carrot',
        'chilli',
        'corn',
        'cotton',
        'dew-gram',
        'eggplant',
        'flower',
        'garlic',
        'ginger',
        'grapes',
        'green-chili-pepper',
        'green-gram',
        'green-peas',
        'honey',
        'horseradish',
        'jute',
        'kidney-bean',
        'lemon',
        'mango',
        'milk',
        'mustard',
        'nuts',
        'oil',
        'onion-2',
        'onion',
        'orange',
        'peas',
        'pineapple',
        'potato-2',
        'potato',
        'pumpkin',
        'radishes',
        'red-lentils',
        'rice-2',
        'rice',
        'sesame-2',
        'sesame',
        'soybean',
        'spinach-2',
        'spinach',
        'split-bengal-gram',
        'split-black-gram',
        'split-green-gram',
        'split-red-lentils',
        'split-skinned-black-gram',
        'split-skinned-green-gram',
        'strawberry',
        'sugar-cane',
        'watermelon',
        'wheat-2',
        'wheat',
        'white-peas',
        'yellow-pigeon-peas'
    ]
    constructor(
        public modalCtrl: ModalController,
        public location: Location,
        public navCtrl: NavController,
        public activatedRoute: ActivatedRoute,
        public toastController: ToastController,
        // services
        public authService: AuthService,
        // table service
        public shopfind: ShopFindService,
        public shopService: ShopService,
        public demandService: DemandService,
        public productService: ProductService,
        public sellRequestService: SellRequestService,
        private router: Router
    ) { }
    ngOnInit() {
        let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
        if (id > 0) {
            this.getShop(id);
            this.toEdit = true;
        } else {
            this.new = true;
        }
        this.authService.check();
        this.getAllProducts();
    }
    close() {
        this.navCtrl.back();
    }
    getShop(id: Number) {
        this.shopfind.getSingle(id).subscribe(res => {
            //console.log(res);
            if (res.length > 0)
                this.shop = new Shop(
                    res[0].id,
                    res[0].name,
                    res[0].phoneno,
                    res[0].alternateno,
                    res[0].pincode,
                    res[0].area,
                    res[0].division,
                    res[0].taluk,
                    res[0].state,
                    res[0].district,
                    res[0].detail,
                    this.demandService
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
    getAllProducts() {
        this.productService.getAll().subscribe( res => {
            //console.log(res);
            this.products = res;
        });
    }
    productSelectChange(e, demandIndex) {
        let productIndex = this.products.findIndex(product => product.productid == e.target.value);
        //console.log(e.target.value, demandIndex, productIndex);
        if (productIndex >= 0) {
            this.shop.demands[demandIndex].changed = true;
            this.shop.demands[demandIndex].new = false;
            this.shop.demands[demandIndex].productid = this.products[productIndex].productid;
            this.shop.demands[demandIndex].product_description = this.products[productIndex].description;
            this.shop.demands[demandIndex].product_name = this.products[productIndex].name;
            this.shop.demands[demandIndex].product_img = this.products[productIndex].img;
            this.shop.demands[demandIndex].unit = this.products[productIndex].unit;
            this.shop.demands[demandIndex].price = this.products[productIndex].price;
        } else {
            this.shop.demands[demandIndex].changed = true;
            this.shop.demands[demandIndex].new = true;
            this.shop.demands[demandIndex].productid = 0;
            this.shop.demands[demandIndex].product_description = null;
            this.shop.demands[demandIndex].product_name = null;
            this.shop.demands[demandIndex].product_img = "noimage";
        }
    }
    productCustomImageChange(e, demandIndex) {
        this.shop.demands[demandIndex].product_img = e.target.value;
        this.shop.demands[demandIndex].changed = true;
    }
    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }
    // update / add
    addDemand() {
        let demand: Demand = new Demand(-1, 0, null, "noimage", null, this.shop.id, null, null, null, null)
        demand.new = true;
        demand.changed = true;
        this.shop.demands.unshift(demand);
    }
    shopUpdated() { this.changed = true; }
    demandUpdated(demandIndex) { console.log("demand updated", demandIndex); this.shop.demands[demandIndex].changed = true; }
    save() {
        // update shop
        if (this.changed || this.new) {
            if (this.shop.phoneno.toString().length == 10) this.shop.phoneno = parseInt('91' + this.shop.phoneno.toString());
            if (this.shop.alternateno.toString().length == 10) this.shop.alternateno = parseInt('91' + this.shop.alternateno.toString());
            this.shopService.updateShop(
                this.shop.id,
                this.shop.name,
                this.shop.phoneno,
                this.shop.alternateno,
                this.shop.pincode,
                this.shop.area,
                this.shop.detail
            ).subscribe( resShop => {
                this.shop.id = resShop.id;
                this.changed = false;
                this.new = false;
                console.log(resShop, 'update shop');
                // add new product
                this.addProduct().subscribe( resProduct => {
                    console.log(resProduct, 'add new product');
                    // update demand
                    this.updateDemand().subscribe( resDemand => {
                        console.log(resDemand, 'update demand');
                    })
                });
            });
        } else {
            // add new product
            this.addProduct().subscribe( resProduct => {
                console.log(resProduct, 'add new product');
                // update demand
                this.updateDemand().subscribe( resDemand => {
                    console.log(resDemand, 'update demand');
                    this.presentToast("saved");
                })
            });
        }
    }
    // update
    addProduct(): Observable<String> {
        return Observable.create(observer => {
            let j = 0;
            for (let i = 0; i < this.shop.demands.length; i++) {
                if (this.shop.demands[i].productid == 0) {
                    this.productService.addProduct(
                        this.shop.demands[i].product_name,
                        this.shop.demands[i].product_description,
                        this.shop.demands[i].product_img,
                        this.shop.demands[i].price,
                        this.shop.demands[i].unit,
                        i
                    ).subscribe( res => {
                        let product: Product = new Product(res.productid, res.name, res.description, res.img, res.unit, res.price);
                        this.products.push(product);
                        this.shop.demands[res.demandIndex].productid = res.productid;
                        j++;
                        if (j == this.shop.demands.length) {
                            observer.next("ok");
                            observer.complete();
                        }
                    })
                } else {
                    j++;
                    if (j == this.shop.demands.length) {
                        observer.next("ok");
                        observer.complete();
                    }
                }
            }
        });
    }
    updateDemand(): Observable<String> {
        return Observable.create(observer => {
            let j = 0;
            for (let i = 0; i < this.shop.demands.length; i++) {
                if (this.shop.demands[i].changed || this.shop.demands[i].new) {
                    this.demandService.updateDemand(
                        this.shop.demands[i].id,
                        this.shop.demands[i].productid,
                        this.shop.id,
                        this.shop.demands[i].unit,
                        this.shop.demands[i].quantity,
                        this.shop.demands[i].price,
                        this.shop.demands[i].description,
                        i
                    ).subscribe( res => {
                        this.shop.demands[res.demandIndex].id = res.id;
                        this.shop.demands[res.demandIndex].changed = false;
                        this.shop.demands[res.demandIndex].new = false;
                        j++;
                        if (j == this.shop.demands.length) {
                            observer.next("ok");
                            observer.complete();
                        }
                    })
                } else {
                    j++;
                    if (j == this.shop.demands.length) {
                        observer.next("ok");
                        observer.complete();
                    }
                }
            }
        });
    }
    // delete
    deleteShop() {
        if (this.new) {
            this.presentToast("shop deleted");
            this.router.navigate(['manage-shop']).then(x => console.log(x));
        } else {
            for (let i = 0; i < this.shop.demands.length; i++) {
                this.demandService.delete(this.shop.demands[i].id).subscribe( res => {
                    if (!res.err) {
                        //this.presentToast("demand deleted");
                    }
                });
            }
            this.shopService.delete(this.shop.id).subscribe( res => {
                if (!res.err) {
                    this.presentToast("shop deleted");
                    this.router.navigate(['manage-shop']).then(x => console.log(x));
                } else {
                    this.presentToast(res.msg);
                }
            });
        }
    }
    deleteDemand(demandIndex) {
        if (this.shop.demands[demandIndex].new) {
            this.presentToast("demand deleted");
            this.shop.demands.splice(demandIndex, 1);
        } else {
            this.demandService.delete(this.shop.demands[demandIndex].id).subscribe( res => {
                if (!res.err) {
                    this.presentToast("demand deleted");
                    this.shop.demands.splice(demandIndex, 1);
                } else {
                    this.presentToast(res.msg);
                }
            });
        }
    }
}