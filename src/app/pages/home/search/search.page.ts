import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
    searchIndex = 0;
    searchIndexes = [
        {
            text: "SHOP NAME",
            query: "q_shopName",
            value: "",
            icon: "business"
        },
        {
            text: "PRODUCTS",
            query: "q_products",
            value: "",
            icon: "pricetags"
        },
        {
            text: "PLACE",
            query: "q_place",
            value: "",
            icon: "location"
        }
    ]
    constructor(
        public modalCtrl: ModalController,
        public location: Location,
        public navCtrl: NavController
    ) { }

    ngOnInit() {
    }
    close() {
        console.log('close');
        this.navCtrl.back();
        //this.location.back();
    }
}
