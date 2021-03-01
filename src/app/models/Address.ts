export type Address = {
    id : string;
    username?: string,
    indicatif?: string,
    phone?: number;
    address: string;
    postcode: string;
    optionalInfo: string;
    city: string;
    country: string;
    defaultbilling:boolean;
    defaultShipping: boolean;
};