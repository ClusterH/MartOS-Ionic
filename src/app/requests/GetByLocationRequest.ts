import { UserCoordinates } from "../models/UserCoordinates";

export type GetByLocationRequest = {
    search: string;
    country: string;
    skip: number;
    take: number;
    userCoordinates: UserCoordinates;
};