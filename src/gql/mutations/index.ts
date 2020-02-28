import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      id
      name
      uuid
    }
  }
`;

export const CREATE_FAVORITE = gql`
  mutation CreateFavorite($favorite: FavoriteInput!) {
    createFavorite(favorite: $favorite) {
      id
      image {
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
  }
`;

export const DESTROY_FAVORITE = gql`
  mutation DestroyFavorite($favorite: FavoriteInput!) {
    destroyFavorite(favorite: $favorite) {
      id
      image {
        id
        user {
          id
        }
        favoriteUserIds
      }
    }
  }
`;

export const CREATE_IMAGE = gql`
  mutation Image($UserId: Int!, $file: Upload!, $preview: String!) {
    createImage(UserId: $UserId, file: $file, preview: $preview) {
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
