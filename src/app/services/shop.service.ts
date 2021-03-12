import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopByProduct } from '../dataTypes/shop_by_product';
//const PATH = "http://localhost:8080/";
//const PATH = "http://192.168.0.101:8080/";
const PATH = "https://thefarmerguy.herokuapp.com/";
const SESSION_ID = 'session_id';
const SESSION_USERID = 'session_userid';
@Injectable({
    providedIn: 'root'
})
export class ShopService {
    constructor(private http: HttpClient) { }
    // add / update shop
    updateShop(
        id: Number,
        name: String,
        phoneno: Number,
        alternateno: Number,
        pincode: Number,
        landmark: String,
        detail: String
        ): Observable<any> {
            //console.log("updated shop", id, name, phoneno, alternateno, pincode, landmark, detail);
            let data: FormData = new FormData();
            data.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
            data.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
            data.append("id", id.toString());
            data.append("name", name.toString());
            data.append("phoneno", phoneno.toString());
            data.append("alternateno", alternateno.toString());
            data.append("pincode", pincode.toString());
            data.append("landmark", landmark.toString());
            data.append("detail", detail.toString());
            let url = PATH + 'shops/add';
            return this.http.post<any>(url, data);
            /*
            return Observable.create(observer => {
                observer.next({ err: false, msg: "added", id: 8 });
                observer.complete();
            });
            */
    }
    // home get by product
    getByProduct(
        language: String,
        text: String,
        productid: Number,
        page: Number,
        limit: Number
        ): Observable<ShopByProduct[]> {
            let data: FormData = new FormData();
            data.append("language", language.toString());
            data.append("text", text.toString());
            data.append("productid", productid.toString());
            data.append("page", page.toString());
            data.append("limit", limit.toString());
            data.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
            data.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
            let url = PATH + 'shops/getByProduct';
            return this.http.post<ShopByProduct[]>(url, data);
    }
    // delete
    delete(
        shopid: Number
        ): Observable<any> {
            let data: FormData = new FormData();
            data.append("shopid", shopid.toString());
            data.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
            data.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
            let url = PATH + 'shops/delete';
            return this.http.post<any>(url, data);
    }
}