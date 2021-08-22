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

import ContactSVG from '~/assets/images/contact.svg';
import ChatSVG from '~/assets/images/chat.svg';
import FaqSVG from '~/assets/images/faq.svg';
import PolicySVG from '~/assets/images/privacy.svg';

import { Constants } from '~/core/constant';
export const SupportScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.account.userInfo);

    return (
      <Screen
        backgroundColor="#333"
    >
         <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity
                    onPress={()=> NavigationService.navigate('Contact')}
                >
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <ContactSVG height={30} width={30}/>
                        <AppText style={styles.text}>Contact Us</AppText>
                    </View>
                    <View>
                        <Icon size={30} name="chevron-right" color="white" />
                    </View>
                </View>
                </TouchableOpacity>
                <DashedLine />

                <TouchableOpacity
                    onPress={()=> NavigationService.navigate('Contact')}
                >
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <ChatSVG height={30} width={30}/>
                        <AppText style={styles.text}>Chat With Us</AppText>
                    </View>
                    <View>
                        <Icon size={30} name="chevron-right" color="white" />
                    </View>
                </View>
                </TouchableOpacity>
                <DashedLine />

                <TouchableOpacity
                    onPress={()=> NavigationService.navigate('Coupon')}
                >
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <FaqSVG height={30} width={30}/>
                        <AppText style={styles.text}>FAQ & Terms</AppText>
                    </View>
                    <View>
                        <Icon size={30} name="chevron-right" color="white" />
                    </View>
                </View>
                </TouchableOpacity>
                <DashedLine />

                <TouchableOpacity
                    onPress={()=> NavigationService.navigate('ManageCards')}
                >
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <PolicySVG height={30} width={30}/>
                        <AppText style={styles.text}>Privacy Policy</AppText>
                    </View>
                    <View>
                        <Icon size={30} name="chevron-right" color="white" />
                    </View>
                </View>
                </TouchableOpacity>
                <DashedLine />
            </ScrollView>
        </View>
      </Screen>
    );
};


SupportScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'Support',
    },
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.layout.screenPaddingHorizontal,
    minHeight: '100%',
  },

  text: {
      color: '#fff',
      marginLeft: 20
  },

  itemContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      height: 70,
      alignItems: 'center'
  },

  imageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1
  }
});
