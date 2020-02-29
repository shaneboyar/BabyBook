import { gql } from 'apollo-boost';

export const GET_FAVORITES = gql`
  query userFavorites($UserId: Int!) {
    userFavorites(UserId: $UserId) {
      id
      uri
      preview
      user {
        id
        name
      }
      favoriteUserIds
      metadata {
        title
        story
        milestone
        latitude
        longitude
        createdAt
      }
    }
  }
`;

export const GET_ALL_IMAGES = gql`
  query Images {
    images {
      id
      uri
      preview
      user {
        id
        name
      }
      favoriteUserIds
      metadata {
        title
        story
        milestone
        latitude
        longitude
        createdAt
      }
    }
  }
`;
