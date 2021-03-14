import * as React from 'react'
import {Routes, Route, MemoryRouter as Router} from 'react-router-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Header from '../Header'

const App = ({children}: {children: React.ReactNode}) => {
    return <Router initialEntries={['/']}>{children}</Router>
}

describe('Header', () => {
    test('Renders the header', () => {
        render(<Header />)
        expect(screen.getByText('Overly Contrived App')).toBeInTheDocument()

        // No link
        expect(screen.queryByTitle('Back home')).not.toBeInTheDocument()
    })

    test('Should render a link', () => {
        render(
            <App>
                <Header link="./" />
            </App>,
        )
        expect(screen.getByTitle('Back home')).toBeInTheDocument()
    })

    test('Should go to another route', () => {
        render(
            <App>
                <Routes>
                    <Route path="/" element={<Header link="./test" />} />
                    <Route path="/test" element={<span>Navigated</span>} />
                </Routes>
            </App>,
        )

        expect(screen.getByTitle('Back home')).toBeInTheDocument()

        userEvent.click(screen.getByTitle('Back home'))

        expect(screen.getByText('Navigated')).toBeInTheDocument()
    })
})
