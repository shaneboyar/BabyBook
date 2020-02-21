import React, { JSXElementConstructor } from 'react';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { softPurple } from '@colors';

export enum IconNames {
  Back = 'back',
  Camera = 'camera',
  Flip = 'flip',
  Pen = 'pen',
  Send = 'send',
  Video = 'video',
}

interface IconNameMap {
  [iconName: string]: {
    name: IconNames;
    base: JSXElementConstructor<IconProps>;
  };
}

const iconNameMap = {
  [IconNames.Back]: props => <Feather name="arrow-left" {...props} />,
  [IconNames.Camera]: props => <Feather name="camera" {...props} />,
  [IconNames.Flip]: props => <Feather name="refresh-ccw" {...props} />,
  [IconNames.Pen]: props => <FontAwesome5 name="pen-nib" {...props} />,
  [IconNames.Send]: props => <Feather name="send" {...props} />,
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
