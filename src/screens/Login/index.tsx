import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import styles from './styles';
import { UserContext, LocalUserData, storeData } from '@utils';
import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@routes';
import { CREATE_USER } from '@gql';

export default () => {
  const [name, setName] = useState('');
  const { navigate } = useNavigation();
  const [createUser, { loading, data }] = useMutation<{
    createUser: LocalUserData;
  }>(CREATE_USER);
  const { uuid, setUser } = useContext(UserContext);

  useEffect(() => {
    const login = async userData => {
      setUser(userData);
      navigate(Routes.Main);
    };
    if (data) {
      storeData('user', data.createUser);
      login(data.createUser);
    }
  }, [data, navigate, setUser]);

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, alignSelf: 'stretch', borderWidth: 1 }}
        onChangeText={text => setName(text)}
        value={name}
        placeholder="Name"
      />
      <Button
        onPress={() => {
          createUser({ variables: { user: { uuid, name } } });
        }}
        title={loading ? 'Loading' : 'Login'}
      />
    </View>
  );
};
