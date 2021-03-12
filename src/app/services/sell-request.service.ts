import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestData } from '../dataTypes/request_data';
import { Shop } from '../dataTypes/shop';
//const PATH = "http://localhost:8080/";
//const PATH = "http://192.168.0.101:8080/";
const PATH = "https://thefarmerguy.herokuapp.com/";
const SESSION_ID = 'session_id';
const SESSION_USERID = 'session_userid';
const LANGUAGE = 'language';
@Injectable({
    providedIn: 'root'
})
export class SellRequestService {
    constructor(private http: HttpClient) { }
    sendRequest(productID: Number, price: Number, quantity: Number, unit: String, latestphoneno: Number): Observable<any> {
        let sellQuery: FormData = new FormData();
        sellQuery.append("productID", productID.toString());
        sellQuery.append("price", price.toString());
        sellQuery.append("quantity", quantity.toString());
        sellQuery.append("unit", unit.toString());
        sellQuery.append("latestphoneno", latestphoneno.toString());
        sellQuery.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
        sellQuery.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
        let url = PATH + 'sellRequests/sendRequest';
        return this.http.post<any>(url, sellQuery);
    }
    getByUser(language: String, page: Number, limit: Number): Observable<RequestData[]> {
        let data: FormData = new FormData();
        data.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
        data.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
        data.append(LANGUAGE, language.toString());
        data.append("page", page.toString());
        data.append("limit", limit.toString());
        let url = PATH + 'sellRequests/getByUser';
        return this.http.post<RequestData[]>(url, data);
    }
    getAll(language: String, page: Number, limit: Number): Observable<RequestData[]> {
        let data: FormData = new FormData();
        data.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
        data.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
        data.append(LANGUAGE, language.toString());
        data.append("page", page.toString());
        data.append("limit", limit.toString());
        let url = PATH + 'sellRequests/getAll';
        return this.http.post<RequestData[]>(url, data);
    }
    delete(id: Number): Observable<any> {
        let data: FormData = new FormData();
        data.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
        data.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
        data.append("id", id.toString());
        let url = PATH + 'sellRequests/delete';
        return this.http.post<any>(url, data);
    }
}