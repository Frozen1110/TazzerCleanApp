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
export const WalletScreen = ({navigation}) => {
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
        <View style={styles.cardWrapper}>
            <View>
                <AppText style={styles.text}>Wallet Balance</AppText>
            </View>
            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                <WalletSVG height={30} width={30}/>
                <AppText style={styles.textBig}>$0</AppText>
            </View>
        </View>
        
      </Screen>
    );
};


WalletScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'Wallet',
    },
});

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    height: 300,
    backgroundColor: "#FF8700",
    //backgroundColor: '#FAD961',
    //backgroundImage: 'linear-gradient(90deg, #FAD961 0%, #F76B1C 100%)',
    justifyContent: 'center'
  },

  text: {
      color: 'white',
      fontWeight: 'bold',
      marginLeft: 10,
      fontSize: 20
  },

  textBig: {
      color: 'white',
      fontWeight: 'bold',
      marginLeft: 15,
      fontSize: 24
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});
