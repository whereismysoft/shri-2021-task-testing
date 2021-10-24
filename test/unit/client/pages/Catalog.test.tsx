import { fireEvent, findByText, getByRole, getByText } from "@testing-library/dom";
import { screen } from "@testing-library/react";
import { link } from "fs";

import { Catalog } from '../../../../src/client/pages/Catalog';
import { defaultState, products, renderApp } from '../../helpers/store'

const cartState = {
    [products[0].id]: products[0]
}

const stateWithProducts = { ...defaultState, cart: cartState, products }

it('Should display valid count of products', async () => {
    const { debug, findAllByTestId } = renderApp(Catalog, stateWithProducts)
    const productBlock = await findAllByTestId(products[0].id)
    const visibleProducts = productBlock[0].parentElement.children

    expect(visibleProducts.length).toEqual(products.length)
})


it('Added product should have "item in cart" label', async () => {
    const { findAllByTestId } = renderApp(Catalog, stateWithProducts)
    const productBlock = await findAllByTestId(products[0].id)

    expect(await findByText(productBlock[0], 'Item in cart')).toBeVisible()
})

it('Should display product name', async () => {
    const { findAllByTestId } = renderApp(Catalog, stateWithProducts)
    const item = products[1]
    const productBlock = await findAllByTestId(item.id)

    expect(getByText(productBlock[0], item.name)).toBeInTheDocument()
})

it('Should display product price', async () => {
    const { findAllByTestId } = renderApp(Catalog, stateWithProducts)
    const item = products[1]
    const productBlock = await findAllByTestId(item.id)

    expect(getByText(productBlock[0], '$' + item.price)).toBeInTheDocument()
})