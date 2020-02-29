import {DynamicStyleSheet, DynamicValue} from 'react-native-dark-mode';

const dynamicStyleSheet = new DynamicStyleSheet({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: new DynamicValue('black', 'white'),
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: new DynamicValue('#444', '#f2f2f2'),
  },
  highlight: {
    fontWeight: '700',
  },
});

export default dynamicStyleSheet;
