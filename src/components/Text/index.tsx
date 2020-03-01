import React from 'react';
import { Text, TextStyle } from 'react-native';
import { scale } from 'react-native-size-matters';

type TextVariants = 'light' | 'regular' | 'semi-bold' | 'bold' | 'extra-bold';

interface TextProps {
  size?: number;
  variant?: TextVariants;
  style?: TextStyle;
  children: string;
}

export default ({
  size = 16,
  variant = 'regular',
  style,
  children,
}: TextProps) => {
  return (
    <Text
      style={[
        {
          fontSize: scale(size),
          fontFamily: `open-sans-${variant}`,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};
