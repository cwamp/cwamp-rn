import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {
  DarkModeProvider,
  useDarkModeContext,
  DynamicValue,
} from 'react-native-dark-mode';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Canvas from 'react-native-canvas';

import GeneralStatusBarColor from '../../components/GeneralStatusBarColor';
import Panel from '../../components/Panel';
import {
  changeMode,
  changeImage,
  loadedImage,
} from '../../store/action-creators';

import dynamicStyleSheet from './styles';

//图片选择器参数设置
const options = {
  title: '请选择图片来源',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '相册图片',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const lightLogo = require('../../assets/images/add.png');
const darkLogo = require('../../assets/images/add_dark.png');
const logoUri = new DynamicValue(lightLogo, darkLogo);

const lightModeLogo = require('../../assets/images/mode_dark.png');
const darkModeLogo = require('../../assets/images/mode_light.png');
const modeUri = new DynamicValue(lightModeLogo, darkModeLogo);

const barStyle = new DynamicValue('dark-content', 'light-content');
const barBGStyle = new DynamicValue('white', 'black');

const App = () => {
  const mode = useDarkModeContext();
  const [initialize, setInitialize] = useState(false);
  const [canvasDimensions, setCanvasDimensions] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const currentMode = useSelector(state => state.get('currentMode') || mode);
  const imageUrl = useSelector(state => state.get('imageUrl'));

  const {
    width: canvasWidth = 200,
    height: canvasHeight = 200,
  } = canvasDimensions;
  const canvasScale = canvasHeight / canvasWidth;
  const deviceWidth = Dimensions.get('window').width - 20;
  const deviceHeight = Dimensions.get('window').height;
  const windowScale = Math.floor(deviceHeight / deviceWidth);

  let scrollViewWidth, scrollViewHeight;
  if (canvasScale < windowScale) {
    scrollViewWidth = deviceWidth;
    scrollViewHeight = (deviceWidth * canvasHeight) / canvasWidth;
  } else {
    scrollViewHeight = deviceHeight;
    scrollViewWidth = (deviceHeight * canvasWidth) / canvasHeight;
  }
  console.log(scrollViewWidth, scrollViewHeight, canvasWidth, canvasHeight);

  const styles = dynamicStyleSheet[currentMode];
  const source = logoUri[currentMode];
  const modeSource = modeUri[currentMode];
  const barSource = barStyle[currentMode];
  const barBGSource = barBGStyle[currentMode];
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialize) {
      console.log('component updated.');
    }
    setInitialize(true);
  }, [initialize]);

  const toggleModal = func => {
    setModalVisible(!isModalVisible);
    func && typeof func === 'function' && func();
  };

  const switchMode = () => {
    dispatch(changeMode(currentMode === 'light' ? 'dark' : 'light'));
  };

  const choosePic = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled.');
      } else if (response.error) {
        console.error('ImagePicker发生错误：' + response.error);
      } else {
        // let source = {uri: response.uri};
        // let source = {uri: 'data:image/jpeg;base64,' + response.data};
        const {uri, type, width, height} = response;
        console.log(uri, type, width, height);
        setCanvasDimensions({width, height});
        dispatch(changeImage(uri, type));
      }
    });
  };

  const clearImage = () => {
    // todo
  };

  const handleCanvas = async canvas => {
    if (canvas) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');
      dispatch(loadedImage(canvas, ctx));
      // loadImage(canvas, imageUrl)
      //   .then(image => {
      //     ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      //   })
      //   .catch(console.error);
    }
  };

  const headerContent = !imageUrl ? (
    <>
      <TouchableWithoutFeedback onPress={choosePic}>
        <View style={styles.defaultImageWrapper}>
          <Image
            resizeMode="contain"
            source={source}
            style={styles.defaultImage}
          />
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.warning}>
        声明: 本应用不会上传任何信息到服务器, 所有操作均在本地完成.
      </Text>
    </>
  ) : (
    <TouchableWithoutFeedback onPress={choosePic} onLongPress={toggleModal}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{height: scrollViewHeight}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            width: scrollViewWidth,
            ...styles.canvasWrapper,
          }}>
          <Canvas
            style={{
              ...styles.canvas,
            }}
            ref={handleCanvas}
          />
        </ScrollView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );

  return (
    <DarkModeProvider>
      <GeneralStatusBarColor
        translucent
        backgroundColor={barBGSource}
        barStyle={barSource}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.header}>{headerContent}</View>
            <Panel />
          </View>
          <View>
            <Modal isVisible={isModalVisible}>
              <View style={styles.modalView}>
                <Text style={styles.modalViewTitle}>确认框</Text>
                <Text style={styles.modalViewDescription}>确定清除图片吗?</Text>
                <View style={styles.modalViewBtnWrapper}>
                  <TouchableOpacity onPress={toggleModal}>
                    <Text style={styles.modalViewBtnText}>取 消</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleModal(clearImage)}>
                    <Text style={styles.modalViewBtnText}>确 定</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
        <View style={styles.modeViewWrapper}>
          <TouchableOpacity onPress={switchMode}>
            <Image
              resizeMode="contain"
              source={modeSource}
              style={styles.modeImage}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </DarkModeProvider>
  );
};

export default App;
