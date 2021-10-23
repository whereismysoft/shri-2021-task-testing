import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import { render, screen } from "@testing-library/react";
import { fireEvent } from '@testing-library/dom';

import { ProductDetails } from '../../../../src/client/components/ProductDetails';
import { DefaultStoreType, defaultEmptyState } from '../../helpers/store'

const productData = {
    id: 2,
    name: "Tasty Cheese",
    description: "Ergonomic executive chair upholstered in bonded black leather",
    price: 362,
    color: "plum",
    material: "Metal"
}

type ActionType = {
    type: string
    product: { id: number, name: string, price: number }
}

function createRootReducer(initialState: DefaultStoreType) {
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
            default:
                return state
        }
    }
}

function renderApp(appStore: DefaultStoreType) {
    const App = ({ initStore }: { initStore: DefaultStoreType }) => (
        <BrowserRouter>
            <Provider store={createStore(createRootReducer(initStore))}>
                <ProductDetails product={productData} />
            </Provider>
        </BrowserRouter>
    )

    return render(<App initStore={appStore} />)
}

it('Should add item to cart', () => {
    const { getByRole, getByText } = renderApp(defaultEmptyState)
    const addToCartButton = getByRole('button', { name: /add to cart/i })

    fireEvent.click(addToCartButton)

    const addedItemLabel = getByText(/item in cart/i)

    expect(addedItemLabel).toBeInTheDocument()
})

it('Should not display text if item not in cart', () => {
    const { queryByText } = renderApp(defaultEmptyState)

    expect(queryByText(/item in cart/i)).toBeNull()
})

it('Should display item name', () => {
    const { getByText } = renderApp(defaultEmptyState)

    expect(getByText(productData.name)).toBeInTheDocument()
})

it('Should display description', () => {
    const { getByText } = renderApp(defaultEmptyState)

    expect(getByText(productData.description)).toBeInTheDocument()
})

it('Should display price', () => {
    const { getByText } = renderApp(defaultEmptyState)

    expect(getByText('$' + productData.price)).toBeInTheDocument()
})

it('Should display color', () => {
    const { getByText } = renderApp(defaultEmptyState)

    expect(getByText(productData.color)).toBeInTheDocument()
})

it('Should display material', () => {
    const { getByText } = renderApp(defaultEmptyState)

    expect(getByText(productData.material)).toBeInTheDocument()
})
