import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import styles from './styles';
import { UserContext, LocalUserData } from '@utils';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@routes';

const CREATE_USER = gql`
  mutation User($uuid: String!, $name: String!) {
    createUser(name: $name, uuid: $uuid) {
      id
      name
      uuid
    }
  }
`;

export default () => {
  const [name, setName] = useState('');
  const { navigate } = useNavigation();
  const [createUserMutation, { loading, data }] = useMutation<{
    createUser: LocalUserData;
  }>(CREATE_USER);
  const { uuid, setUser } = useContext(UserContext);

  useEffect(() => {
    const login = async userData => {
      setUser(userData);
      navigate(Routes.Main);
    };
    if (data) {
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
          createUserMutation({ variables: { uuid, name } });
        }}
        title={loading ? 'Loading' : 'Login'}
      />
    </View>
  );
};
