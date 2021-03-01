import { UserInfo } from "../user/models/UserInfo";
import { Address } from "./Address";
import { OnlineArticle } from "./OnlineArticle";
import { OrderType } from "./OrderType";

export type OrderProcess = {
    country: string;
    orderType: OrderType;
    price: number;
    VAT: number;
    address: Address;
    user: UserInfo;
    articles: OnlineArticle[];
}