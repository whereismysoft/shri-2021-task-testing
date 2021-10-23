import React from "react";
import '@testing-library/react/dont-cleanup-after-each'
import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import { Cart } from '../../../../src/client/pages/Cart';

const cartItems = {
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

type CartItemsType = keyof typeof cartItems

interface DefaultState { details: {}, lastOrdered?: undefined }

const defaultState = { details: {}, cart: cartItems };

function createRootReducer(initialState: DefaultState) {
    return (state = initialState, action: { type: string }) => {
        switch (action.type) {
            case 'CLEAR_CART':
                return { ...state, cart: {}, latestOrderId: undefined } as DefaultState
            default:
                return state
        }
    }
}

const App = ({ initStore }: { initStore: DefaultState }) => (
    <BrowserRouter>
        <Provider store={createStore(createRootReducer(initStore))}>
            <Cart />
        </Provider>
    </BrowserRouter>
)

const { container, findByText, getByRole, debug, rerender } = render(<App initStore={defaultState} />)
let itemNode: undefined | HTMLElement

it('Cart should contain checkout form', () => {
    const formBlock = container.querySelector('.Form')

    expect(formBlock).toBeInTheDocument()
})

it('Cart should have added item', async () => {
    const blockWithItemName = await findByText(cartItems['1'].name)
    itemNode = blockWithItemName.parentElement

    expect(blockWithItemName).toBeDefined()
});

it('Added item have correct price', () => {
    const childrens = Array.from(itemNode.children)
    const priceBlock = childrens.find(el => el.className.includes('Price'))
    const expectedPrice = cartItems['1'].price.toString()

    expect(priceBlock.textContent).toMatch(expectedPrice)
})

it('Added item have correct total price', () => {
    const childrens = Array.from(itemNode.children)
    const totalPriceBlock = childrens.find(el => el.className.includes('Total'))
    const expectedTotalPrice = (cartItems['1'].price * cartItems['1'].count).toString()

    expect(totalPriceBlock.textContent).toMatch(expectedTotalPrice)
})

it('Cart should have correct order price', async () => {
    const totalPriceTitleBlock = await findByText('Order price:')
    const cartKeys = Object.keys(cartItems) as Array<CartItemsType>
    const expectedTotalPrice = cartKeys.reduce((sum, key: CartItemsType) => sum + cartItems[key].count * cartItems[key].price, 0)

    expect(totalPriceTitleBlock.nextSibling.textContent).toMatch(expectedTotalPrice.toString())
})

it('On clear button click cart is empty', async () => {
    const clearButton = getByRole('button', { name: /clear shopping cart/i })

    fireEvent.click(clearButton)

    const element = await findByText(/Cart is empty. Please select products/)
    expect(element).toBeDefined()
})

it('Empty cart should not contain checkout form', () => {
    const formBlock = container.querySelector('.Form')

    expect(formBlock).toBeFalsy()
})