import { gql } from 'apollo-boost';

export const GET_FAVORITES = gql`
  query userFavorites($UserId: Int!) {
    userFavorites(UserId: $UserId) {
      id
      uri
      preview
      createdAt
      user {
        id
        name
      }
      favoriteUserIds
    }
  }
`;

export const GET_ALL_IMAGES = gql`
  query Images {
    images {
      id
      uri
      preview
      createdAt
      user {
        id
        name
      }
      favoriteUserIds
    }
  }
`;
