import { gql } from 'apollo-boost';

export const CREATE_FAVORITE = gql`
  mutation FavoritedImage($UserId: Int!, $ImageId: Int!) {
    createFavorite(UserId: $UserId, ImageId: $ImageId) {
      id
      uri
      likers
      createdAt
    }
  }
`;

export const CREATE_IMAGE = gql`
  mutation Image(
    $file: Upload!
    $preview: String!
    $latitude: Float!
    $longitude: Float!
    $UserId: Int!
  ) {
    createImage(
      file: $file
      preview: $preview
      latitude: $latitude
      longitude: $longitude
      UserId: $UserId
    ) {
      id
      uri
      preview
      likers
      createdAt
    }
  }
`;
