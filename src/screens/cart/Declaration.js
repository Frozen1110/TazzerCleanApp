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

export const DeclarationScreen = ({navigation}) => {
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
        backgroundColor="#222"
    >
        
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imageWrapper}>
                    <Image
                        source={require('~/assets/images/health-insurance.png')}
                    />
                    <View style={{marginTop: 15}}>
                        <AppText style={styles.bigText}>Safety Comes First.</AppText>
                        <AppText style={styles.bigText}>Services,a Close Second</AppText>
                    </View>
                </View>
                <DashedLine/>
                <View style={styles.contentWraper}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <AppText style={styles.text}>Health and Safety Declaration</AppText>
                    </View>
                    <AppText style={styles.text}>I declare</AppText>
                    <View style={styles.content}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <CheckSVG width={12} height={12} style={{marginTop: 3}}/>
                            <AppText style={styles.text}>
                                Lorem Ipsum is simply dummy text on the printing and typesetting industry. Lorem Ipsum has been the industry
                            </AppText>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <CheckSVG width={12} height={12} style={{marginTop: 3}}/>
                            <AppText style={styles.text}>
                                Lorem Ipsum is simply dummy text on the printing and typesetting industry. Lorem Ipsum has been the industry
                            </AppText>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <CheckSVG width={12} height={12} style={{marginTop: 3}}/>
                            <AppText style={styles.text}>
                                Lorem Ipsum is simply dummy text on the printing and typesetting industry. Lorem Ipsum has been the industry
                            </AppText>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <CheckSVG width={12} height={12} style={{marginTop: 3}}/>
                            <AppText style={styles.text}>
                                Lorem Ipsum is simply dummy text on the printing and typesetting industry. Lorem Ipsum has been the industry
                            </AppText>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <CheckSVG width={12} height={12} style={{marginTop: 3}}/>
                            <AppText style={styles.text}>
                                Lorem Ipsum is simply dummy text on the printing and typesetting industry. Lorem Ipsum has been the industry
                            </AppText>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                            <CheckSVG width={12} height={12} style={{marginTop: 3}}/>
                            <AppText style={styles.text}>
                                Lorem Ipsum is simply dummy text on the printing and typesetting industry. Lorem Ipsum has been the industry
                            </AppText>
                        </View>
                    </View>
                    <DashedLine />
                    
                </View>
            </ScrollView>

        </View>
        
        <View style={styles.bottomContainer}>
            <TouchableOpacity 
                onPress={()=> NavigationService.navigate('Review')}
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


DeclarationScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'Declaration',
    },
});

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 24,
      marginBottom: 50
  },
  imageWrapper: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20
  },
  bottomContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: '#f54343',
      height: 50,
      justifyContent: 'center',
      flexDirection: 'row'
  },
  bigText: {
      fontWeight: 'bold',
      fontSize: 24,
      color: 'white',
      textAlign: 'center'
  },
  contentWraper: {
      marginTop: 15,
      marginBottom: 20
  },
  text: {
      color: 'white',
      fontSize: 14
  },
  content: {
      marginTop: 10,
      marginBottom: 20,
  },
  continueButton: {
      flexDirection: 'row',
      alignItems: 'center',
      height: '100%'
  }
});
