import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export const getLocationAsync = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  return location;
};
