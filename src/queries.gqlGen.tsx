import * as SchemaTypes from './types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetRocketsQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type GetRocketsQuery = (
  { __typename?: 'Query' }
  & { rockets?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
    { __typename: 'Rocket' }
    & Pick<SchemaTypes.Rocket, 'id' | 'name' | 'description' | 'active'>
  )>>> }
);

export type GetRocketQueryVariables = SchemaTypes.Exact<{
  rocketId: SchemaTypes.Scalars['ID'];
}>;


export type GetRocketQuery = (
  { __typename?: 'Query' }
  & { rocket?: SchemaTypes.Maybe<(
    { __typename: 'Rocket' }
    & Pick<SchemaTypes.Rocket, 'id' | 'name' | 'description' | 'active' | 'boosters' | 'cost_per_launch' | 'success_rate_pct' | 'wikipedia'>
    & { engines?: SchemaTypes.Maybe<(
      { __typename?: 'RocketEngines' }
      & Pick<SchemaTypes.RocketEngines, 'number' | 'type' | 'version'>
    )>, height?: SchemaTypes.Maybe<(
      { __typename?: 'Distance' }
      & Pick<SchemaTypes.Distance, 'feet' | 'meters'>
    )>, mass?: SchemaTypes.Maybe<(
      { __typename?: 'Mass' }
      & Pick<SchemaTypes.Mass, 'kg' | 'lb'>
    )> }
  )> }
);


export const GetRocketsDocument = gql`
    query GetRockets {
  rockets(limit: 10) {
    __typename
    id
    name
    description
    active
  }
}
    `;

/**
 * __useGetRocketsQuery__
 *
 * To run a query within a React component, call `useGetRocketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRocketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRocketsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRocketsQuery(baseOptions?: Apollo.QueryHookOptions<GetRocketsQuery, GetRocketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRocketsQuery, GetRocketsQueryVariables>(GetRocketsDocument, options);
      }
export function useGetRocketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRocketsQuery, GetRocketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRocketsQuery, GetRocketsQueryVariables>(GetRocketsDocument, options);
        }
export type GetRocketsQueryHookResult = ReturnType<typeof useGetRocketsQuery>;
export type GetRocketsLazyQueryHookResult = ReturnType<typeof useGetRocketsLazyQuery>;
export type GetRocketsQueryResult = Apollo.QueryResult<GetRocketsQuery, GetRocketsQueryVariables>;
export const GetRocketDocument = gql`
    query GetRocket($rocketId: ID!) {
  rocket(id: $rocketId) {
    __typename
    id
    name
    description
    active
    boosters
    cost_per_launch
    engines {
      number
      type
      version
    }
    height {
      feet
      meters
    }
    mass {
      kg
      lb
    }
    success_rate_pct
    wikipedia
  }
}
    `;

/**
 * __useGetRocketQuery__
 *
 * To run a query within a React component, call `useGetRocketQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRocketQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRocketQuery({
 *   variables: {
 *      rocketId: // value for 'rocketId'
 *   },
 * });
 */
export function useGetRocketQuery(baseOptions: Apollo.QueryHookOptions<GetRocketQuery, GetRocketQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRocketQuery, GetRocketQueryVariables>(GetRocketDocument, options);
      }
export function useGetRocketLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRocketQuery, GetRocketQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRocketQuery, GetRocketQueryVariables>(GetRocketDocument, options);
        }
export type GetRocketQueryHookResult = ReturnType<typeof useGetRocketQuery>;
export type GetRocketLazyQueryHookResult = ReturnType<typeof useGetRocketLazyQuery>;
export type GetRocketQueryResult = Apollo.QueryResult<GetRocketQuery, GetRocketQueryVariables>;