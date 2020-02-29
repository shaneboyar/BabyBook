import React, { JSXElementConstructor } from 'react';
import { Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import { softPurple } from '@colors';

export enum IconNames {
  Award = 'award',
  Back = 'back',
  Calendar = 'calendar',
  Camera = 'camera',
  Clock = 'clock',
  Download = 'download',
  Flip = 'flip',
  Heart = 'heart',
  HeartOutline = 'heartOutline',
  Map = 'map',
  Pen = 'pen',
  Send = 'send',
  Story = 'story',
  User = 'user',
  Video = 'video',
}

interface IconNameMap {
  [iconName: string]: {
    name: IconNames;
    base: JSXElementConstructor<IconProps>;
  };
}

const iconNameMap = {
  [IconNames.Award]: props => <Feather name="award" {...props} />,
  [IconNames.Back]: props => <Feather name="arrow-left" {...props} />,
  [IconNames.Calendar]: props => <Feather name="calendar" {...props} />,
  [IconNames.Camera]: props => <Feather name="camera" {...props} />,
  [IconNames.Clock]: props => <Feather name="clock" {...props} />,
  [IconNames.Download]: props => <Feather name="download" {...props} />,
  [IconNames.Flip]: props => <Feather name="refresh-ccw" {...props} />,
  [IconNames.HeartOutline]: props => (
    <Entypo name="heart-outlined" {...props} />
  ),
  [IconNames.Heart]: props => <Entypo name="heart" {...props} />,
  [IconNames.Map]: props => <Feather name="map" {...props} />,
  [IconNames.Pen]: props => <FontAwesome5 name="pen-nib" {...props} />,
  [IconNames.Send]: props => <Feather name="send" {...props} />,
  [IconNames.Story]: props => <Feather name="book-open" {...props} />,
  [IconNames.User]: props => <Feather name="user" {...props} />,
  [IconNames.Video]: props => <Feather name="video" {...props} />,
};

interface IconProps {
  name: IconNames;
  size: number;
  color?: string;
}

export default ({ name, size = 32, color = softPurple }) => {
  const IconComponent = iconNameMap[name];
  return <IconComponent size={size} color={color} />;
};
