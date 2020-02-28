import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';

import {
  DarkModeProvider,
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Canvas from 'react-native-canvas';

import Panel from '../components/Panel';

import loadImage from '../utils/image';

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

const lightLogo = require('../assets/images/add.png');
const darkLogo = require('../assets/images/add_dark.png');
const logoUri = new DynamicValue(lightLogo, darkLogo);

function App() {
  const styles = useDynamicStyleSheet(dynamicStyleSheet);
  const source = useDynamicValue(logoUri);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  function toggleModal(func) {
    setModalVisible(!isModalVisible);
    func && typeof func === 'function' && func();
  }

  function choosePic() {
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
  }

  function clearImage() {
    setAvatarUrl('');
  }

  async function handleCanvas(canvas) {
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    loadImage(canvas, avatarUrl)
      .then(image => {
        ctx.drawImage(image, 0, 0, 200, 200);
      })
      .catch(console.error);
  }

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
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
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

const dynamicStyleSheet = new DynamicStyleSheet({
  scrollView: {
    backgroundColor: '#F3F3F3',
  },
  body: {
    flex: 1,
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

export default App;
