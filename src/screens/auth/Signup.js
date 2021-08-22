import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigationService } from '~/core/services';
import { Screen, AppText, Button, Input } from '~/components';

import { fetchAPI } from '~/core/utility';
import { setUserInfo, setToken, signOut, setOrder } from '~/store/actions';
import { GlobalStyles, MainNavigationOptions, Theme } from '~/styles';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { showNotification } from '~/store/actions';
export const SignupScreen = () => {
    const [role, setRole] = useState(1);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [professional, setProfessional] = useState('');
    const [job, setJob] = useState('');
    
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    
    const doSignup = () => {
      if(firstname === "") {
        dispatch(showNotification({ type: 'error', message: "FirstName field can't be empty" }));
        return;
      }
      if(lastname === "") {
        dispatch(showNotification({ type: 'error', message: "LastName field can't be empty" }));
        return;
      }
      if(password === "") {
        dispatch(showNotification({ type: 'error', message: "Email field can't be empty" }));
        return;
      }
      if(email === "") {
        dispatch(showNotification({ type: 'error', message: "Password field can't be empty" }));
        return;
      }
      if(phone === "") {
        dispatch(showNotification({ type: 'error', message: "Phone field can't be empty" }));
        return;
      }
      if(professional === "" && role === 2) {
        dispatch(showNotification({ type: 'error', message: "You need to select your service" }));
        return;
      }
      if(job === "" && role === 2) {
        dispatch(showNotification({ type: 'error', message: "You need to select who you are" }));
        return;
      }
      setLoading(true);
      fetchAPI(`/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email : email, 
          firstName : firstname,
          lastName : lastname,
          phone : phone,
          password: password
        })
      })
      .then((res) => {
        /*
        dispatch(
          setUserInfo({
            uuid: res.data.uuid,
            firstName: res.data.first_name,
            lastName: res.data.last_name,
            phone: res.data.phone,
            email: res.data.email,
            creditcard: res.data.creditcard,
            totalOrders: res.data.total_orders,
            user_verified: res.data.user_verified,
            user_active: res.data.user_active
          }),
        );
        */
        dispatch(showNotification({ type: 'success', message: res.message }));
        if(message) {
          NavigationService.goBack();
        }
      })
      .catch((err) =>
        dispatch(showNotification({ type: 'error', message: err.message })),
      )
      .finally(() => setLoading(false));
    }
    return (
      <Screen
        align="center"
        backgroundImage={require('~/assets/images/back3.jpg')}
        >
        <View style={styles.container}>
          <AppText style={styles.heading}>SIGN UP</AppText>
          {
            role === 2 &&
            <Input
              style={GlobalStyles.formControl}
              type="text"
              value={job}
              onChange={(e) => setJob(e)}
              title="I am a"
              actionIcon="chevron-down"
              actionHandler={() => {

              }} />
            
          }
          <Input
            style={GlobalStyles.formControl}
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e)}
            title="First Name" />
          <Input
            style={GlobalStyles.formControl}
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e)}
            title="Last Name" />
          <Input
            style={GlobalStyles.formControl}
            type="password"
            value={password}
            onChange={(e) => setPassword(e)}
            title="Password" />
          <Input
            style={GlobalStyles.formControl}
            type="text"
            value={email}
            onChange={(e) => setEmail(e)}
            title="Email" />
          <Input
            style={GlobalStyles.formControl}
            type="text"
            value={phone}
            onChange={(e) => setPhone(e)}
            title="Phone" />
          {
            role === 2 &&
            <Input
              style={GlobalStyles.formControl}
              type="text"
              value={professional}
              onChange={(e) => setProfessional(e)}
              title="I provide"
              actionIcon="chevron-down"
                actionHandler={() => {

                }}
              />
            
          }
          {/*
          <AppText
            style={styles.subheading}
            >Choose 3 prefered reading genres</AppText>
          <View style={styles.radio}>
            <CheckBox containerStyle={styles.radioBackground} textStyle={styles.checkText} title="Fairytale" checkedColor={Theme.color.accentColor} checked={Fairytale} onPress = {() => setFairytale(!Fairytale)}/>
            <CheckBox containerStyle={styles.radioBackground} textStyle={styles.checkText} title="Adventure" checkedColor={Theme.color.accentColor} checked={Adventure}  onPress = {() => setAdventure(!Adventure)}/>
            <CheckBox containerStyle={styles.radioBackground} textStyle={styles.checkText} title="Fantasy" checkedColor={Theme.color.accentColor} checked={Fantasy}  onPress = {() => setFantasy(!Fantasy)}/>                      
          </View>
          <View style={styles.radio}>
            <CheckBox containerStyle={styles.radioBackground} textStyle={styles.checkText} title="Horror" checkedColor={Theme.color.accentColor} checked={Horror}  onPress = {() => setHorror(!Horror)} />
            <CheckBox containerStyle={styles.radioBackground} textStyle={styles.checkText} title="Poetry" checkedColor={Theme.color.accentColor} checked={Poetry} onPress = {() => setPoetry(!Poetry)}  />
            <CheckBox containerStyle={styles.radioBackground} textStyle={styles.checkText} title="Autobiography" checkedColor={Theme.color.accentColor} checked={Autobiography}  onPress = {() => setAutobiography(!Autobiography)} />                      
          </View>
          */}
          <View style={styles.radio}>
            <CheckBox containerStyle={styles.radioBackground} textStyle={styles.checkText} title="User" checkedColor={Theme.color.accentColor} checked={role == 1} checkedIcon='dot-circle-o' onPress = {() => setRole(1)} uncheckedIcon='circle-o'/>
            <CheckBox containerStyle={styles.radioBackground} textStyle={styles.checkText} title="Professional" checkedColor={Theme.color.accentColor} checked={role == 2}  checkedIcon='dot-circle-o' onPress = {() => setRole(2)} uncheckedIcon='circle-o'/>
          </View>
          <Button
              type="accent"
              style={{marginTop: 20}}
              fullWidth
              onClick={() => doSignup()}>
                Register
          </Button>
          <Button
              type="accent"
              style={{marginTop: 20}}
              fullWidth
              onClick={() => {
                NavigationService.navigate('Login');
              }}>
                BACK
          </Button>
        </View>
      </Screen>
    );
};

SignupScreen.navigationOptions = {
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
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
  },

  radio: {
    flexDirection: 'row',
  },

  radioBackground: {
    backgroundColor: Theme.color.container,
    borderWidth: 0,
    marginLeft: 0,
    paddingHorizontal:0
  },

  checkText: {
    color: '#ddd'
  }
});
