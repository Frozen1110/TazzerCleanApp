import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet,FlatList, ScrollView, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigationService } from '~/core/services';
import { Screen, AppText, Button, Input, Footer, DashedLine, BookingItem } from '~/components';

import { fetchAPI } from '~/core/utility';
import { setUserInfo, setToken, signOut, setOrder } from '~/store/actions';
import { GlobalStyles, Theme, MainNavigationOptions, UserNavigationOptions } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckSVG from '~/assets/images/check.svg';
import DeleteSVG from '~/assets/images/delete.svg';
import CartSVG from '~/assets/images/cart.svg';
import { Constants } from '~/core/constant';
import App from '../../../App';
import CalendarPicker from 'react-native-calendar-picker';
import { withTheme } from 'react-native-elements';

export const ScheduleScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.account.userInfo);

    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    const onDateChange = (date) => {
        setDate(date);
    }

    const previousComponent = () =>
        <View style={styles.iconWrapper}>
            <Icon name="chevron-left" size={30} color="##707070" />
            <AppText>asdf</AppText>
        </View>
    const nextComponent = () => 
        <View style={styles.iconWrapper}>
            <Icon name="chevron-right" size={30} color="##707070" />
        </View>
    
    useEffect(() => {
        setLoading(true);          
        fetchAPI(`/services/getAllServices`, {
            method: 'GET',
        })
        .then((res) => {
            console.log(res);
            //setBalance(res);
        })
        .catch((err) =>
            dispatch(showNotification({ type: 'error', message: err.message })),
        )
        .finally(() => setLoading(false));
    },[userInfo]);

    return (
      <Screen
        backgroundColor="#333"
    >
        
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.stepContainer}>
                <View style={styles.stepItem}>
                    <CheckSVG width={30} height={30} fill='#06cb20'/>
                    <View>
                        <AppText style={styles.activeText}> Cart </AppText>
                    </View>
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <View style={styles.line} />
                </View>
                <View style={styles.stepItem}>
                    <CheckSVG width={30} height={30} fill='#06cb20'/>
                    <View>
                        <AppText style={styles.activeText}> Schedule </AppText>
                    </View>
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <View style={styles.line} />
                </View>
                <View style={styles.stepItem}>
                    <View style={styles.inactiveStep} />
                    <View>
                        <AppText style={styles.inactiveText}> Review </AppText>
                    </View>
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <View style={styles.line} />
                </View>
                <View style={styles.stepItem}>
                    <View style={styles.inactiveStep} />
                    <View>
                        <AppText style={styles.inactiveText}> Payment </AppText>
                    </View>
                </View>
            </View>
            <View style={styles.longLine} />
            <View style={styles.calendarContainer}>
                <CalendarPicker
                    onDateChange={(date) => onDateChange(date)}
                    showDayStragglers = {true}
                    previousTitle = "<"
                    nextTitle = ">"
                    selectedDayColor="#fff"
                    selectedDayStyle = {{ color: 'white', backgroundColor: '#f54343'}}
                    todayBackgroundColor = "transparent"
                    textStyle = {{color: 'white', fontSize: 14}}
                    monthTitleStyle = {{color: '#f54343'}}
                    yearTitleStyle = {{color: '#f54343'}}
                    headerWrapperStyle = {{paddingHorizontal: 20, borderColor: 'white'}}
                    dayOfWeekStyles = {{paddingHorizontal: 10}}
                />
            </View>

            <View style={{marginTop: 30}}>
                <AppText style={{fontSize: 16, color: 'white', textAlign: 'center'}}>Select Time</AppText>
                <View style={{marginTop: 50}}>
                    
                </View>
            </View>
            </ScrollView>

        </View>
        
        <View style={styles.bottomContainer}>
            <View style={styles.continueContainer}>
                <View>
                    <CartSVG width={24} height={24} fill="white" style={{marginLeft: 10}} />
                    <AppText style={[styles.text, {marginTop: 5}]}>1 item | $470.82</AppText>
                </View>
                <TouchableOpacity 
                    onPress={()=> NavigationService.navigate('Declaration')}
                >
                    <View style={styles.continueButton}>
                        <AppText style={[styles.text, {fontSize: 16, marginLeft: 7}]}>Continue</AppText>
                        <Icon name="chevron-right" size={30} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
      </Screen>
    );
};


ScheduleScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'Cart',
    },
});

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 24
  },
  stepContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
  },
  stepItem: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
  },
  activeText: {
      color: 'white',
      fontSize: 12,
      marginTop: 5,
      textAlign: 'center'
  },
  inactiveText: {
      color: "#222222",
      marginTop: 5,
      fontSize: 12,
      textAlign: 'center'
  },
  inactiveStep: {
      width: 30,
      height: 30,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: '#222',
      backgroundColor: 'transparent'
  },
  line: {
     height: 0,
     borderWidth: 2,
     borderColor: '#222',
     width: 50,
     marginBottom: 18
  },
  subcontainer: {
      backgroundColor: '#222',
      paddingHorizontal: 30,
      paddingVertical: 12
  },
  heading: {
      color: 'white',
      fontSize: 16,
      marginLeft: 5,
      marginTop: 5
  },
  longLine: {
      width: '100%',
      height: 0,
      borderWidth: 1,
      borderColor: '#454545',
      marginBottom: 20,
      marginTop: 20
  },
  text: {
      color: 'white',
      fontSize: 14
  },
  minusContainer: {
    backgroundColor: "#f54343",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'white'
  },
  plusContainer: {
    backgroundColor: "#f54343",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'white'
  },
  numberContainer: {
    backgroundColor: 'white',
    width: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white'
  },
  highlight: {
      color: '#f54343'
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      paddingHorizontal: 3
  },
  bottomContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: '#222',
  },
  addContainer: {
      padding: 24,
      justifyContent: 'space-between',
      flexDirection: 'row',
  },
  addButton: {
      width: 60,
      height: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f54343',
      borderRadius: 8
  },
  continueContainer: {
      backgroundColor: '#f54343',
      paddingHorizontal: 24,
      paddingVertical: 12,
      justifyContent: 'space-between',
      flexDirection: 'row',
  },
  continueButton: {
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 8,
      padding: 4,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
  },
  calendarContainer: {
      backgroundColor: '#222'
  },
  iconWrapper: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      borderRadius: 25,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center'
  }
});
