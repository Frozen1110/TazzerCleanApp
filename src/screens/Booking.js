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
import WalletSVG from '~/assets/images/wallet-white.svg';

import { Constants } from '~/core/constant';
export const BookingScreen = ({navigation}) => {
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
        stickyBottom = {
            <Footer active='booking'/>
        }
    >
        
        <View style={styles.container}>
            <ScrollView>
            <View>
                <BookingItem 
                    title="Sterilization"
                    date="26th April 2021"
                    schedule={true}
                    time="12:00 pm to 02:00 pm"
                    description="Lorem Ipsum is simply dummy text on the printing and typesetting industry. Lorem Ipsum has been the industry"
                />
                <DashedLine/>
                <BookingItem 
                    title="Sterilization"
                    date="26th April 2021"
                    schedule={true}
                    time="12:00 pm to 02:00 pm"
                    description="Lorem Ipsum is simply dummy text on the printing and typesetting industry. Lorem Ipsum has been the industry"
                />
            </View>
            
            </ScrollView>
        </View>
        
      </Screen>
    );
};


BookingScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'My Bookins',
    },
});

const styles = StyleSheet.create({
  container: {
  },

  image1: {
    height: 350,
    backgroundColor: "#444",
    width: '100%',
    marginBottom: 20
  },

  image2: {
    height: 300,
    backgroundColor: "#444",
    width: '100%',
    marginBottom: 20
  }
});
