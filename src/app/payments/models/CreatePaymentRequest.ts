import { CardDetails } from "./CardDetails";

export type CreatePaymentRequest = {
    cardDetails: CardDetails;
    isEnabled: boolean;
    country: string;
};