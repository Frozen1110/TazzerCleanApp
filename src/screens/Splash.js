import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigationService } from '~/core/services';
import { Screen, AppText, Button } from '~/components';

import { fetchAPI } from '~/core/utility';
import { setUserInfo, setToken, signOut, setOrder } from '~/store/actions';
import { Theme } from '~/styles';

export const SplashScreen = () => {
    return (
      <Screen
        align="center"
        backgroundImage={require('~/assets/images/back3.jpg')}
        >
        <View style={styles.container}>
          <Image
            source={require('~/assets/images/logo.svg')}
            style={styles.logo}
          />
          <AppText style={[styles.heading]}>WELCOME TO</AppText>
          <AppText style={[styles.heading, styles.accentColor]}>TAZZERCLEAN</AppText>
          <AppText style={styles.subheading}>Book & Service</AppText>
          <Button
              type="accent"
              style={{marginTop: 60}}
              fullWidth
              onClick={() => {
                NavigationService.navigate('Login',{role: 'USER'});
              }}>
                LOGIN
          </Button>
          <Button
              type="accent"
              style={{marginTop: 20}}
              fullWidth
              onClick={() => {
                NavigationService.navigate('Signup');
              }}>
                SIGN UP
          </Button>
        </View>
      </Screen>
    );
};

SplashScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    paddingHorizontal: Theme.layout.screenPaddingHorizontal,
    paddingTop: Theme.layout.screenPaddingTop,
    paddingBottom: Theme.layout.screenPaddingBottom,

    display: 'flex',
    minHeight: '100%',
  },

  logo: {
    width: '80%',
    height: 80,
    resizeMode: 'contain',
    margin: 'auto',
    marginBottom: 120,
    marginTop: 30
  },

  accentColor: {
    color: Theme.color.accentColor,
  },

  heading: {
    color: '#FFF',
    fontSize: 40,
    letterSpacing: 2,
    fontWeight: '800',
    textTransform: 'uppercase',
  },

  subheading: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
