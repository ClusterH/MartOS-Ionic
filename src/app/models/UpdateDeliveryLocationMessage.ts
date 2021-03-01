import { Location } from "./Location";

export type UpdateDeliveryLocationMessage = {
    clientId: string;
    orderId: string;
    duration: string;
    location: Location;
}; 

