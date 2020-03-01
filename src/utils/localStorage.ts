import { AsyncStorage } from 'react-native';

export const storeData = async (key: string, value: string | object) => {
  try {
    const parsedValue =
      typeof value === 'object' ? JSON.stringify(value) : undefined;
    await AsyncStorage.setItem(key, parsedValue || (value as string));
  } catch (error) {
    // Error saving data
  }
};

export const retrieveData = async (key: string): Promise<string | object> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
  } catch (error) {
    // Error retrieving data
    console.error(error);
  }
};
