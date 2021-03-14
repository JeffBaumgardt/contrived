import * as React from 'react'
import {Routes, Route, MemoryRouter as Router} from 'react-router-dom'
import {render, screen} from '@testing-library/react'

import GraphqlContext from './helpers/GraphqlContext'

import Main from '../Main'

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
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </App>,
        )

        expect(screen.getByText('Ship Details:')).toBeInTheDocument()
    })

    test('Should be initially loading', () => {
        render(
            <App>
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </App>,
        )

        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    test.skip('Should load up with some rockets', () => {})

    test.skip('Should be able to click on a row to navigate', () => {})
})
