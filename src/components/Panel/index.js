import React from 'react';
import {View, Text, TextInput, Switch} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {useDarkModeContext} from 'react-native-dark-mode';
import Button from 'apsl-react-native-button';
import Slider from '@react-native-community/slider';
import RNPickerSelect from 'react-native-picker-select';

import {
  changeTextarea,
  changeColor,
  changeOpacity,
  showAppName,
} from '../../store/action-creators';

import dynamicStyleSheet from './styles';

function Panel() {
  const mode = useDarkModeContext();
  const currentMode = useSelector(state => state.get('currentMode') || mode);
  const opacity = useSelector(state => state.get('opacity'));
  const colors = useSelector(state => state.get('colors'));
  const colorIndex = useSelector(state => state.get('colorIndex'));
  const showName = useSelector(state => state.get('showName'));

  const currentColor = colors.get(colorIndex);
  const styles = dynamicStyleSheet[currentMode];
  const dispatch = useDispatch();

  const toggleTextarea = e => {
    const {text} = e.nativeEvent;
    dispatch(changeTextarea(text));
  };

  const toggleColor = value => {
    if (!value) {
      return;
    }
    const colorIdx = colors.findIndex(color => color.get('value') === value);
    dispatch(changeColor(colorIdx));
  };

  const toggleOpacity = value => {
    dispatch(changeOpacity(parseFloat(value)));
  };

  const toggleSwitch = value => {
    // console.log('Switch', value);
    dispatch(showAppName(value));
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
            placeholderTextColor="#999"
            multiline
            numberOfLines={2}
            maxLength={40}
            onBlur={toggleTextarea}
          />
        </View>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>颜色</Text>
        <View style={styles.itemWrapper}>
          <RNPickerSelect
            placeholder={{}}
            style={styles.itemContent}
            textInputProps={styles.itemContentTextInput}
            value={currentColor.get('value')}
            onValueChange={toggleColor}
            items={colors.toJS()}
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
            value={opacity}
            maximumTrackTintColor={currentMode === 'dark' ? '#777' : '#999'}
            onValueChange={toggleOpacity}
          />
        </View>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>显示名称</Text>
        <View style={styles.itemWrapper}>
          <Switch
            style={styles.itemContent}
            value={showName}
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
