import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

// const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

export const getPushToken = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  // // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    console.error('No notification permissions!');
    return;
  }

  // Get the token that identifies this device
  const token = await Notifications.getExpoPushTokenAsync();
  return token;

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  // return fetch(PUSH_ENDPOINT, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     token: {
  //       value: token,
  //     },
  //     user: {
  //       username: 'Brent',
  //     },
  //   }),
  // });
};
