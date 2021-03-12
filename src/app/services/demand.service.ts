import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demand } from '../dataTypes/demand';
//const PATH = "http://localhost:8080/";
//const PATH = "http://192.168.0.101:8080/";
const PATH = "https://thefarmerguy.herokuapp.com/";
const SESSION_ID = 'session_id';
const SESSION_USERID = 'session_userid';
@Injectable({
    providedIn: 'root'
})
export class DemandService {
    constructor(private http: HttpClient) { }
    getDemandsForShop(shopID: Number, userid: Number): Observable<Demand[]> {
        let url = PATH + 'demands/getAllForShop?shopid=' + shopID.toString() + '&' + SESSION_USERID + '=' + userid.toString();
        return this.http.get<Demand[]>(url);
    }
    updateDemand(
        id: Number,
        productid: Number,
        shopid: Number,
        unit: String,
        quantity: Number,
        price: Number,
        description: String,
        demandIndex: Number
        ): Observable<any> {
            console.log("updated demand", id, productid, shopid, unit, quantity, price, description, demandIndex);
            let data: FormData = new FormData();
            data.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
            data.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
            data.append("id", id.toString());
            data.append("productid", productid.toString());
            data.append("shopid", shopid.toString());
            data.append("unit", unit.toString());
            data.append("quantity", quantity.toString());
            data.append("price", price.toString());
            data.append("description", description.toString());
            data.append("demandIndex", demandIndex.toString());
            let url = PATH + 'demands/add';
            return this.http.post<any>(url, data);
            /*
            return Observable.create(observer => {
                observer.next({ err: false, msg: "added", id: 80, demandIndex: demandIndex });
                observer.complete();
            });
            */
    }
    // delete
    delete(
        demandid: Number
        ): Observable<any> {
            let data: FormData = new FormData();
            data.append("demandid", demandid.toString());
            data.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
            data.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
            let url = PATH + 'demands/delete';
            return this.http.post<any>(url, data);
    }
}