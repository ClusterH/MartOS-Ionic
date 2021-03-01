import { UserCoordinates } from "../models/UserCoordinates";

export type GetBySubCategoryRequest = {
    userCoordinates: UserCoordinates;
    country: string;
    SubCategoryName: string;    
    skip: number;
    take: number;
}; 