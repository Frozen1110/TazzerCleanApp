import React, { useEffect, useState, useMemo } from 'react';
import { View, Image, StyleSheet,FlatList, ScrollView, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigationService } from '~/core/services';
import { Screen, AppText, Button, Input, Footer, DashedLine, CouponItem } from '~/components';

import { fetchAPI } from '~/core/utility';
import { setUserInfo, setToken, signOut, setOrder } from '~/store/actions';
import { GlobalStyles, Theme, MainNavigationOptions, UserNavigationOptions } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationSVG from '~/assets/images/notification-view.svg';

import { Constants } from '~/core/constant';
export const CouponScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    
    const [coupons, setCoupons] = useState(false);

    const userInfo = useSelector((state) => state.account.userInfo);

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
            <AppText style={styles.text}>Available Coupons</AppText>
            <ScrollView>
            <CouponItem 
                type="Cashback"
                cost="200"
                service="All Services (App only)"
                promocode="APP200"
                validity="Till 31st January 2021"
            />
            <CouponItem 
                backgroundColor="#bd1f9e"
                type="Cashback"
                cost="200"
                service="Pest Control Services"
                promocode="PC200"
                validity="Till 31st January 2021"
            />
            <CouponItem 
            
                backgroundColor="#ea6c19"
                type="Cashback"
                cost="200"
                service="Grooming Services"
                promocode="B200"
                validity="Till 31st January 2021"
            />
            <CouponItem 
                backgroundColor="#ffcc0d"
                type="Upto"
                cost="500"
                service="All Services (App only)"
                promocode="HAPPY2CU"
                validity="Till 31st January 2021"
                lineColor="#f00"
            /></ScrollView>
        </View>
        
      </Screen>
    );
};


CouponScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'Offers and Coupons',
    },
});

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Theme.layout.screenPaddingHorizontal,
        paddingTop: 20,
        paddingBottom: Theme.layout.screenPaddingBottom,
        display: 'flex',
        minHeight: '100%',
    },

    text: {
        color: 'white',
        fontSize: 14
    }
});
