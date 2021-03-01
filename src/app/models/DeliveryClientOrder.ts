import { DeliveryArticle } from "./DeliveryArticle";
import { DeliveryRider } from "./DeliveryRider";
import { DeliveryStep } from "./DeliveryStep";
import { ListDirections } from "./ListDirections";
import { OrderStatus } from "./OrderStatus";

export type DeliveryClientOrder = {
    orderId: string;
    clientId: string;
    displayId: string;
    duration: string;
    address: string;
    nextStoreToGo: string;
    creationDate: OrderStatus;
    articles: DeliveryArticle[];
    deliveryRider: DeliveryRider;
    deliverySteps: DeliveryStep[];
    routeDirection: ListDirections;
    totalPrice: number;
    status: string;
};
