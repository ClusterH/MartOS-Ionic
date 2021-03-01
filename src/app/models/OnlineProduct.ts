import { Category } from "./Category";
import { Location } from "./Location";

export type OnlineProduct = {
    ItemId: number;
    StoreId: string;
    Name: string;
    StoreName: string;
    Price: string;
    Country: string;
    CreationDate: Date;
    Location: Location[];
    Address: string;
    Categories : Category[];
};