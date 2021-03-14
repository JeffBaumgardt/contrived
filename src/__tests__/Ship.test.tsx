import * as React from 'react'
import {Routes, Route, MemoryRouter as Router} from 'react-router-dom'
import {render, screen} from '@testing-library/react'

import GraphqlContext from './helpers/GraphqlContext'

import Ship from '../Ship'

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

    test.skip('Should load up with data', () => {})
})
