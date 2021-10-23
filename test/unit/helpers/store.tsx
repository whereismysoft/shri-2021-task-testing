export interface CartItemType {
    id?: number | string
    name: string;
    desciption?: string
    count?: number;
    price: number;
    color?: string;
    material?: string
}

export interface DefaultStoreType {
    details: {},
    cart?: {
        [key: string | number]: CartItemType
    }
    latestOrderId?: number
}

export const cartItems = {
    '1': {
        "name": "Sleek Bacon",
        "count": 2,
        "price": 543
    },
    '2': {
        "name": "Fantastic Mouse",
        "count": 3,
        "price": 309
    }
}

export const defaultState = { details: {}, cart: cartItems, latestOrderId: 1 };
export const defaultEmptyState = { details: {}, cart: {}, latestOrderId: 1 }