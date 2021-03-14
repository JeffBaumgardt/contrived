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
                <Routes>
                    <Route path="/:rocketId" element={<Ship />} />
                </Routes>
            </App>,
        )

        expect(screen.getByTestId('loader')).toBeInTheDocument()
    })

    test('Should load up with data', async () => {
        server.use(
            graphql.query('GetRocket', (req, res, ctx) => {
                return res(ctx.data(queryData.rocket))
            }),
        )

        render(
            <App>
                <Routes>
                    <Route path="/:rocketId" element={<Ship />} />
                </Routes>
            </App>,
        )

        await waitForElementToBeRemoved(screen.getByTestId('loader'))

        expect(screen.getByText('Starship')).toBeInTheDocument()
    })
})
