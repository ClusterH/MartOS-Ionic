import { ListDirections } from "./ListDirections";

export type UpdateDeliveryStepMessage = {
    country: string;
    orderId: string;
    duration: string;
    refStoreId: string;
    nextStoreToGo: string;
    deliveryLocation: Location;
    routeDirection: ListDirections;
}; 

