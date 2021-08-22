import React, { useMemo } from 'react';
import { Text, StyleSheet, Platform } from 'react-native';

//const Entities = require('html-entities').AllHtmlEntities;
 
//const entities = new Entities();

export const AppText = ({ style = {}, children, ...props }) => {
  const styleObj = useMemo(() => {
    return Array.isArray(style)
      ? style.reduce((v, c) => ({ ...v, ...c }), { fontWeight: 'normal' })
      : style;
  }, [style]);

  return (
    <Text
      style={
        Platform.OS === 'ios'
          ? [styleObj, styles.normalStyle]
          : [
              styleObj,
              styleObj.fontWeight === 'bold' || styleObj.fontWeight >= 400
                ? styles.boldStyle
                : styles.normalStyle,
              styles.fontWeightNormal,
            ]
      }
      {...props}>
      {typeof children == 'string' ? children : children}
    </Text>
  );
};

const styles = StyleSheet.create({
  normalStyle: {
    fontFamily: 'Montserrat-Regular',
  },
  boldStyle: {
    fontFamily: 'Montserrat-Bold',
  },
  fontWeightNormal: {
    fontWeight: 'normal',
  },
});
