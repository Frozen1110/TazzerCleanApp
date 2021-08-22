import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Modal, View, Platform } from 'react-native';

import { AppText,Button } from '~/components';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '~/store/actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Notification = ({}) => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.visible) {

      if(notification.autoHide === true)
      setTimeout(() => dispatch(clearNotification()), 2000);
    }
  }, [notification]);

  const containerStyle = useMemo(
    () => (notification.type === 'success' ? styles.fullScreen : 
          (notification.type === 'fullScreen' || notification.type == 'error' ? styles.fullScreen : styles.danger) 
    ),
    [notification],
  );

  const marginTop = useMemo(
    () =>
      notification.options && notification.options.marginTop
        ? notification.options.marginTop
        : null,
    [notification],
  );

  const alignStyle = useMemo(
    () =>
      notification.options && notification.options.align === 'right'
        ? styles.alignRight
        : styles.alignLeft,
    [notification],
  );

  return (
    <Modal
      animationType="fade"
      visible={notification.visible}
      onBackdropPress={() => dispatch(clearNotification())}
      transparent={true}>
      <View
        style={[
          styles.notify,
          containerStyle,
          marginTop && {
            marginTop: marginTop,
          },
        ]}>
        {["fullScreen","error","success"].indexOf(notification.type) > -1 ? 

        <> 
        <View style={styles.fullScreenWrapper}>
          {notification.message && (
            ["error","success"].indexOf(notification.type) > -1
            ? 
            <>
            {Boolean(notification.title) && notification.title !== '' && (
              <AppText style={[styles.notifyTitle, alignStyle]}>
                {notification.title}
              </AppText>
            )}
            <Icon size={120} color={notification.type == 'success' ? '#31D457' : 'red'} name={notification.type == 'success' ?  'check-circle': 'alert'}/>
            <AppText style={[styles.notifyTitle, alignStyle,styles.paddingTop]}>
                {notification.type.toUpperCase()}!
            </AppText>
            <AppText style={[styles.notifyText, styles.alignCenter,styles.paddingTop]}>
              {notification.message}
            </AppText> 
            <Button
              type="white"
              style={{marginTop: 40}}
              fullWidth
              onClick={() => {

                if(notification.buttonAction)
                notification.buttonAction()
                
                dispatch(clearNotification())
              }}>
              {notification.buttonText ? notification.buttonText : (notification.type == 'success' ? 'Continue' : 'Try Again')}
            </Button>
            </>
            :
            notification.message)}
        </View>
        </>
        
        : 
        <>
        {Boolean(notification.title) && notification.title !== '' && (
          <AppText style={[styles.notifyTitle, alignStyle]}>
            {notification.title}
          </AppText>
        )}
        <AppText style={[styles.notifyText, alignStyle]}>
          {notification.message}
        </AppText>
        </>}
        
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  notify: {
    zIndex: 101,
    padding: 20,
    paddingTop: 50,
    marginTop: Platform.OS === 'iOS' ? 20 : 0,
  },

  success: {
    backgroundColor: '#5cc771',
  },
  danger: {
    backgroundColor: '#e02865',
  },

  fullScreen : {
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  fullScreenWrapper : {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    flexGrow : 1
  },

  alignLeft: {
    textAlign: 'left',
  },
  alignRight: {
    textAlign: 'right',
  },
  alignCenter: {
    textAlign: 'center'
  },

  notifyTitle: {
    textAlign: 'right',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },

  notifyText: {
    textAlign: 'right',
    fontSize: 16,
    color: 'white',
  },

  paddingTop : {
    paddingTop: 10
  }
});
