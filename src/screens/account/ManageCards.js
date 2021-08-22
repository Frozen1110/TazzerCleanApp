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
import { withTheme } from 'react-native-elements';
export const ManageCardsScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.account.userInfo);
    const [cards, setCards] = useState(false);

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
            {
                cards && cards.length > 0 ? (
                    <>
                    <FlatList
                      data={cards}
                      style={styles.list}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                          <AppText>{item.name}</AppText>
                      )}
                    />
                    </>
                ) : (
                    <TouchableOpacity
                        onPress={()=>console.log('no found')}
                    >
                        <View style={styles.nofound}>
                            <AppText style={styles.text2}>No cards found</AppText>
                        </View>
                    </TouchableOpacity>
                )
            }
        </View>
        
      </Screen>
    );
};


ManageCardsScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'Manage Cards',
    },
});

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Theme.layout.screenPaddingHorizontal,
        display: 'flex',
        minHeight: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    nofound: {
        borderRadius: 10,
        backgroundColor: 'white',
        width: 150,
        paddingHorizontal: 5,
        paddingVertical: 15,
        alignItems: 'center'
    },

    text2: {

    }
});
