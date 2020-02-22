// import { gql } from 'apollo-boost';
// import { useLazyQuery } from '@apollo/react-hooks';
// import { useEffect, useState } from 'react';
// import { registerForPushNotificationsAsync } from '@utils';

// const GET_USER_BY_UUID = gql`
//   query User($uuid: String!) {
//     getUserByUUID(uuid: $uuid) {
//       id
//       name
//       uuid
//     }
//   }
// `;

export const useUser = () => {
  // const [uuid, setUUID] = useState();
  // const [getUser, { loading, error, data }] = useLazyQuery(GET_USER_BY_UUID);
  // useEffect(() => {
  //   const setupPush = async () => {
  //     const token = await registerForPushNotificationsAsync();
  //     setUUID(token);
  //   };
  //   setupPush();
  // }, []);
  // console.log('data: ', data);
  // useEffect(() => {
  //   if (uuid) {
  //     console.log('uuid: ', uuid);
  //     getUser({ variables: { uuid } });
  //   }
  // }, [getUser, uuid]);
  // if (!uuid || loading) {
  //   return [{}, true];
  // }
  // if (error) {
  //   console.log('error: ', error);
  //   return [{}, false];
  // }
  // if (data) {
  //   return [data, false];
  // }
  // return [{}, true];
};
