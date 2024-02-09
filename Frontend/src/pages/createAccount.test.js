import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import CreateAccount from './createAccount'


// Mock the API services
jest.mock('./api/accounts/accountsServices.js', () => ({
    __esModule: true,
    default: jest.fn(() => Promise.resolve()),
}))

jest.mock('./api/accounts/accountsServices.js', () => ({
    __esModule: true,
    default: jest.fn(() => Promise.resolve([{ id: 1, name: 'User 1' }])),
}))

describe('CreateAccount component', () => {

    test('disables button if inputs are empty', () => {
        render(<CreateAccount />)
        const createButton = screen.getByText('Create Account')

        expect(createButton).toBeDisabled()
    })
})
