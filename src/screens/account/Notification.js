import React, { useEffect, useState, useMemo } from 'react';
import { View, Image, StyleSheet,FlatList, ScrollView, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigationService } from '~/core/services';
import { Screen, AppText, Button, Input, Footer, DashedLine, Tabs } from '~/components';

import { fetchAPI } from '~/core/utility';
import { setUserInfo, setToken, signOut, setOrder } from '~/store/actions';
import { GlobalStyles, Theme, MainNavigationOptions, UserNavigationOptions } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationSVG from '~/assets/images/notification-view.svg';

import { Constants } from '~/core/constant';
export const NotificationScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    
    const [orderRelated, setOrderRelated] = useState(false);
    const [promotions, setPromotions] = useState(false);

    const userInfo = useSelector((state) => state.account.userInfo);
    const tabData = useMemo(() => {
        let tabData = [];
        
        tabData.push({
          title: 'Order Related',
          content: (
            <View>
            {orderRelated && orderRelated.length > 0 ? (
              <>
              <FlatList
                data={orderRelated}
                style={styles.list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <AppText>{item.name}</AppText>
                )}
              />
              </>
          ) : 
              <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <NotificationSVG height={100} width={100}/>
                <AppText style={styles.text}>You have no notifications for the order related at the moment</AppText>
              </View>
          }
          </View>
          ),
        });
    
        tabData.push({
            title: 'Promotions',
            content: (
              
            <View>
            {promotions && promotions.length > 0 ? (
              <>
              <FlatList
                data={promotions}
                style={styles.list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <AppText>{item.name}</AppText>
                )}
              />
              </>
            
          ) : 
            <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <NotificationSVG height={100} width={100}/>
                <AppText style={styles.text}>You have no notifications at the moment</AppText>
            </View>
          }
          </View>
          ),
        });
    
        return tabData;
    }, []);

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
            <Tabs tabs={tabData} />
        </View>
        
      </Screen>
    );
};


NotificationScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'Notification',
    },
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: Theme.layout.screenPaddingBottom,

        display: 'flex',
        minHeight: '100%',
    },

    text: {
        color: 'white',
        marginTop: 20
    }
});
