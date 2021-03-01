import { Option } from './Option';
import { Category } from './Category';
import { Location } from './Location';

export type ArticleData = {
    storeId: string;
    location: Location;
    country: string;
    name: string;
    brand: string;
    price: string;
    totalStock:number;
    Options: Option[];
    categories: Category[];
    articleIds: number[];
    allProductTypes: string;
    allOptions: string;
};