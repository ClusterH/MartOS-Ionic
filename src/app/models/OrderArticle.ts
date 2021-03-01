import { Option } from "./Option";

export type OrderArticle = {
    brand: string;
    name: string;
    storeName: string;
    quantity: number;
    price: number;
    subTotal: number;
    imageUrl: string;
    options: Option[];
    optionsStr: string;
};
