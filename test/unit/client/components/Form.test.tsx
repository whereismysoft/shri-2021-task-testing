
import React from 'react';
// import '@testing-library/react/dont-cleanup-after-each'
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { fireEvent } from "@testing-library/dom";

import { Form } from '../../../../src/client/components/Form';
import { CheckoutFormData } from '../../../../src/common/types';

function renderForm() {
    const onFormSubmitMock = jest.fn((data) => submitData = data)
    const app = render(<Form onSubmit={onFormSubmitMock} />)
    const { getByRole } = app

    return {
        formFields: {
            nameInput: getByRole('textbox', { name: /name/i }),
            phoneInput: getByRole('textbox', { name: /phone/i }),
            addressInput: getByRole('textbox', { name: /address/i }),
            submitButton: getByRole('button', { name: /checkout/i })
        },
        onFormSubmitMock,
        app
    }
}

function changeInputValue(node: HTMLElement, value: string) {
    fireEvent.change(node, { target: { value } })

    if (node.tagName.toLocaleLowerCase() === 'textarea') {
        node.innerHTML = value
    } else {
        node.setAttribute('value', value)
    }
}

const mockedSubmitValues = {
    name: 'Petr',
    phone: '+79991234567',
    address: 'Ни дом и не улица'
}

let submitData: CheckoutFormData

it('Should not invoke submit with empty fields', async () => {
    const { formFields: { submitButton }, onFormSubmitMock } = renderForm()
    fireEvent.click(submitButton)

    expect(onFormSubmitMock.mock.calls.length).toBe(0)
})

it('Should not invoke submit with wrong phone field', async () => {
    const {
        formFields: {
            submitButton,
            nameInput,
            phoneInput,
            addressInput
        },
        onFormSubmitMock
    } = renderForm()

    changeInputValue(nameInput, mockedSubmitValues.name)
    changeInputValue(phoneInput, 'wrong phone field value')
    changeInputValue(addressInput, mockedSubmitValues.address)

    fireEvent.click(submitButton)

    expect(onFormSubmitMock.mock.calls.length).toBe(0)
})

it('Should not invoke submit with empty name field', async () => {
    const {
        formFields: {
            submitButton,
            nameInput,
            phoneInput,
            addressInput
        },
        onFormSubmitMock
    } = renderForm()

    changeInputValue(nameInput, '')
    changeInputValue(phoneInput, mockedSubmitValues.phone)
    changeInputValue(addressInput, mockedSubmitValues.address)

    fireEvent.click(submitButton)

    expect(onFormSubmitMock.mock.calls.length).toBe(0)
})

it('Should not invoke submit with empty adress field', async () => {
    const {
        formFields: {
            submitButton,
            nameInput,
            phoneInput,
            addressInput
        },
        onFormSubmitMock
    } = renderForm()

    fireEvent.change(nameInput, { target: { value: mockedSubmitValues.name } })
    fireEvent.change(phoneInput, { target: { value: mockedSubmitValues.phone } })
    fireEvent.change(addressInput, { target: { value: '' } })

    fireEvent.click(submitButton)

    expect(onFormSubmitMock.mock.calls.length).toBe(0)
})

it('Form fires submit event if fields are valid', () => {
    const {
        formFields: {
            submitButton,
            nameInput,
            phoneInput,
            addressInput
        },
        onFormSubmitMock
    } = renderForm()

    fireEvent.change(nameInput, { target: { value: mockedSubmitValues.name } })
    fireEvent.change(phoneInput, { target: { value: mockedSubmitValues.phone } })
    fireEvent.change(addressInput, { target: { value: mockedSubmitValues.address } })

    fireEvent.click(submitButton)

    expect(onFormSubmitMock.mock.calls.length).toBe(1)
})

it('Submit event arguments are correct', () => {
    expect(submitData).toEqual(mockedSubmitValues)
})