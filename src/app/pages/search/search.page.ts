import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';

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
        private location: Location,
        private router: Router
    ) { }

    ngOnInit() {
    }
    goback() {
        this.location.back();
        //this.router.navigate(['/home']);
        //window.history.back();
    }
}