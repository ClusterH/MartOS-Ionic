import { OnlineArticle } from "../../models/OnlineArticle";


export interface ShoppingList {
    id: string;
    name: string;
    type: ShoppingListType;
    productsCount: number;
    onlineArticles?: OnlineArticle[];
}

export enum ShoppingListType {
    NotPermanent,
    Permanent,
    favorites
}

export interface SingleShoppingList {
    country: string;
    id: string;
}

export interface GetShoppingListRequest {
    country: string;
}
export interface AddArticleToListRequest {
    country: string;
    id: string;
    onlineArticle: OnlineArticle;
    type: ShoppingListType;
}

export interface RemoveShoppingListRequest {
    country: string;
    itemId: number;
    articleId: number;
    refStoreId: string;
    id: string;
    type: ShoppingListType;
}


// request  /ShoppingList/update


export interface ShoopingListCreate {
    country: string;
    name: string;
    type: ShoppingListType;
}
export interface UpdateShoppingListRequest {
    country: string;
    id: string;
    name: string;
    type: ShoppingListType;
}
