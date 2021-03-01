import { UserCoordinates } from "../models/UserCoordinates";

export type GetLatestsRequest = {
    userCoordinates: UserCoordinates;
    country: string;    
    skip: number;
    take: number;
};