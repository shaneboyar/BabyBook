import { gql } from 'apollo-boost';

export const GET_FAVORITES = gql`
  query userFavorites($UserId: Int!) {
    userFavorites(UserId: $UserId) {
      id
      uri
      likers
      preview
    }
  }
`;

export const GET_ALL_IMAGES = gql`
  query images {
    images {
      id
      uri
      preview
      createdAt
      likers
    }
  }
`;
