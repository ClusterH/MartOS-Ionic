import { Option } from "./Option";
import { Location } from "./Location";

export type OnlineArticle = {
    id: number;
    itemId: number;
    refStoreId: string;
    totalStock: number;
    countOnBuy: number;
    name: string;
    storeName?: string;
    location?: Location;
    price: string;
    urls: string[];
    image: string;
    vat: number;
    options: Option[];
};