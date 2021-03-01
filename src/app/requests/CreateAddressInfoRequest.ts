import { Address } from "../models/Address";

export type CreateAddressInfoRequest = {
    country: string;
    addressInfo : Address;
}; 