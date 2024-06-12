

export interface Irestaff {
    _id: string;
    email: string;
}
export interface IreDeliver {
    _id: string;
    email: string;
}
export interface IupDateUser {
    _id:string;
    name:string;
    username:string;
    password:string;
    email:string;
    phone:string;
}
export interface ItakeOrder {
    product_id:string; 
    user_id: string;
}