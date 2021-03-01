import { BillingAddress } from "./BillingAddress";

export type Card = {
    id: string;
    creationDate?: Date;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;    
    holderName: string; 
    type: string;
    billingAddress?: BillingAddress;
};