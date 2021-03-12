import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Shop } from '../dataTypes/shop';
import { Demand } from '../dataTypes/demand';
//const PATH = "http://localhost:8080/";
//const PATH = "http://192.168.0.101:8080/";
const PATH = "https://thefarmerguy.herokuapp.com/";
@Injectable({
    providedIn: 'root'
})
export class ShopFindService {
    constructor(private http: HttpClient) { }
    find(text: String, page: Number, limit: Number): Observable<Shop[]> {
        let shopGetQuery: FormData = new FormData();
        shopGetQuery.append("text", text.toString());
        shopGetQuery.append("page", page.toString());
        shopGetQuery.append("limit", limit.toString());
        let url = PATH + 'shops/get';
        return this.http.post<Shop[]>(url, shopGetQuery);
    }
    getSingle(id: Number): Observable<Shop[]> {
        let url = PATH + 'shops/getSingle?id=' + id.toString();
        return this.http.get<Shop[]>(url);
    }
}