// import '@testing-library/react/dont-cleanup-after-each'
import { fireEvent, getByText, screen } from "@testing-library/dom";

import { Cart } from '../../../../src/client/pages/Cart';
import { defaultState, renderApp, products, generateCartItems } from '../../helpers/store'

const cartItems = generateCartItems(products)
const stateWithItems = { ...defaultState, cart: cartItems }

it('Cart have correct count of items', () => {
    const { getByTestId } = renderApp(Cart, stateWithItems)
    const items = getByTestId(cartItems[0].id).parentElement.children

    expect(items.length).toEqual(Object.keys(cartItems).length)
})

it('Cart should contain checkout form', () => {
    const { container } = renderApp(Cart, stateWithItems)
    const formBlock = container.querySelector('.Form')

    expect(formBlock).toBeInTheDocument()
})

it('Cart should have added item', async () => {
    const { getByTestId } = renderApp(Cart, stateWithItems)
    const blockWithItemName = getByText(getByTestId(cartItems[0].id), cartItems[0].name)

    expect(blockWithItemName).toBeDefined()
});

it('Added item have correct price', async () => {
    const { getByTestId } = renderApp(Cart, stateWithItems)
    const itemRow = Array.from(getByTestId(cartItems[0].id).children)
    const priceBlock = itemRow.find(el => el.className.includes('Price'))
    const expectedPrice = cartItems[0].price.toString()

    expect(priceBlock.textContent).toMatch(expectedPrice)
})

it('Added item have correct total price', async () => {
    const { getByTestId } = renderApp(Cart, stateWithItems)
    const itemRow = Array.from(getByTestId(cartItems[0].id).children)
    const totalPriceBlock = itemRow.find(el => el.className.includes('Total'))
    const expectedTotalPrice = (cartItems[0].price * cartItems[0].count).toString()

    expect(totalPriceBlock.textContent).toMatch(expectedTotalPrice)
})

it('Cart should have correct order price', async () => {
    const { findByText } = renderApp(Cart, stateWithItems)
    const totalPriceTitleBlock = await findByText('Order price:')
    const cartKeys = Object.keys(cartItems)
    const expectedTotalPrice = cartKeys.reduce((sum, key) => sum + cartItems[key].count * cartItems[key].price, 0)

    expect(totalPriceTitleBlock.nextSibling.textContent).toMatch(expectedTotalPrice.toString())
})

it('Last order information is invisible in cart', () => {
    const { queryByText } = renderApp(Cart, { ...stateWithItems, latestOrderId: 1 })

    expect(queryByText(/order # has been successfully completed\./i)).toBeNull()
})

it('On clear button click cart is empty', async () => {
    const { getByRole, findByText } = renderApp(Cart, stateWithItems)
    const clearButton = getByRole('button', { name: /clear shopping cart/i })

    fireEvent.click(clearButton)

    const element = await findByText(/Cart is empty. Please select products/)

    expect(element).toBeDefined()
})

it('Empty cart should not contain checkout form', () => {
    const { container } = renderApp(Cart, defaultState)
    const formBlock = container.querySelector('.Form')

    expect(formBlock).toBeFalsy()
})

it('Last order information is visible in empty cart', () => {
    const { getByText } = renderApp(Cart, { ...defaultState, latestOrderId: 1 })
    const lastOrderInfoBlock = getByText(/order # has been successfully completed\./i)

    expect(lastOrderInfoBlock).toBeInTheDocument()
})

it('Should render catalog link if cart is empty', () => {
    const { getByRole } = renderApp(Cart, { ...defaultState })

    expect(getByRole('link', { name: /catalog/i })).toBeInTheDocument()
})