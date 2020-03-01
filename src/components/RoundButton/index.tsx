import React from 'react';
import { View, ViewStyle, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon, { IconNames } from '../Icon';
import styles, { caluclateContainerSize } from './styles';
import { white } from '@colors';

export type RoundButtonSizes = 'extraSmall' | 'small' | 'medium' | 'large';
interface RoundButtonProps {
  size?: RoundButtonSizes;
  iconName: IconNames;
  iconColor?: string;
  onPress?(): void;
  naked?: boolean;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  loading?: boolean;
  disabled?: boolean;
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
  containerStyle,
  buttonStyle,
  naked = false,
  loading = false,
  disabled = false,
}: RoundButtonProps) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View
          style={[
            styles.container,
            caluclateContainerSize(sizeMap[size]),
            naked && styles.naked,
            buttonStyle,
          ]}>
          {loading ? (
            <ActivityIndicator color={white} />
          ) : (
            <Icon name={iconName} size={sizeMap[size]} color={iconColor} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
