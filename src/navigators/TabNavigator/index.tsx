import * as React from 'react';
import {
  useNavigationBuilder,
  TabRouter,
  TabActions,
} from '@react-navigation/native';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { softPurple } from '@colors';
import { Routes } from '@routes';
import { shadow } from 'utils';

export default ({ initialRouteName, children, screenOptions }) => {
  const { state, navigation, descriptors } = useNavigationBuilder(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  });

  return (
    <>
      <View style={styles.screenContentContainer}>
        {descriptors[state.routes[state.index].key].render()}
      </View>
      <View style={styles.container}>
        <View style={styles.tabBarContainer}>
          {state.routes.map(route => {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => {
                  navigation.dispatch({
                    ...TabActions.jumpTo(route.name),
                    target: state.key,
                  });
                }}
                style={styles.tabButtonContainer}>
                {descriptors[route.key].options.tabBarIcon({
                  focused: descriptors[route.key].navigation.isFocused(),
                })}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.cameraButtonContainer}>
          <View style={shadow}>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => navigation.navigate(Routes.Camera)}>
              <Feather name="camera" size={36} color={softPurple} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
