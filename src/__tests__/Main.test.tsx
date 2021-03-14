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

    test('Should load up with some rockets', async () => {
        server.use(
            graphql.query('GetRockets', (req, res, ctx) => {
                return res(ctx.data(queryData.rockets))
            }),
        )

        render(
            <App>
                <Main />
            </App>,
        )

        await waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument())
        await waitForElementToBeRemoved(screen.getByText('Loading...'))

        const rows = queryData.rockets.rockets

        rows.forEach(rocket => {
            const row = screen.getByText(rocket.name).closest('tr')
            const utils = within(row as HTMLTableRowElement)

            expect(utils.getByText(rocket.name)).toBeInTheDocument()
            expect(utils.getByText(rocket.description)).toBeInTheDocument()
        })
    })

    test('Should be able to click on a row to navigate', async () => {
        server.use(
            graphql.query('GetRockets', (req, res, ctx) => {
                return res(ctx.data(queryData.rockets))
            }),
        )

        render(
            <App>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/starship" element={<span>Navigated</span>} />
                </Routes>
            </App>,
        )

        userEvent.click(screen.getByText('Starship'), undefined, {skipHover: true})

        await waitFor(() => expect(screen.getByText('Navigated')).toBeInTheDocument())
    })
})
