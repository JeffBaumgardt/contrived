import * as React from 'react'
import {Routes, Route} from 'react-router'
import AppProviders from './AppProviders'

import Main from './Main'
import Ship from './Ship'

function App() {
    return (
        <AppProviders>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/:rocketId' element={<Ship />} />
            </Routes>
        </AppProviders>
    )
}

export default App
