import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet,FlatList, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigationService } from '~/core/services';
import { Screen, AppText, Button, Input, Footer, DashedLine } from '~/components';

import { fetchAPI } from '~/core/utility';
import { setUserInfo, setToken, signOut, setOrder } from '~/store/actions';
import { GlobalStyles, Theme, MainNavigationOptions, UserNavigationOptions } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import WalletSVG from '~/assets/images/home.svg';
import NotificationSVG from '~/assets/images/booking.svg';
import OfferCouponSVG from '~/assets/images/invite.svg';
import CardsSVG from '~/assets/images/user.svg';
import RateSVG from '~/assets/images/cart.svg';
import KnowledgeSVG from '~/assets/images/invite.svg';
import AboutSVG from '~/assets/images/user.svg';
import SupportSVG from '~/assets/images/cart.svg';

export const AccountScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.account.userInfo);
    const [services, setServices] = useState(false);

    const [find, setFind] = useState('');
    
    return (
      <Screen
        align="center"
        backgroundColor="#333"
        stickyBottom = {
            <Footer active='account'/>
        }
        >
        <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity
                    onPress={()=> NavigationService.navigate('Wallet')}
                >
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <WalletSVG height={30} width={30}/>
                        <AppText style={styles.text}>My Wallet</AppText>
                    </View>
                    <View>
                        <Icon size={30} name="chevron-right" color="white" />
                    </View>
                </View>
                </TouchableOpacity>
                <DashedLine />

                <TouchableOpacity
                    onPress={()=> NavigationService.navigate('Notification')}
                >
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <NotificationSVG height={30} width={30}/>
                        <AppText style={styles.text}>Notification</AppText>
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
                        <OfferCouponSVG height={30} width={30}/>
                        <AppText style={styles.text}>Offer and Coupons</AppText>
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
                        <CardsSVG height={30} width={30}/>
                        <AppText style={styles.text}>Manage Cards</AppText>
                    </View>
                    <View>
                        <Icon size={30} name="chevron-right" color="white" />
                    </View>
                </View>
                </TouchableOpacity>
                <DashedLine />

                <TouchableOpacity
                    onPress={()=> console.log('navigation')}
                >
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <RateSVG height={30} width={30}/>
                        <AppText style={styles.text}>Rate Us</AppText>
                    </View>
                    <View>
                        <Icon size={30} name="chevron-right" color="white" />
                    </View>
                </View>
                </TouchableOpacity>
                <DashedLine />

                <TouchableOpacity
                    onPress={()=> NavigationService.navigate('Knowledge')}
                >
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <KnowledgeSVG height={30} width={30}/>
                        <AppText style={styles.text}>Knowledge Center</AppText>
                    </View>
                    <View>
                        <Icon size={30} name="chevron-right" color="white" />
                    </View>
                </View>
                </TouchableOpacity>
                <DashedLine />

                <TouchableOpacity
                    onPress={()=> NavigationService.navigate('About')}
                >
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <AboutSVG height={30} width={30}/>
                        <AppText style={styles.text}>About Us</AppText>
                    </View>
                    <View>
                        <Icon size={30} name="chevron-right" color="white" />
                    </View>
                </View>
                </TouchableOpacity>
                <DashedLine />

                <TouchableOpacity
                    onPress={()=> NavigationService.navigate('Support')}
                >
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <SupportSVG height={30} width={30}/>
                        <AppText style={styles.text}>Support</AppText>
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


AccountScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'Account',
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
