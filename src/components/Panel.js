import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

class Panel extends React.Component {
  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Panel</Text>
          <Text style={styles.sectionDescription}>
            Edit <Text style={styles.highlight}>Panel</Text> to change this
            screen and then come back to see your edits.
          </Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#444',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Panel;
