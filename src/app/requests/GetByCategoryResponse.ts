import { OnlineProduct } from "../models/OnlineProduct";

export type GetByCategoryResponse = {
    categoryName: string;
    onlineProducts: OnlineProduct[];
}; 
