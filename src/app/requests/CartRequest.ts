import { Cart } from "../models/Cart";

export type CartRequest = {
    country: string;
    cart: Cart;
}; 