import { DemandService } from "../services/demand.service";
import { ShopFindService } from "../services/shop-find.service";
import { Demand } from "./demand";

const SESSION_USERID = 'session_userid';
export class Shop {
    demands: Array<Demand> = [];
    constructor(
        id:Number,
        name:String,
        phoneno:Number,
        alternateno:Number,
        pincode:Number,
        area:String,
        division:String,
        taluk:String,
        state:String,
        district:String,
        detail:String
    )
    constructor(
        id:Number,
        name:String,
        phoneno:Number,
        alternateno:Number,
        pincode:Number,
        area:String,
        division:String,
        taluk:String,
        state:String,
        district:String,
        detail:String,
        demandService: DemandService
    )
    constructor(
        public id?:Number,
        public name?:String,
        public phoneno?:Number,
        public alternateno?:Number,
        public pincode?:Number,
        public area?:String,
        public division?:String,
        public taluk?:String,
        public state?:String,
        public district?:String,
        public detail?:String,
        public demandService?: DemandService
    ) {
        if (demandService != null) this.getDemands();
    }
    getDemands() {
        let userid: Number;
        if (window.localStorage.getItem(SESSION_USERID) == null) userid = 0;
        else userid = parseInt(window.localStorage.getItem(SESSION_USERID));
        this.demandService.getDemandsForShop(this.id, userid).subscribe( res=> {
            this.demands = [];
            for (let i = 0; i < res.length; i++) {
                let tDemand: Demand = new Demand(
                    res[i].id,
                    res[i].productid,
                    res[i].product_name,
                    res[i].product_img,
                    res[i].product_description,
                    res[i].shopid,
                    res[i].unit,
                    res[i].quantity,
                    res[i].price,
                    res[i].description
                );
                this.demands.push(tDemand);
            }
        });
    }
}