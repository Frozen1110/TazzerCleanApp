import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigationService } from '~/core/services';
import { Screen, AppText, Button, Input } from '~/components';

import { fetchAPI } from '~/core/utility';
import { GlobalStyles, MainNavigationOptions, Theme } from '~/styles';

import { showNotification, setUserInfo } from '~/store/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const doLogin = () => {
      if(email === "") {
        dispatch(showNotification({ type: 'error', message: "Email field can't be empty" }));
        return;
      }
      if(password === "") {
        dispatch(showNotification({ type: 'error', message: "You need type the password" }));
        return;
      }
      setLoading(true);          
      fetchAPI(`/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email : email, password: password}),
      })
      .then((res) => {
        const type = 'customer';
        //type = res.data.type ? res.data.type : 'customer';
        dispatch(
          setUserInfo({
            firstName: res.firstname,
            lastName: res.lastname,
            phone: res.phoneNumber,
            email: res.email,
            avatar: res.avatar,
            user_active: res.isActive,
            user_type : type
          }),

        );
        NavigationService.navigate('Home');
      })
      .catch((err) =>
        dispatch(showNotification({ type: 'error', message: err.message })),
      )
      .finally(() => setLoading(false));
    }
    return (
      <Screen
        keyboardAware={true}
        isLoading={isLoading} 
        align="center"
        backgroundImage={require('~/assets/images/back3.jpg')}
        >
        <View style={styles.container}>
          <AppText style={[styles.heading]}>WELCOME TO</AppText>
          <AppText style={[styles.heading, styles.accentColor]}>TAZZERCLEAN</AppText>
          <AppText style={styles.subheading}>Type the {navigation.getParam('role')} login info</AppText>
          <Input
            style={GlobalStyles.formControl}
            type="text"
            value={email}
            onChange={(e)=>setEmail(e)}
            title="Email" />
          <Input
            style={GlobalStyles.formControl}
            type="password"
            value={password}
            onChange={(e)=>setPassword(e)}
            title="Password" />
          <Button
              type="accent"
              style={{marginTop: 60}}
              fullWidth
              onClick={() => doLogin()}>
                LOGIN
          </Button>
          <Button
              type="accent"
              style={{marginTop: 20}}
              fullWidth
              onClick={() => {
                NavigationService.navigate('Signup');
              }}>
                Sign up
          </Button>
          <TouchableOpacity
            onPress={()=> { console.log('forgot password ')}}
          >
            <AppText style={[styles.subheading, {}]}>Forgot Password?</AppText>
          </TouchableOpacity>

        </View>
      </Screen>
    );
};

LoginScreen.navigationOptions = {
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
