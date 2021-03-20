import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query{
  repositories{
    edges{
      node{
        fullName
        description
        language
        stargazersCount
        forksCount
        reviewCount
        ratingAverage
        ownerAvatarUrl
      }
    }
  }
}
`;

export const GET_SIGNED_IN_USER = gql`
query{
  authorizedUser {
    id
    username
  }
}
`