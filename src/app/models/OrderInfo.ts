import { PaymentStatus } from "./PaymentStatus";
import { OrderType } from "./OrderType";

export type OrderInfo = {
    id: string;
    displayId: string;
    imageUrl: string;
    creationDate: string;
    orderCompletionDate: string;
    payementStatus: PaymentStatus;
    orderType: OrderType;
    isFinished: boolean;
    total: number;
};
