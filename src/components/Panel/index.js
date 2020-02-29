import React from 'react';
import {View, Text} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';

import dynamicStyleSheet from './styles';

function Panel() {
  const styles = useDynamicStyleSheet(dynamicStyleSheet);
  return (
    <>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Panel</Text>
        <Text style={styles.sectionDescription}>
          Edit <Text style={styles.highlight}>Panel</Text> to change this screen
          and then come back to see your edits.
        </Text>
      </View>
    </>
  );
}

export default Panel;
