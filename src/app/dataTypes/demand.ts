export class Demand {
    public changed: boolean = false;
    public new: boolean = false;
    constructor(
        public id:Number,
        public productid:Number,
        public product_name:String,
        public product_img:String,
        public product_description:String,
        public shopid:Number,
        public unit:String,
        public quantity:Number,
        public price:Number,
        public description:String
    ) {
        this.changed = false;
        this.new = false;
    }
}