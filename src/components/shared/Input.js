import React, { useMemo } from 'react';
import {
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Theme, Controls } from '~/styles';
import { AppText } from '~/components';

export const Input = ({
  type = 'text', // text | textarea | password
  placeholder = '',
  value,
  onChange,
  titleType = 'text', // text | icon | image
  title,
  actionIcon = null,
  actionHandler = null,
  whitebg = false,
  editable = true,
  style,
  fontColor = '#000',
  ...props
}) => {
  const titleStyle = useMemo(() => {
    switch (titleType) {
      case 'text':
        return styles.titleTextWrapper;

      case 'icon':
      case 'image':
        return styles.titleIconWrapper;

      default:
        return null;
    }
  }, [titleType]);

  return (
    <View
      style={[
        styles.wrapper,
        whitebg && styles.whitebg,
        type === 'textarea' ? styles.textarea : styles.text,
        style,
      ]}>
      {title && (
        <View
          style={[
            type !== 'textarea' && ( type==='creditCard' ? styles.textWidth : titleStyle), 
            type === 'textarea' ? styles.textareaTitle : styles.title,
          ]}>
          {titleType === 'text' ? (
            <AppText style={styles.titleText}>{title}</AppText>
          ) : titleType === 'icon' ? (
            <Icon size={Controls.input.iconSize} name={title} />
          ) : (
            <Image
              style={styles.titleImage}
              source={title}
              resizeMode="contain"
            />
          )}
        </View>
      )}
      {type =='address_country' ?
      <AppText style={[
          styles.input,{marginLeft:0,paddingVertical:15,
            color: '#c8c8c8'}]}>
            {placeholder}
      </AppText> :
       <TextInput
        style={[
          (type !== 'textarea') && styles.input, {color: fontColor}, 
          (!title || type === 'textarea') && styles.padding,

        ]}
        secureTextEntry={type === 'password'}
        placeholder={placeholder}
        placeholderTextColor="#c8c8c8"
        value={value}
        autoCapitalize="none"
        onChangeText={onChange}
        editable={editable}
        multiline={type === 'textarea'}
        {...props}
      />}
      {actionIcon && actionHandler && (
        <TouchableOpacity style={styles.actionWrapper} onPress={actionHandler}>
          <Icon
            size={Controls.input.iconSize}
            color="black"
            name={actionIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Controls.input.backgroundColor,
    // width: '100%',
  },

  whitebg: {
    backgroundColor: 'white',
  },

  input: {
    flex: 1,
    fontSize: Controls.input.fontSize,
  },

  text: {
    height: Controls.input.height,
    color: Controls.input.color,
  },

  textarea: {
     height: Controls.input.textareaHeight,
     flexDirection: 'column',
  },

  textareaTitle: {
    padding: 10,
  },

  title: {
    display: 'flex',
    justifyContent: 'center',
  },

  titleTextWrapper: {
    width: Controls.input.labelTextWidth,
    paddingHorizontal: 10,
  },

  textWidth: {
    width: 137,
    paddingHorizontal: 10,
  },

  titleIconWrapper: {
    alignItems: 'center',
    width: Controls.input.labelIconWidth,
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: Controls.input.fontSize,
  },

  titleImage: {
    width: Controls.input.imageWidth,
    height: Controls.input.imageHeight,
  },

  padding: {
    paddingHorizontal: 10,
    marginTop: 0,
  },

  actionWrapper: {
    width: Controls.input.height,
    height: '100%',
    // backgroundColor: Theme.color.accentColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
