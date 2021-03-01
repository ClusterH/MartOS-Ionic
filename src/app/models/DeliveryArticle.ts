import { Option } from "./Option";

export type DeliveryArticle = {
    id: number;
    storeId: string;
    storeOrderId: string;
    name: string;
    brand: string;
    price: string;
    itemId: number;
    imageUrl: string;
    options: Option[];
    optionsStr: string;
};
