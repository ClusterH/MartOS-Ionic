import { UserCoordinates } from "../models/UserCoordinates";

export type GetCategoriesRequest = {
    userCoordinates: UserCoordinates;
    country: string;
    categoryName: string;
};