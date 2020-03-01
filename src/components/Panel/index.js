import React from 'react';
import {View, Text, TextInput, Switch} from 'react-native';

import Button from 'apsl-react-native-button';
import Slider from '@react-native-community/slider';
import RNPickerSelect from 'react-native-picker-select';
import {useDarkMode, useDynamicStyleSheet} from 'react-native-dark-mode';

import dynamicStyleSheet from './styles';

function Panel() {
  const isDarkMode = useDarkMode();
  const styles = useDynamicStyleSheet(dynamicStyleSheet);

  const toggleSwitch = value => {
    console.log('Switch', value);
  };

  const previewImage = () => {
    console.log('previewImage');
  };

  const saveImage = () => {
    console.log('saveImage');
  };

  return (
    <>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>文本</Text>
        <View style={styles.itemWrapper}>
          <TextInput
            style={styles.textInput}
            autoCorrect={false}
            autoFocus={true}
            placeholder="本证件仅供XX业务使用, 其他用途无效"
            placeholderTextColor={isDarkMode ? '#999' : '#f2f2f2'}
            multiline
            numberOfLines={2}
            maxLength={40}
          />
        </View>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>颜色</Text>
        <View style={styles.itemWrapper}>
          <RNPickerSelect
            placeholder={{}}
            style={styles.itemContent}
            value="gray"
            onValueChange={value => console.log(value)}
            items={[
              {label: '白色', value: 'white'},
              {label: '灰色', value: 'gray'},
              {label: '黑色', value: 'black'},
              {label: '红色', value: 'red'},
              {label: '橙色', value: 'orange'},
              {label: '蓝色', value: 'blue'},
            ]}
          />
        </View>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>透明度</Text>
        <View style={styles.itemWrapper}>
          <Slider
            style={styles.itemContent}
            minimumValue={0.1}
            maximumValue={1}
            step={0.1}
          />
        </View>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>显示名称</Text>
        <View style={styles.itemWrapper}>
          <Switch
            style={styles.itemContent}
            value={true}
            onValueChange={toggleSwitch}
          />
        </View>
      </View>
      <View style={styles.btnWrapper}>
        <Button style={styles.btnPreviewStyle} onPress={previewImage}>
          预览
        </Button>
        <Button
          style={styles.btnSaveStyle}
          textStyle={styles.btnSaveTextStyle}
          onPress={saveImage}>
          保存
        </Button>
      </View>
    </>
  );
}

export default Panel;
