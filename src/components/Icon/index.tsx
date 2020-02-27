import React, { JSXElementConstructor } from 'react';
import { Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import { softPurple } from '@colors';

export enum IconNames {
  Award = 'award',
  Back = 'back',
  Camera = 'camera',
  Download = 'download',
  Flip = 'flip',
  Heart = 'heart',
  HeartOutline = 'heartOutline',
  Pen = 'pen',
  Send = 'send',
  Story = 'story',
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
  [IconNames.Camera]: props => <Feather name="camera" {...props} />,
  [IconNames.Download]: props => <Feather name="download" {...props} />,
  [IconNames.Flip]: props => <Feather name="refresh-ccw" {...props} />,
  [IconNames.HeartOutline]: props => (
    <Entypo name="heart-outlined" {...props} />
  ),
  [IconNames.Heart]: props => <Entypo name="heart" {...props} />,
  [IconNames.Pen]: props => <FontAwesome5 name="pen-nib" {...props} />,
  [IconNames.Send]: props => <Feather name="send" {...props} />,
  [IconNames.Story]: props => <Feather name="book-open" {...props} />,
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
