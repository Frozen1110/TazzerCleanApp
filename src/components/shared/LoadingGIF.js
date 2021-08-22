import React from 'react';
import { Image } from 'react-native';

export const LoadingGIF = ({ size = 100, style, ...props }) => (
  <Image
    source={require('~/assets/images/loading.gif')}
    style={[{ alignSelf: 'center', width: 100, height: 100 }, style]}
  />
);
