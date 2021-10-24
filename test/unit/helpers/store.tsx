import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history'

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
    latestOrderId?: number | undefined,
    products?: Array<CartItemType>
}

type ActionType = {
    type: string
    product?: { id: number, name: string, price: number }
}

type CartItemsType = {
    [key: string | number]: CartItemType
}

export function generateCartItems(productsArr: Array<CartItemType>) {
    return productsArr.reduce((acc: CartItemsType, item: CartItemType) => {
        acc[item.id] = {
            ...item,
            count: Math.floor(Math.random() * 20)
        }
        return acc
    }, {})
}

export const defaultState: DefaultStoreType = { details: {}, cart: {}, latestOrderId: undefined, products: [] }

export function createRootReducer(initialState: DefaultStoreType) {
    return (state = initialState, action: ActionType) => {
        switch (action.type) {
            case 'ADD_TO_CART':
                const { id, name, price } = action.product;
                const draft = { ...state.cart }

                if (!draft[id]) {
                    draft[id] = { name, count: 0, price };
                }

                draft[id].count++;
                return { ...state, cart: { ...draft }, latestOrderId: undefined } as DefaultStoreType
            case 'CLEAR_CART':
                return { ...state, cart: {}, latestOrderId: undefined } as DefaultStoreType
            default:
                return state
        }
    }
}

export function renderApp(Component: React.FC<any>, appStore: DefaultStoreType, { props = {}, initRoute = '/' } = {}) {
    const history = createMemoryHistory({
        initialEntries: [initRoute],
        initialIndex: 0
    })
    const App = ({ initStore }: { initStore: DefaultStoreType }) => (
        <Router history={history}>
            <Provider store={createStore(createRootReducer(initStore))}>
                <Component {...props} />
            </Provider>
        </Router>
    )

    return render(<App initStore={appStore} />)
}

export const products = [
    {
        "id": 0,
        "name": "Incredible Mouse",
        "price": 601
    },
    {
        "id": 1,
        "name": "Rustic Keyboard",
        "price": 674
    },
    {
        "id": 2,
        "name": "Licensed Towels",
        "price": 333
    },
    {
        "id": 3,
        "name": "Licensed Chicken",
        "price": 886
    },
    {
        "id": 4,
        "name": "Fantastic Mouse",
        "price": 164
    },
    {
        "id": 5,
        "name": "Gorgeous Bacon",
        "price": 472
    },
    {
        "id": 6,
        "name": "Handmade Bike",
        "price": 166
    },
    {
        "id": 7,
        "name": "Small Gloves",
        "price": 177
    },
    {
        "id": 8,
        "name": "Rustic Pants",
        "price": 788
    },
    {
        "id": 9,
        "name": "Fantastic Keyboard",
        "price": 171
    },
    {
        "id": 10,
        "name": "Generic Keyboard",
        "price": 301
    }
]