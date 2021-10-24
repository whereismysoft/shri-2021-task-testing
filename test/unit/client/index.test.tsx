import { Application } from '../../../src/client/Application';
import { defaultState, renderApp, products, generateCartItems } from '../helpers/store'

it('Should render catalog navigation link', () => {
    const { getByRole } = renderApp(Application, defaultState)

    expect(getByRole('link', { name: /catalog/i })).toBeInTheDocument()
})

it('Should render delivery navigation link', () => {
    const { getByRole } = renderApp(Application, defaultState)

    expect(getByRole('link', { name: /delivery/i })).toBeInTheDocument()
})

it('Should render contacts navigation link', () => {
    const { getByRole } = renderApp(Application, defaultState)

    expect(getByRole('link', { name: /contacts/i })).toBeInTheDocument()
})

it('Should render delivery empty cart navigation link', () => {
    const { getByRole } = renderApp(Application, defaultState)

    expect(getByRole('link', { name: /cart/i })).toBeInTheDocument()
})

it('Should render delivery cart link with items count', () => {
    const cartItems = generateCartItems(products.slice(0, 2))
    const { getByRole } = renderApp(Application, { ...defaultState, cart: cartItems })
    // screen.logTestingPlaygroundURL()

    const cartLinkBlock = getByRole('link', { name: /cart \(\d+\)/i })
    expect(cartLinkBlock.textContent).toContain(`(${Object.keys(cartItems).length})`)
})
