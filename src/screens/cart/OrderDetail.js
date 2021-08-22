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
export const OrderDetailScreen = ({navigation}) => {
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
            <View style={styles.subcontainer}>
                <AppText style={[styles.heading, {marginLeft: 5}]}>AC</AppText>
                <View style={[styles.line, {marginTop: 10}]} />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <AppText style={styles.text}>Dry Servicing (Split)</AppText>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AppText style={styles.text}>Qty: 1</AppText>
                    </View>
                </View>
                <AppText style={[styles.highlight, {fontSize: 18, marginTop: 10}]}> $ 499</AppText>
            </View>
            <View style={styles.row}>
                <AppText style={styles.text}>Order ID:</AppText>
                <AppText style={styles.text}>6568547545</AppText>
            </View>
            <View style={styles.row}>
                <AppText style={styles.text}>Scheduled On:</AppText>
                <AppText style={styles.text}>30th Apr 2021|12:00PM-03:00PM</AppText>
            </View>
            <View style={{paddingHorizontal: 24, marginTop: 30}}>
                <AppText style={styles.heading}>Installation</AppText>
                <AppText style={[styles.text, {marginTop: 10}]}>Select Type of AC - Wondow</AppText>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
                        <View style={styles.activeCircle}/>
                        <View style={[styles.verticalLine,{height: 80}]}/>
                        <View style={styles.inactiveCircle}/>
                        <View style={styles.verticalLine}/>
                        <View style={styles.inactiveCircle}/>
                        <View style={styles.verticalLine}/>
                        <View style={styles.inactiveCircle}/>
                        <View style={styles.verticalLine}/>
                        <View style={styles.inactiveCircle}/>
                    </View>
                    <View style={{flex: 0.9, marginTop: 20, marginLeft: 5}}>
                        <AppText style={styles.heading}>ORDER PLACED</AppText>
                        <AppText style={styles.text}>30th APR 2021|12.00 PM-03.00PM</AppText>
                        <AppText style={styles.text}>Your order has been placed and a tazzerclean expert will be assigned to your order shortly</AppText>
                        <AppText style={[styles.heading, {marginTop: 20}]}>DUMMYTEXT</AppText>
                        <AppText style={[styles.heading, {marginTop: 20}]}>DUMMYTEXT</AppText>
                        <AppText style={[styles.heading, {marginTop: 20}]}>DUMMYTEXT</AppText>
                        <AppText style={[styles.heading, {marginTop: 20}]}>DUMMYTEXT</AppText>
                    </View>
                </View>
            </View>
            <View style={styles.line}/>
            <View style={[styles.row, {marginTop: 0, justifyContent: 'center', flex: 1}]}>
                <AppText style={styles.text}>Cancel this Job</AppText>
            </View>
            <View style={styles.line}/>
            
            <View style={[styles.row, {marginTop: 0, justifyContent: 'center', flex: 1}]}>
                <AppText style={styles.text}>Upload Image</AppText>
            </View>
            <View style={styles.line}/>
            </ScrollView>
        </View>
        
      </Screen>
    );
};


OrderDetailScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'Order Details',
    },
});

const styles = StyleSheet.create({
  container: {
      flex: 1
  },

  subcontainer: {
      backgroundColor: '#222',
      paddingHorizontal: 30,
      paddingVertical: 12,
      marginTop: 10
  },
  heading: {
      color: 'white',
      fontSize: 16,
      marginTop: 5,
      fontWeight: 'bold'
  },
  line: {
      width: '100%',
      height: 0,
      borderWidth: 1,
      borderColor: '#444',
      marginTop: 20,
      marginBottom: 20
  },
  text: {
      color: 'white',
      fontSize: 14
  },

  highlight: {
      color: '#f54343'
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      paddingHorizontal: 24
  },
  activeCircle: {
      backgroundColor: "#43cb7f",
      width: 30,
      height: 30,
      borderRadius: 15
  },
  inactiveCircle: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'white',
      width: 20,
      height: 20,
      borderRadius: 10
  },
  verticalLine: {
    width: 0,
    height: 20,
    borderWidth: 1,
    borderColor: 'white'
  }
});
