import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet,FlatList, ScrollView, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigationService } from '~/core/services';
import { Screen, AppText, Button, Input, Footer, DashedLine, SecureItem } from '~/components';

import { fetchAPI } from '~/core/utility';
import { setUserInfo, setToken, signOut, setOrder } from '~/store/actions';
import { GlobalStyles, Theme, MainNavigationOptions, UserNavigationOptions } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WalletSVG from '~/assets/images/wallet-white.svg';

import { Constants } from '~/core/constant';
export const SecureScreen = ({navigation}) => {
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
            <ScrollView>
            <View style={styles.image1}>
                <Image
                    source={require('~/assets/images/secure_back1.png')}
                    style={{width: '100%'}}
                />

            </View>
            <View>
                <SecureItem 
                    image = {1}
                    title="Service providers are equipped with masks and sanitizers:"
                    description="All our service providers are mandated to use sanitizers before the service and wear masks during the service."
                />
                <SecureItem 
                    image = {2}
                    title="Sterilization of equipment and tools before service:"
                    description="Our equipment and tools are sterilized before every use wherever necessary. Using the barriers to separate people or maintain social distancing."
                />
                <SecureItem 
                    image = {3}
                    title="Service providers clean hands before every service: "
                    description="Lorem Ipsum is simply dummy text on the printing and typesetting industry. Lorem Ipsum has been the industry"
                />
                <SecureItem 
                    image = {4}
                    title="Mono-Dose products:"
                    description="We always use the one time use and throw products [ Ex: Masks , Gloves …etc ]. Our service providers use single dose products wherever necessary."
                />
                <SecureItem 
                    image = {5}
                    title="Training"
                    description="We have a fixed team or number of professionals while working. All our service providers have been trained to maintain a high degree of hygiene and to clean up the space post the service is done."
                />
                <SecureItem 
                    image = {6}
                    title="Virus Fumigation:"
                    description="We are using back-to-back or side-to-side working rule rather than face-to-face wherever it is possible. Our head office has been fumigated for covid-19 and employees have been asked to work from home. "
                />
                <SecureItem 
                    image = {7}
                    title="Awareness:"
                    description="We build awareness about symptoms of corona to all clients and follow up too for any support needed. We are constantly engaging with our customers and raising awareness through our social and communication channels. "
                />
            </View>
            <View style={styles.image2}>
                <Image
                    source={require('~/assets/images/secure_back2.png')}
                    style={{width: '100%'}}
                />
                <View style={{position: 'absolute', width: '60%', padding: 20}}>
                    <AppText style={styles.bottomText}>
                        Tazzerclean decontaminants and disinfectants are NHS(National Health Service) and HSE(Health and Safety Executive) certified which will help to kill the virus on the surface.
                    </AppText>
                    <AppText style={styles.bottomText}>
                        Our professionals wear a  PPE ( personal protective equipment)  kit as well as a respiratory mask which is certified by NHS.
                    </AppText>
                    <AppText style={styles.bottomText}>
                        Any contagious material will be decontaminated and disposed of with proper care.
                    </AppText>
                    <AppText style={styles.bottomText}>
                        We follow NHS guidelines to decontaminate all our tools, PPE kits, and mode transport.
                    </AppText>
                </View>
            </View>
            <View style={{marginTop: 20, justifyContent:'center', alignItems: 'center', width: '100%', marginBottom: 200}}>
                <Button
                    type="purple"
                    style={{width: 350}}
                    onClick={() => {
                        NavigationService.navigate('Booking');
                    }}>
                        Book Fumigation Service
                </Button>
            </View>
            </ScrollView>
        </View>
        
      </Screen>
    );
};


SecureScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'HJ Secure',
    },
});

const styles = StyleSheet.create({
  container: {
  },

  image1: {
    backgroundColor: "#444",
    width: '100%',
    marginBottom: 20
  },

  image2: {
    backgroundColor: "#444",
    width: '100%',
    marginBottom: 20
  },

  bottomText: {
      marginBottom: 10,
      fontSize: 12,
      color: "#222"
  }
});
