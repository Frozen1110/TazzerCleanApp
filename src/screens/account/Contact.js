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
export const ContactScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.account.userInfo);

    const [name, setName] = useState('Vijay Reddy');
    const [phone, setPhone] = useState('+91');
    const [email, setEmail] = useState('vijaycsqapmp@gmail.com');
    const [message, setMessage] = useState('');

    return (
      <Screen
        backgroundColor="#333"
    >
        <View style={styles.container}>
            <View style={styles.topcontainer}>
                
            </View>
            <View style={styles.bottomcontainer}>
               
            </View>
            <View style={styles.contactcontainer}>
                    <View style={styles.buttonWrapper}>
                    <Button
                        type="dark-red"
                        style={{width: 150,}}
                        onClick={() =>  console.log('abc') }>
                        Call Us
                    </Button>
                    <Button
                        type="dark-red"
                        style={{width: 150}}
                        onClick={() =>  console.log('abc') }>
                        Chat with us
                    </Button>
                    </View>
                    <DashedLine/>
                    <View style={styles.chatContainer}>
                        <AppText style={styles.text}>Write to us for any Queries</AppText>
                        <Input
                            style={{...styles.input, fontColor: 'white'}}
                            type="text"
                            fontColor="white"
                            placeholder="Type your full name here"
                            value={name}
                            onChange={(e) => setName(e)} />
                        
                        <Input
                            style={styles.input}
                            fontColor="white"
                            type="text"
                            placeholder="Type your phone numbe here"
                            value={phone}
                            onChange={(e) => setPhone(e)} />

                            
                        <Input
                            style={styles.input}
                            fontColor="white"
                            type="text"
                            placeholder="Type your email here"
                            value={email}
                            onChange={(e) => setEmail(e)} />

                            
                        <Input
                            style={{...styles.input, height: 150}}
                            type="textarea"
                            fontColor="white"
                            placeholder="Query"
                            value={message}
                            onChange={(e) => setMessage(e)} />

                    </View>
                </View>
        </View>
        
      </Screen>
    );
};


ContactScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'Contact US',
    },
});

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        minHeight: '100%',
    },

    topcontainer: {
        height: '40%',
        backgroundColor: 'deepskyblue'
    },

    bottomcontainer: {
        alignItems: 'center',
        backgroundColor: '#222',
        height: '60%'
    },

    contactcontainer: {
        position: 'absolute',
        left: 15,
        right: 15,
        backgroundColor: '#333',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 15,
        paddingTop: 20,
        bottom: 0
    },

    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 15
    },

    text: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 20
    },

    input: {
        backgroundColor: '#666',
        color: 'white',
        marginTop: 20,
        borderRadius: 5,
        height: 40,
        marginHorizontal: 30,
        alignSelf: 'center',
        width: '100%'
    }
});
