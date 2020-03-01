import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Routes } from '@routes';
import { Card, Text, IconNames, Icon } from '@components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { TextInput, Surface, Switch } from 'react-native-paper';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { ReactNativeFile } from 'apollo-upload-client';
import { CREATE_IMAGE, GET_ALL_IMAGES } from '@gql';
import { LocationData } from '../Image';
import styles from './styles';
import { UserContext } from '@utils';

interface EntryRouteParams {
  photo: CapturedPicture;
  preview: string;
  location: LocationData;
}

type EntryRouteProps = RouteProp<
  Record<string, EntryRouteParams>,
  Routes.Entry
>;

type CapturedPicture = {
  width: number;
  height: number;
  uri: string;
};

export default () => {
  const user = useContext(UserContext);
  const [title, setTitle] = useState();
  const [story, setStory] = useState();
  const [hasMilestone, setHasMilestone] = useState(false);
  const [milestone, setMilestone] = useState();
  const [loading, setLoading] = useState(false);
  const route = useRoute<EntryRouteProps>();
  const { navigate } = useNavigation();
  const titleInputRef = useRef();
  const storyInputRef = useRef();
  const milestoneInputRef = useRef();
  const [createImage] = useMutation(CREATE_IMAGE, {
    // eslint-disable-next-line no-shadow
    update: (cache, { data: { createImage } }) => {
      const { images } = cache.readQuery({ query: GET_ALL_IMAGES });
      cache.writeQuery({
        query: GET_ALL_IMAGES,
        data: { images: [createImage, ...images] },
      });
    },
  });
  const { photo, preview, location } = route.params as EntryRouteParams;

  useEffect(() => {
    !hasMilestone && setMilestone(undefined);
  }, [hasMilestone]);

  const getInputRefs = () => [
    titleInputRef.current,
    storyInputRef.current,
    milestoneInputRef.current,
  ];

  const uploadFile = useCallback(
    async (UserId: number) => {
      setLoading(true);
      try {
        const file = new ReactNativeFile({
          uri: photo.uri,
          name: 'temp.jpg',
          type: 'image/jpeg',
        });
        await createImage({
          variables: {
            file,
            UserId,
            preview,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            title,
            story,
            milestone,
          },
        });
      } catch (error) {
        console.log('Error with image: ', error);
      }
      setLoading(false);
      navigate(Routes.Main, { screen: Routes.Feed });
    },
    [
      createImage,
      location.coords.latitude,
      location.coords.longitude,
      milestone,
      navigate,
      photo.uri,
      preview,
      story,
      title,
    ],
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
        getTextInputRefs={getInputRefs}>
        <Card
          hideFavoriteButton
          uri={photo.uri}
          preview={preview}
          disabled
          containerStyle={styles.cardContainer}
        />
        <TextInput
          label="Title"
          style={styles.inputField}
          ref={titleInputRef}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          label="Story"
          multiline
          style={[styles.inputField, styles.storyInput]}
          ref={storyInputRef}
          value={story}
          onChangeText={text => setStory(text)}
        />
        <Surface style={[styles.inputField, styles.milestoneContainer]}>
          <Text>Milestone?</Text>
          <Switch
            value={hasMilestone}
            onValueChange={() => {
              setHasMilestone(!hasMilestone);
            }}
          />
        </Surface>
        {hasMilestone && (
          <TextInput
            label="Milestone"
            style={styles.inputField}
            ref={milestoneInputRef}
            value={milestone}
            onChangeText={text => setMilestone(text)}
          />
        )}
        <TouchableOpacity
          style={styles.sendButtonContainer}
          onPress={() => uploadFile(user.id)}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Icon name={IconNames.Send} />
              <Text style={styles.sendButtonTitle} variant="bold">
                SEND
              </Text>
            </>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
