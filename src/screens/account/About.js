import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet,FlatList, ScrollView, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigationService } from '~/core/services';
import { Screen, AppText, Button, Input, Footer, DashedLine } from '~/components';

import { fetchAPI } from '~/core/utility';
import { setUserInfo, setToken, signOut, setOrder } from '~/store/actions';
import { GlobalStyles, Theme, MainNavigationOptions, UserNavigationOptions } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WalletSVG from '~/assets/images/wallet-white.svg';

import { Constants } from '~/core/constant';
export const AboutScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

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
            <View style={styles.subcontainer}>
                <AppText style={styles.text}>
                    Tazzer Clean believe in delivering quality and eco-friendly house cleaning services in the United Kingdom. Our team of professional house cleaners ensures the safety and well-being of our customers without using any toxic chemicals for home cleaning purposes and provide a better convenient and hassle-free experience with the customers.
                </AppText>
            </View>
        </View>
        
      </Screen>
    );
};


AboutScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'About US',
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

    subcontainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#222',
        borderRadius: 5
    },

  text: {
      color: 'white',
      fontSize: 18
  },
});
