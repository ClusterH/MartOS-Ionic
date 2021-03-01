import { OrderType } from "./OrderType";
import { PaymentStatus } from "./PaymentStatus";
import { StoreOrder } from "./StoreOrder";

export type OnlineOrder = {
    id: string;
    clientId: string;
    price: number;
    VAT: number;
    creationDate: Date;
    payementStatus: PaymentStatus;
    orderType: OrderType;
    storeOrder: StoreOrder[];
};