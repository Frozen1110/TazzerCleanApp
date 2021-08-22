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
import SettingSVG from '~/assets/images/setting.svg';
import CalendarSVG from '~/assets/images/calendar.svg';
import LocationSVG from '~/assets/images/location.svg';
import PhoneSVG from '~/assets/images/phone.svg';
import TickSVG from '~/assets/images/tick.svg';
import UserSVG from '~/assets/images/user.svg';
import DeleteSVG from '~/assets/images/delete.svg';
import CartSVG from '~/assets/images/cart.svg';
import { Constants } from '~/core/constant';
import App from '../../../App';
export const ReviewScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [split, setSplit] = useState(1);

    const userInfo = useSelector((state) => state.account.userInfo);
    const [balance, setBalance] = useState(0);
    
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
                    <CheckSVG width={30} height={30} fill='#06cb20'/>
                    <View>
                        <AppText style={styles.activeText}> Review </AppText>
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
            <View style={styles.subcontainer}>
                <AppText style={styles.heading}>AC</AppText>
                <View style={[styles.longLine, {marginTop: 10}]} />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <AppText style={styles.text}>Dry Servicing (Split)</AppText>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                onPress={()=> split > 0 ? setSplit(split - 1) : {}}
                            >
                                <View style={styles.minusContainer}>
                                        <AppText style={styles.text}> - </AppText>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.numberContainer}>
                                <AppText> {split} </AppText>
                            </View>
                            <TouchableOpacity
                                onPress={()=> setSplit(split + 1)}
                            >
                                <View style={styles.plusContainer}>
                                        <AppText style={styles.text}> + </AppText>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginLeft: 5}}>
                            <TouchableOpacity 
                                onPress={()=> console.log('delte')}
                            >
                                <DeleteSVG width={20} height={20} /> 
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <AppText style={[styles.highlight, {fontSize: 18, marginTop: 10}]}> $ 499</AppText>
            </View>
            <View style={styles.couponWrapper}>
                <View style={styles.row}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <SettingSVG width={40} height={40}/>
                    <AppText style={{...styles.greenText, marginLeft: 25}}>Apply Coupon</AppText>
                    </View>
                    <TouchableOpacity 
                    onPress={() => NavigationService.navigate('Coupon')}>
                    <Icon size={40} name="chevron-right" color="#08ba1f" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.totalWrapper}>
                <View style={{...styles.row, marginBottom: 20, marginTop: 20}}>
                  <AppText style={styles.redText}>Total Payable Amount</AppText>
                  <AppText style={styles.redText}>$470.82</AppText>
                </View>
                <DashedLine />
                <View style={{...styles.row, marginTop: 10}}>
                  <AppText style={styles.text}>Service cost</AppText>
                  <AppText style={styles.text}>$499</AppText>
                </View>
                <View style={styles.row}>
                  <AppText style={styles.text}>Integrated VAT @18.0%</AppText>
                  <AppText style={styles.text}>$71.82</AppText>
                </View>
              </View>
            <View style={styles.scheduleWrapper}>
                <View style={{marginBottom: 10}}>
                  <AppText style={styles.heading}>Scheduled Date & Time</AppText>
                </View>
                <DashedLine />
                <View style={{...styles.row1, marginTop: 10}}>
                  <CalendarSVG width={16} height={16} />
                  <AppText style={{...styles.text, marginLeft: 10}}>29-04-2021</AppText>
                </View>
                <View style={styles.row1}>
                  <TickSVG width={16} height={16} />
                  <AppText style={{...styles.text, marginLeft: 10}}>12:00 pm to 02:00 pm</AppText>
                </View>
            </View>
            <View style={styles.contactWrapper}>
                <View style={{marginBottom: 10}}>
                  <AppText style={styles.heading}>Contact Details</AppText>
                </View>
                <DashedLine />
                <View style={{...styles.row1, marginTop: 10}}>
                  <UserSVG width={16} height={16} />
                  <AppText style={{...styles.text, marginLeft: 10}}>John Doe</AppText>
                </View>
                <View style={{...styles.row1, marginBottom: 10}}>
                  <PhoneSVG width={16} height={16} />
                  <AppText style={{...styles.text, marginLeft: 10}}>1234 56789</AppText>
                </View>
                <DashedLine />
                <View style={{...styles.row1, marginTop: 10}}>
                  <LocationSVG width={16} height={16} />
                  <View>
                    <AppText style={{...styles.text, marginLeft: 10}}>13th Street 47 W 13th St, New York,</AppText>
                    <AppText style={{...styles.text, marginLeft: 10}}>NY 10011, USA</AppText>
                  </View>
                </View>
              </View>
            </ScrollView>
        </View>
        <View style={styles.bottomContainer}>
            <View>
                <CartSVG width={24} height={24} fill="white" style={{marginLeft: 10}} />
                <AppText style={[styles.text, {marginTop: 5}]}>1 item | $470.82</AppText>
            </View>
            <TouchableOpacity 
                onPress={()=> NavigationService.navigate('OrderDetail')}
            >
                <View style={styles.continueButton}>
                    <AppText style={[styles.text, {fontSize: 16, marginLeft: 7}]}>Continue</AppText>
                    <Icon name="chevron-right" size={30} color="white" />
                </View>
            </TouchableOpacity>
        </View>
        
      </Screen>
    );
};


ReviewScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'Cart',
    },
});

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginBottom: 70,
  },
  stepContainer: {
      padding: 24,
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
      borderColor: '#333',
      marginTop: 20,
      marginBottom: 20
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
      height: 70,
      
      backgroundColor: '#f54343',
      paddingHorizontal: 24,
      paddingVertical: 12,
      justifyContent: 'space-between',
      flexDirection: 'row',
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
  couponWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#222',
    marginTop: 20
  },  
  greenText: {
    color: "#08ba1f"
  },
  totalWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#222',
    marginTop: 20
  },
  redText: {
    color: "#ec4242",
    fontSize: 15
  },  
  scheduleWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#222'
  },
  row1: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center'
  },
  contactWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#222',
    marginTop: 20
  },
});
