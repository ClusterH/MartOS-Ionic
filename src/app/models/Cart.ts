import { OnlineArticle } from "./OnlineArticle";

export type Cart  = {
    subTotal: number;
    tax: number;
    total: number;
    onlineArticles: OnlineArticle[];
};