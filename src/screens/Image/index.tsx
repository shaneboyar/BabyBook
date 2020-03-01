import React, { useCallback, useRef } from 'react';
import CardFlip from 'react-native-card-flip';
import ImageView from './ImageView';
import StoryView from './StoryView';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Routes } from '@routes';

export interface LocationData {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number;
    accuracy: number;
    heading: number;
    speed: number;
  };
  timestamp: number;
}

export interface ImageData {
  uri: string;
  preview: string;
  metadata: {
    latitude: number;
    longitude: number;
    story?: string;
    milestone?: string;
    title?: string;
    user: string;
    createdAt: string;
    location?: string;
  };
  id: number;
  favorited: boolean;
}

interface ImageRouteParams {
  image: ImageData;
  from: Routes;
}

type ImageRouteProps = RouteProp<
  Record<string, ImageRouteParams>,
  Routes.ImageScreen
>;

export default () => {
  const card = useRef<CardFlip>();
  const route = useRoute<ImageRouteProps>();
  const { image, from } = route.params as ImageRouteParams;

  const flip = useCallback(() => {
    card.current && card.current.flip();
  }, [card]);

  return (
    <CardFlip ref={card} flipZoom={0} duration={350}>
      <ImageView flip={flip} image={image} from={from} />
      <StoryView flip={flip} image={image} />
    </CardFlip>
  );
};
