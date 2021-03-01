import { UserCoordinates } from "../models/UserCoordinates";

export type GetByCategoryRequest = {
    userCoordinates: UserCoordinates;
    country: string;
    categoryName: string;    
    skip: number;
    take: number;
}; 