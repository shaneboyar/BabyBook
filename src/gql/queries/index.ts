import { gql } from 'apollo-boost';

export const GET_FAVORITES = gql`
  query userFavorites($UserId: Int!) {
    userFavorites(UserId: $UserId) {
      id
      uri
      preview
      user {
        id
      }
      favoriteUserIds
      metadata {
        title
        story
        milestone
        latitude
        longitude
        location
        createdAt
        user
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
      }
      favoriteUserIds
      metadata {
        title
        story
        milestone
        latitude
        longitude
        location
        createdAt
        user
      }
    }
  }
`;

export const GET_IMAGE = gql`
  query Image($id: Int!) {
    image(id: $id) {
      id
      uri
      preview
      user {
        id
      }
      favoriteUserIds
      metadata {
        title
        story
        milestone
        latitude
        longitude
        location
        createdAt
        user
      }
    }
  }
`;
