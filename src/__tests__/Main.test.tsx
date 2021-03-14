import * as React from 'react'
import {Routes, Route, MemoryRouter as Router} from 'react-router-dom'
import {render, screen, waitFor, waitForElementToBeRemoved, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {setupServer} from 'msw/node'
import {graphql} from 'msw'

import GraphqlContext from './helpers/GraphqlContext'
import * as queryData from './helpers/rocketData.json'

import Main from '../Main'

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const App = ({children}: {children: React.ReactNode}) => {
    return (
        <Router initialEntries={['/']}>
            <GraphqlContext>{children}</GraphqlContext>
        </Router>
    )
}

describe('Main', () => {
    test('Loads with initial table', () => {
        render(
            <App>
                <Main />
            </App>,
        )

        expect(screen.getByText('Ship Details:')).toBeInTheDocument()
    })

    test('Should be initially loading', () => {
        render(
            <App>
                <Main />
            </App>,
        )

        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    test.skip('Should load up with some rockets', async () => {})

    test.skip('Should be able to click on a row to navigate', async () => {})
})
