import {DynamicStyleSheet, DynamicValue} from 'react-native-dark-mode';

import {FONT_SIZE_SMALL, BORDER_RADIUS_NORMAL} from '../../constants';

const dynamicStyleSheet = new DynamicStyleSheet({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue('#f0f0f0', '#555'),
    marginHorizontal: 10,
  },
  itemTitle: {
    width: 70,
    fontSize: FONT_SIZE_SMALL,
    marginRight: 14,
    color: new DynamicValue('black', 'white'),
  },
  itemWrapper: {
    flex: 1,
  },
  textInput: {
    height: 54,
    color: new DynamicValue('black', 'white'),
    fontSize: FONT_SIZE_SMALL,
    borderWidth: 1,
    borderColor: new DynamicValue('#999', '#555'),
    borderRadius: BORDER_RADIUS_NORMAL,
    paddingHorizontal: 4,
  },
  itemContent: {
    height: 25,
  },
  btnWrapper: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  btnPreviewStyle: {
    borderColor: '#999',
    backgroundColor: '#f2f2f2',
  },
  btnSaveStyle: {
    borderColor: '#2980b9',
    backgroundColor: '#3498db',
  },
  btnSaveTextStyle: {
    color: 'white',
  },
});

export default dynamicStyleSheet;
