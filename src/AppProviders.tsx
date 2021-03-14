import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <BrowserRouter>
            <ApolloProvider client={client}>{children}</ApolloProvider>
        </BrowserRouter>
    )
}

export default AppProviders
