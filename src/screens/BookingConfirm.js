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

import { Constants } from '~/core/constant';
import App from '../../App';
export const BookingConfirmScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.account.userInfo);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        setLoading(true);          
        fetchAPI(`/services/asdf`, {
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
              <View style={styles.orderSucces}>
                <View><CheckSVG width={40} height={40}/></View>
                <View style={{marginTop: 10}}><AppText style={styles.text}>Order Id: 1234567890</AppText></View>
                <View style={{marginTop: 15}}>
                  <AppText style={styles.description}>Thank You For Your Order</AppText>
                  <AppText style={styles.description}>You will receive email when your items are shipped . if you have any questions , Call Tazzerclean  : 123 456 7890</AppText>
                </View>
              </View>
              <View style={styles.priceWrapper}>
                  <View style={{marginBottom: 10}}><AppText style={styles.heading}>AC</AppText></View>
                  <DashedLine/>
                  <View style={{...styles.row, marginTop: 20}}>
                    <AppText style={styles.text}>Dry servicing (split) </AppText>
                    <AppText style={styles.text}>Qty : 1</AppText>
                  </View>
                  <View style={styles.row}><AppText style={{...styles.redText, fontWeight: 'bold'}}>$499</AppText></View>
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
              <View style={styles.paymentBtnWrapper}>
                <Button
                    type="purple"
                    style={{width: 300}}
                    onClick={() => {
                        NavigationService.navigate('Booking');
                    }}>
                        Make Payment
                </Button>
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
              <View style={styles.buttonWrapper}>
                <Button
                      type="accent"
                      style={{width: 150, height: 40}}
                      onClick={() => {
                          NavigationService.navigate('OrderDetail');
                      }}>
                          Go to Order
                  </Button>
                  
                  <Button
                      type="purple"
                      style={{width: 150, height: 40}}
                      onClick={() => {
                          NavigationService.navigate('Home');
                      }}>
                          Go to Home
                  </Button>
              </View>
            </ScrollView>
        </View>
        
      </Screen>
    );
};


BookingConfirmScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'Booking Confirmation',
    },
});

const styles = StyleSheet.create({
  container: {
  },
  text: {
    color: 'white',
    fontSize: 16
  },
  description: {
    color: 'white',
    fontSize: 14,
    alignSelf: 'center'
  },
  orderSucces: {
    backgroundColor: '#06cb20',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 35,
    marginHorizontal: 20
  },
  priceWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#222'
  },
  couponWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#222',
    marginTop: 20
  },
  totalWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#222',
    marginTop: 20
  },
  paymentBtnWrapper: {
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scheduleWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#222'
  },
  contactWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#222',
    marginTop: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center'
  },
  row1: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center'
  },
  redText: {
    color: "#ec4242",
    fontSize: 15
  },
  greenText: {
    color: "#08ba1f"
  },
  heading: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
