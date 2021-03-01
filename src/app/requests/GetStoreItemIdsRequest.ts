import { StoreItemId } from "./StoreItemId";

export type GetStoreItemIdsRequest = {
    country: string;
    StoreItemIds: StoreItemId[];
};