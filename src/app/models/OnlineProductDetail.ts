import { OptionValues } from "./OptionValues";
import { Location } from "./Location";
import { OnlineArticle } from "./OnlineArticle";

export type OnlineProductDetail = {
    itemId: number;
    referenceId: string;
    description: string;
    name: string;
    brand: string;
    storeName: string;
    address: string;
    country: string;
    location: Location;
    optionValues: OptionValues[];
    onlineArticles: OnlineArticle[];
};