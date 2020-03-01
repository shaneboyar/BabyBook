import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, RoundButton, IconNames, Icon } from '@components';
import { black } from '@colors';
import styles from './styles';
import { ImageData } from './index';
import moment from 'moment';

interface StoryViewProps {
  flip(): void;
  image: ImageData;
}

export default ({ flip, image }: StoryViewProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <RoundButton
        size="small"
        iconName={IconNames.Back}
        onPress={flip}
        naked
        iconColor={black}
        containerStyle={styles.backButton}
      />
      <View style={styles.metadataContainer}>
        <Text variant="bold" size={32}>
          {image.metadata.title}
        </Text>
        <Text>{image.metadata.story}</Text>
        <View style={styles.metadataItemContainer}>
          <View style={styles.metadataItem}>
            <Icon name={IconNames.User} color={black} />
            <Text style={styles.metadataText}>{image.metadata.user}</Text>
          </View>
          <View style={styles.metadataItem}>
            <Icon name={IconNames.Calendar} color={black} />
            <Text style={styles.metadataText}>
              {moment(image.metadata.createdAt).format('MMMM Do YYYY')}
            </Text>
          </View>
          <View style={styles.metadataItem}>
            <Icon name={IconNames.Clock} color={black} />
            <Text style={styles.metadataText}>
              {moment(image.metadata.createdAt).format('h:mm a')}
            </Text>
          </View>
          {image.metadata.location && (
            <View style={styles.metadataItem}>
              <Icon name={IconNames.Map} color={black} />
              <Text style={styles.metadataText}>{image.metadata.location}</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
