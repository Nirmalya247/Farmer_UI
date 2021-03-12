export class RequestData {
    constructor(
        public id: Number,
        public createdat: String,
        public quantity: String,
        public unit: String,
        public latestphoneno: String,
        public product_name: String,
        public user_name: String,// user
        public user_phoneno: String,
        public user_pincode: String,
        public user_state: String,
        public user_dustrict: String,
        public user_taluk: String,
        public user_division: String,
        public user_area: String
    ) { }
}