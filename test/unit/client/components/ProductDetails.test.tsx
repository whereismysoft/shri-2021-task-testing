import { fireEvent } from '@testing-library/dom';

import { ProductDetails } from '../../../../src/client/components/ProductDetails';
import { defaultState, renderApp } from '../../helpers/store'

const productData = {
    id: 2,
    name: "Tasty Cheese",
    description: "Ergonomic executive chair upholstered in bonded black leather",
    price: 362,
    color: "plum",
    material: "Metal"
}

it('Should add item to cart', () => {
    const { getByRole, getByText } = renderApp(ProductDetails, defaultState, { props: { product: productData } })
    const addToCartButton = getByRole('button', { name: /add to cart/i })

    fireEvent.click(addToCartButton)

    const addedItemLabel = getByText(/item in cart/i)

    expect(addedItemLabel).toBeInTheDocument()
})

// 

it('Should display "item in cart" if item already in cart', () => {
    const { getByText } = renderApp(
        ProductDetails,
        { ...defaultState, cart: { [productData.id]: productData } },
        { props: { product: productData } }
    )

    const addedItemLabel = getByText(/item in cart/i)

    expect(addedItemLabel).toBeInTheDocument()
})


it('Should not display text if item not in cart', () => {
    const { queryByText } = renderApp(ProductDetails, defaultState, { props: { product: productData } })

    expect(queryByText(/item in cart/i)).toBeNull()
})

it('Should display item name', () => {
    const { getByText } = renderApp(ProductDetails, defaultState, { props: { product: productData } })

    expect(getByText(productData.name)).toBeInTheDocument()
})

it('Should display description', () => {
    const { getByText } = renderApp(ProductDetails, defaultState, { props: { product: productData } })

    expect(getByText(productData.description)).toBeInTheDocument()
})

it('Should display price', () => {
    const { getByText } = renderApp(ProductDetails, defaultState, { props: { product: productData } })

    expect(getByText('$' + productData.price)).toBeInTheDocument()
})

it('Should display color', () => {
    const { getByText } = renderApp(ProductDetails, defaultState, { props: { product: productData } })

    expect(getByText(productData.color)).toBeInTheDocument()
})

it('Should display material', () => {
    const { getByText } = renderApp(ProductDetails, defaultState, { props: { product: productData } })

    expect(getByText(productData.material)).toBeInTheDocument()
})
