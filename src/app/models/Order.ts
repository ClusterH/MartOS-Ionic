import { OrderArticle } from "./OrderArticle";

export type Order = {
    id: string;
    displayId: string;
    total: string;
    subTotal?: number;
    vat?: number;
    deliveryMode?: string;
    shippingAddress?: string;
    additionalAddress: string;
    image: string;
    name: string;
    completeAddress: string;
    deliveryDate: string;
    orderDate: string;
    articles: OrderArticle[];
    card?: {
      cardNumber: string;
      expiryDate: string;
      cardType: string;
      cardHolderName: string;
    };
    review?: any;
    deliveryType?:string;
    storeTime?: string;
    phoneNumber?: string;
    status?:boolean;
};
