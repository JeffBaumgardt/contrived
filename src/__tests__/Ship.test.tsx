import * as React from 'react'
import {Routes, Route, MemoryRouter as Router} from 'react-router-dom'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import {setupServer} from 'msw/node'
import {graphql} from 'msw'

import GraphqlContext from './helpers/GraphqlContext'
import * as queryData from './helpers/rocketData.json'

import Ship from '../Ship'

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const App = ({children}: {children: React.ReactNode}) => {
    return (
        <Router initialEntries={['/starship']}>
            <GraphqlContext>{children}</GraphqlContext>
        </Router>
    )
}

describe('Ship', () => {
    test('Loads with a loading bar', () => {
        render(
            <App>
                <Ship />
            </App>,
        )

        expect(screen.getByTestId('loader')).toBeInTheDocument()
    })

    test.skip('Should load up with data', async () => {})
})
