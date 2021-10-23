export interface DefaultStoreType {
    details: {},
    cart?: {
        [key: string]: {
            name: string;
            count: number;
            price: number;
        },
    }
    latestOrderId?: number
}