import {DynamicStyleSheet, DynamicValue} from 'react-native-dark-mode';

import {
  FONT_SIZE_BIG,
  FONT_SIZE_SMALL,
  BORDER_RADIUS_NORMAL,
} from '../../constants';

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue('white', 'black'),
  },
  scrollView: {
    backgroundColor: new DynamicValue('white', 'black'),
  },
  body: {
    backgroundColor: new DynamicValue('white', 'black'),
  },
  header: {
    marginTop: 32,
    paddingBottom: 20,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  defaultImageWrapper: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: BORDER_RADIUS_NORMAL,
  },
  defaultImage: {
    width: 80,
    height: 80,
  },
  warning: {
    color: 'red',
    marginHorizontal: 10,
    textAlign: 'center',
  },
  canvas: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    height: 160,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: BORDER_RADIUS_NORMAL,
  },
  modalViewTitle: {
    fontSize: FONT_SIZE_BIG,
    marginBottom: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  modalViewDescription: {
    fontSize: FONT_SIZE_SMALL,
    marginBottom: 14,
    textAlign: 'center',
  },
  modalViewBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalViewBtnText: {
    fontSize: FONT_SIZE_BIG,
    backgroundColor: 'yellow',
  },
  modeViewWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modeImage: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
});

export default dynamicStyleSheet;
