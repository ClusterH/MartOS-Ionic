import { OnlineProduct } from "./OnlineProduct";

export type StoreItem = {
    longitude: number;
    latitude: number;
    storeId: string;
    storeName: string;
    address: string;
    postCode: string;
    image: string;
    timings: string;
    resultCount?: number;
    onlineProduct?: OnlineProduct[];
    weekTimings: string[];
};
