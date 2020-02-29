import {DynamicStyleSheet, DynamicValue} from 'react-native-dark-mode';

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
  defaultImageWrapper: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
  },
  defaultImage: {
    width: 80,
    height: 80,
  },
  warning: {
    color: 'red',
    marginLeft: 24,
    marginRight: 24,
    textAlign: 'center',
  },
  canvas: {
    height: 200,
    width: 200,
    marginTop: 32,
    marginBottom: 24,
    alignSelf: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    height: 160,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
  },
  modalViewTitle: {
    fontSize: 20,
    marginBottom: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  modalViewDescription: {
    fontSize: 16,
    marginBottom: 14,
    textAlign: 'center',
  },
  modalViewBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalViewBtnText: {
    fontSize: 20,
    backgroundColor: 'yellow',
  },
});

export default dynamicStyleSheet;
