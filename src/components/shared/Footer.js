import React, { useMemo } from 'react';
import {
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Theme, Controls } from '~/styles';
import { AppText } from '~/components';

import HomeSVG from '~/assets/images/home.svg';
import BookingSVG from '~/assets/images/booking.svg';
import SecureSVG from '~/assets/images/invite.svg';
import AccountSVG from '~/assets/images/user.svg';
import CartSVG from '~/assets/images/cart.svg';

import HomeSVGActive from '~/assets/images/home_active.svg';
import BookingSVGActive from '~/assets/images/booking_active.svg';
import SecureSVGActive from '~/assets/images/invite_active.svg';
import AccountSVGActive from '~/assets/images/user_active.svg';
import CartSVGActive from '~/assets/images/cart_active.svg';

import { NavigationService } from '~/core/services';
export const Footer = ({
  type = 'theme1', // theme1
  active,
  ...props
}) => {

  return (
    <View style={styles.wrapper}>
        <View>
            <TouchableOpacity
                style={styles.itemWrapper}
                onPress={()=>NavigationService.navigate('Home')}
            >
                {active == 'home' ? <HomeSVGActive height={30} width={30}/> : <HomeSVG height={30} width={30}/>}
                <AppText style={styles.text}>Home</AppText>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity
                style={styles.itemWrapper}
                onPress={()=>NavigationService.navigate('Booking')}
            >
                {active == 'booking' ? <BookingSVGActive height={30} width={30}/> : <BookingSVG height={30} width={30}/>}
                <AppText style={styles.text}>Bookings</AppText>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity
                style={styles.itemWrapper}
                onPress={()=>NavigationService.navigate('Secure')}
            >
                {active == 'secure' ? <SecureSVGActive height={30} width={30}/> : <SecureSVG height={30} width={30}/>}
                <AppText style={styles.text}>HJ Secure</AppText>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity
                style={styles.itemWrapper}
                onPress={() => NavigationService.navigate('Account') }
            >
                {active == 'account' ? <AccountSVGActive height={30} width={30}/> : <AccountSVG height={30} width={30}/>}
                <AppText style={styles.text}>Account</AppText>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity
                style={styles.itemWrapper}
                onPress={()=> NavigationService.navigate('Cart')}
            >
                {active == 'cart' ? <CartSVGActive height={30} width={30}/> : <CartSVG height={30} width={30}/>}
                <AppText style={styles.text}>Cart</AppText>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Controls.footer.backgroundColor,
    height: Controls.footer.height,
    paddingHorizontal: 15,
    paddingTop: 10
    // width: '100%',
  },
  itemWrapper: {
      alignItems: 'center'
  },
  text: {
    fontSize: Controls.footer.textSize,
    color: Controls.footer.color,
    marginTop: 4
  },
});
