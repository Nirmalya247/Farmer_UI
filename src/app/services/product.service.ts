import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { identity, Observable } from 'rxjs';
import { Product } from '../dataTypes/product';
import { ProductSearch } from '../dataTypes/product-search';

//const PATH = "http://localhost:8080/";
//const PATH = "http://192.168.0.101:8080/";
const PATH = "https://thefarmerguy.herokuapp.com/";
const SESSION_ID = 'session_id';
const SESSION_USERID = 'session_userid';
@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) { }
    getAll(): Observable<Product[]> {
        let auth: FormData = new FormData();
        auth.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
        auth.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
        let url = PATH + 'products/getAll';
        return this.http.post<Product[]>(url, auth);
    }
    // add
    addProduct(
        name: String,
        description: String,
        img: String,
        price: Number,
        unit: String,
        demandIndex: Number
    ): Observable<any> {
        console.log("added product", name, description, img, demandIndex);
        let data: FormData = new FormData();
        data.append(SESSION_ID, window.localStorage.getItem(SESSION_ID));
        data.append(SESSION_USERID, window.localStorage.getItem(SESSION_USERID));
        data.append("name", name.toString());
        data.append("description", description.toString());
        data.append("img", img.toString());
        data.append("price", price.toString());
        data.append("unit", unit.toString());
        data.append("demandIndex", demandIndex.toString());
        let url = PATH + 'products/add';
        return this.http.post<any>(url, data);
    }
    getSingleById(
        language: String,
        id: Number
    ): Observable<any> {
        let data: FormData = new FormData();
        data.append("language", language.toString());
        data.append("id", id.toString());
        let url = PATH + 'products/getSingleById';
        return this.http.post<any>(url, data);
    }
    // home search
    search(
        language: String,
        text: String,
        page: Number,
        limit: Number
    ): Observable<ProductSearch[]> {
        let data: FormData = new FormData();
        data.append("language", language.toString());
        data.append("text", text.toString());
        data.append("page", page.toString());
        data.append("limit", limit.toString());
        let url = PATH + 'products/search';
        return this.http.post<ProductSearch[]>(url, data);
    }
    // home search
    getUnits(): Observable<any> {
        let url = PATH + 'products/getUnits';
        return this.http.get<any>(url);
    }
}