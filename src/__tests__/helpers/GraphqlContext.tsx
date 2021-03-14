import * as React from 'react'

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost/graphql/',
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

const GraphqlContext = ({children}: {children: React.ReactNode}) => {
    return (
        <ApolloProvider client={client}>{children}</ApolloProvider>
    )
}

export default GraphqlContext
