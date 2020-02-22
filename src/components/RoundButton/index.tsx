import React from 'react';
import { View, ViewStyle, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon, { IconNames } from '../Icon';
import styles, { caluclateContainerSize } from './styles';
import { white } from '@colors';

interface RoundButtonProps {
  size?: 'extraSmall' | 'small' | 'medium' | 'large';
  iconName: IconNames;
  iconColor?: string;
  onPress?(): void;
  buttonStyle?: ViewStyle;
  loading?: boolean;
}

const sizeMap = {
  extraSmall: 24,
  small: 32,
  medium: 48,
  large: 64,
};

export default ({
  size = 'medium',
  iconName,
  iconColor,
  onPress,
  buttonStyle,
  loading = false,
}: RoundButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          caluclateContainerSize(sizeMap[size]),
          buttonStyle,
        ]}>
        {loading ? (
          <ActivityIndicator color={white} />
        ) : (
          <Icon name={iconName} size={sizeMap[size]} color={iconColor} />
        )}
      </View>
    </TouchableOpacity>
  );
};
