import { gql } from '@apollo/client';

export const SIGN_IN = gql`
mutation signIn($username: String!, $password: String!){
  authorize(credentials: { username: $username, password: $password }) {
    accessToken
}
}
`;

export const SIGN_UP = gql`
mutation signUp($username: String!, $password: String!){
  createUser(user: { username: $username, password: $password }) {
    username
}
}
`;

export const ADD_REVIEW = gql`
mutation addReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String){
  createReview(review: {repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text}){text} 
}
`;