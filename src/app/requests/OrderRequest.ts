import { OrderProcess } from "../models/OrderProcess";

export type OrderRequest = {
    order: OrderProcess;
    country: string;
};
