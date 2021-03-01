export type DeliveryStep = {
    storeOrderId: string;
    refStoreId: string;
    ownerId: string;
    storeName: string;
    location: Location;
    estimatedMinutes: number;
    isPickedUp: boolean;
};
