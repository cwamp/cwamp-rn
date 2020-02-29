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

import {
  DarkModeProvider,
  DynamicValue,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Canvas from 'react-native-canvas';

import GeneralStatusBarColor from '../../components/GeneralStatusBarColor';
import Panel from '../../components/Panel';

import dynamicStyleSheet from './styles';

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
const barStyle = new DynamicValue('dark-content', 'light-content');
const barBGStyle = new DynamicValue('white', 'black');

function App() {
  const styles = useDynamicStyleSheet(dynamicStyleSheet);
  const source = useDynamicValue(logoUri);
  const barSource = useDynamicValue(barStyle);
  const barBGSource = useDynamicValue(barBGStyle);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = func => {
    setModalVisible(!isModalVisible);
    func && typeof func === 'function' && func();
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
    loadImage(canvas, avatarUrl)
      .then(image => {
        ctx.drawImage(image, 0, 0, 200, 200);
      })
      .catch(console.error);
  };

  const image = !avatarUrl ? (
    <View>
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
    </View>
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
            {image}
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
      </SafeAreaView>
    </DarkModeProvider>
  );
}

export default App;
