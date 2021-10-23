import React from "react";
// import '@testing-library/react/dont-cleanup-after-each'
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import { Cart } from '../../../../src/client/pages/Cart';
import { DefaultStoreType } from '../../helpers/store'

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

const defaultState = { details: {}, cart: cartItems, latestOrderId: 1 };

function createRootReducer(initialState: DefaultStoreType) {
    return (state = initialState, action: { type: string }) => {
        switch (action.type) {
            case 'CLEAR_CART':
                return { ...state, cart: {}, latestOrderId: undefined } as DefaultStoreType
            default:
                return state
        }
    }
}

function renderApp(appStore: DefaultStoreType) {
    const App = ({ initStore }: { initStore: DefaultStoreType }) => (
        <BrowserRouter>
            <Provider store={createStore(createRootReducer(initStore))}>
                <Cart />
            </Provider>
        </BrowserRouter>
    )

    return render(<App initStore={appStore} />)
}

it('Cart should contain checkout form', () => {
    const { container } = renderApp(defaultState)
    const formBlock = container.querySelector('.Form')

    expect(formBlock).toBeInTheDocument()
})

it('Cart should have added item', async () => {
    const { findByText } = renderApp(defaultState)
    const blockWithItemName = await findByText(cartItems['1'].name)

    expect(blockWithItemName).toBeDefined()
});

it('Added item have correct price', async () => {
    const { findByText } = renderApp(defaultState)
    const cartItemRowNameCell = await findByText(cartItems['1'].name)
    const childrens = Array.from(cartItemRowNameCell.parentElement.children)
    const priceBlock = childrens.find(el => el.className.includes('Price'))
    const expectedPrice = cartItems['1'].price.toString()

    expect(priceBlock.textContent).toMatch(expectedPrice)
})

it('Added item have correct total price', async () => {
    const { findByText } = renderApp(defaultState)
    const cartItemRowNameCell = await findByText(cartItems['1'].name)
    const childrens = Array.from(cartItemRowNameCell.parentElement.children)
    const totalPriceBlock = childrens.find(el => el.className.includes('Total'))
    const expectedTotalPrice = (cartItems['1'].price * cartItems['1'].count).toString()

    expect(totalPriceBlock.textContent).toMatch(expectedTotalPrice)
})

it('Cart should have correct order price', async () => {
    const { findByText } = renderApp(defaultState)
    const totalPriceTitleBlock = await findByText('Order price:')
    const cartKeys = Object.keys(cartItems) as Array<CartItemsType>
    const expectedTotalPrice = cartKeys.reduce((sum, key: CartItemsType) => sum + cartItems[key].count * cartItems[key].price, 0)

    expect(totalPriceTitleBlock.nextSibling.textContent).toMatch(expectedTotalPrice.toString())
})

it('Last order information is invisible in cart', () => {
    const { queryByText } = renderApp({ details: {}, cart: cartItems, latestOrderId: 1 })

    expect(queryByText(/order # has been successfully completed\./i)).toBeNull()
})

it('On clear button click cart is empty', async () => {
    const { getByRole, findByText } = renderApp(defaultState)
    const clearButton = getByRole('button', { name: /clear shopping cart/i })

    fireEvent.click(clearButton)

    const element = await findByText(/Cart is empty. Please select products/)

    expect(element).toBeDefined()
})

it('Empty cart should not contain checkout form', () => {
    const { container } = renderApp({ details: {}, cart: {} })
    const formBlock = container.querySelector('.Form')

    expect(formBlock).toBeFalsy()
})

it('Last order information is visible in empty cart', () => {
    const { getByText } = renderApp({ details: {}, cart: {}, latestOrderId: 1 })
    const lastOrderInfoBlock = getByText(/order # has been successfully completed\./i)

    expect(lastOrderInfoBlock).toBeInTheDocument()
})