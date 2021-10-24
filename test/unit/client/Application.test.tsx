import { fireEvent, screen } from '@testing-library/dom';
import { Application } from '../../../src/client/Application';
import { defaultState, renderApp, products, generateCartItems } from '../helpers/store'

it('Should render all nav links', () => {
    const { getByRole } = renderApp(Application, defaultState)

    expect(getByRole('link', { name: /catalog/i })).toBeInTheDocument()
    expect(getByRole('link', { name: /delivery/i })).toBeInTheDocument()
    expect(getByRole('link', { name: /contacts/i })).toBeInTheDocument()
    expect(getByRole('link', { name: /cart/i })).toBeInTheDocument()
})

it('Cart link have correct items count on page load', () => {
    const cartItems = generateCartItems(products.slice(0, 2))
    const { getByRole } = renderApp(Application, { ...defaultState, cart: cartItems })
    const cartLinkBlock = getByRole('link', { name: /cart \(\d+\)/i })

    expect(cartLinkBlock.textContent).toContain(`(${Object.keys(cartItems).length})`)
})

it('Cart nav link displays correct count of items', () => {
    const selectedProduct = products[0]
    const initRoute = '/catalog/' + selectedProduct.id
    const details = {
        [selectedProduct.id]: {
            ...selectedProduct,
            color: 'red',
            description: 'attractive item description',
            material: 'metal'
        }
    }
    const { getByRole } = renderApp(
        Application,
        { ...defaultState, products, details },
        { initRoute }
    )

    fireEvent.click(getByRole('button', { name: /add to cart/i }))
    fireEvent.click(getByRole('button', { name: /add to cart/i }))

    const cartLinkBlock = getByRole('link', { name: /cart \(\d+\)/i })

    expect(cartLinkBlock.textContent).toContain(`(1)`)
})

it('Cart block displays correct count of items', () => {
    const selectedProduct = products[0]
    const initRoute = '/catalog/' + selectedProduct.id
    const details = {
        [selectedProduct.id]: {
            ...selectedProduct,
            color: 'red',
            description: 'attractive item description',
            material: 'metal'
        }
    }
    const { getByRole } = renderApp(
        Application,
        { ...defaultState, products, details },
        { initRoute }
    )

    fireEvent.click(getByRole('button', { name: /add to cart/i }))
    fireEvent.click(getByRole('button', { name: /add to cart/i }))
    fireEvent.click(getByRole('button', { name: /add to cart/i }))

    fireEvent.click(getByRole('link', { name: /cart \(\d+\)/i }))

    // screen.logTestingPlaygroundURL()

    const countBlock = getByRole('cell', { name: /^3$/i })
    expect(countBlock).toBeInTheDocument()
})