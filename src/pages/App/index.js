import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
  Image,
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

import dynamicStyleSheet from './styles';

import * as actionTypes from '../../store/action-types';
import actionCreators from '../../store/action-creators';

import loadImage from '../../utils/image';

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
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const imageUrl = useSelector(state => state.get('imageUrl'));
  const image = useSelector(state => state.get('image'));
  const fillText = useSelector(state => state.get('fillText'));
  const showAppName = useSelector(state => state.get('showAppName'));
  const currentMode = useSelector(state => state.get('currentMode') || mode);

  const styles = dynamicStyleSheet[currentMode];
  const source = logoUri[currentMode];
  const modeSource = modeUri[currentMode];
  const barSource = barStyle[currentMode];
  const barBGSource = barBGStyle[currentMode];
  const dispatch = useDispatch();

  const toggleModal = func => {
    setModalVisible(!isModalVisible);
    func && typeof func === 'function' && func();
  };

  const switchMode = () => {
    dispatch(
      actionCreators[actionTypes.MODE_CHANGED](
        currentMode === 'light' ? 'dark' : 'light',
      ),
    );
  };

  const choosePic = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('用户取消了选择！');
      } else if (response.error) {
        console.error('ImagePicker发生错误：' + response.error);
      } else if (response.customButton) {
        console.warn('自定义按钮点击：' + response.customButton);
      } else {
        // let source = {uri: response.uri};
        // let source = {uri: 'data:image/jpeg;base64,' + response.data};
        setAvatarUrl(`${response.uri}`);
      }
    });
  };

  const clearImage = () => {
    setAvatarUrl('');
  };

  const handleCanvas = async canvas => {
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    dispatch(actionCreators[actionTypes.CTX_CREATED](canvas, ctx));
    // loadImage(canvas, avatarUrl)
    //   .then(image => {
    //     ctx.drawImage(image, 0, 0, 200, 200);
    //   })
    //   .catch(console.error);
  };

  const headerContent = !avatarUrl ? (
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
    <TouchableOpacity onPress={choosePic} onLongPress={toggleModal}>
      <Canvas style={styles.canvas} ref={handleCanvas} />
    </TouchableOpacity>
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
