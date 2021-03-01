import { ListDirections } from "./ListDirections";
import { Location } from "./Location";

export type DeliveryRider = {
    orderId: string;
    deliveryUserId: string;
    name: string;
    lastName: string;
    phoneNumber: string;
    location: Location;
    imageUrl:string;
    nextStoreToGo: string;
    duration:string;
    routeDirection: ListDirections;
};
