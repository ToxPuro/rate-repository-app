import { gql } from '@apollo/client';

export const GET_REPOSITORIES_BY_DATE = gql`
query by_date($keyword: String $after: String){
  repositories(orderBy: CREATED_AT, orderDirection: DESC, searchKeyword: $keyword, after: $after){
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
        id
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
}
`;

export const GET_REPOSITORIES_BY_RATING_DESC = gql`
query rating_desc($keyword: String $after: String){
  repositories(orderBy: RATING_AVERAGE, orderDirection: DESC, searchKeyword: $keyword, after: $after){
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
        id
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
}
`;

export const GET_REPOSITORIES_BY_RATING_ASC = gql`
query rating_asc($keyword: String $after: String){
  repositories(orderBy: RATING_AVERAGE, orderDirection: ASC, searchKeyword: $keyword, after: $after){
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
        id
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
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

export const GET_REVIEWS = gql`
query{
  authorizedUser {
    id
    username
    reviews{
      edges{
        node{
          id
          text 
          rating
          createdAt
          repository{
            fullName
          }
        }
      }
    }
  }
}
`



export const GET_REPOSITORY = gql`
query getRepository($id: ID! $after: String){
  repository(id: $id) {
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
    id
    url
    reviews( after: $after){
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id 
            username
          }
        }
        cursor
      }
      pageInfo{
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
`