import React from 'react';
import { View, ViewStyle, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon, { IconNames } from '../Icon';
import styles, { caluclateContainerSize } from './styles';
import { white } from '@colors';

interface RoundButtonProps {
  size?: 'small' | 'medium' | 'large';
  iconName: IconNames;
  iconColor?: string;
  onPress?(): void;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  loading?: boolean;
}

const sizeMap = {
  small: 32,
  medium: 48,
  large: 64,
};

export default ({
  size = 'medium',
  iconName,
  iconColor,
  onPress,
  containerStyle,
  buttonStyle,
  loading = false,
}: RoundButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.buttonBackground,
          caluclateContainerSize(sizeMap[size]),
          buttonStyle,
        ]}
      />
      <View style={styles.iconContainer}>
        {loading ? (
          <ActivityIndicator color={white} />
        ) : (
          <Icon name={iconName} size={sizeMap[size]} color={iconColor} />
        )}
      </View>
    </TouchableOpacity>
  );
};
