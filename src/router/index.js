import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  SplashScreen,
  LoginScreen,
  SignupScreen,
  HomeScreen,
  AccountScreen,
  WalletScreen,
  NotificationScreen,
  CouponScreen,
  ManageCardsScreen,
  KnowledgeScreen,
  AboutScreen,
  SupportScreen,
  ContactScreen,
  SecureScreen,
  BookingScreen,
  BookingConfirmScreen,
  CartScreen,
  ScheduleScreen,
  DeclarationScreen,
  ReviewScreen,
  OrderDetailScreen,
  ServiceDetailScreen,
} from '../screens';

const AppNavigator = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
    },

    // Auth Screens
    Login: {
      screen: LoginScreen,
    },

    Signup: {
      screen: SignupScreen,
    },

    // Home Screen
    Home: {
      screen: HomeScreen,
    },

    // Service Detail Screen
    ServiceDetail: {
      screen: ServiceDetailScreen
    },

    // Account Screen
    Account: {
      screen: AccountScreen
    },

    Wallet: {
      screen: WalletScreen
    },

    Notification: {
      screen: NotificationScreen
    },

    Coupon: {
      screen: CouponScreen
    },

    ManageCards: {
      screen: ManageCardsScreen
    },

    Knowledge: {
      screen: KnowledgeScreen
    },

    About: {
      screen: AboutScreen
    },

    // Account/Support screen
    Support: {
      screen: SupportScreen
    },
    
    Contact: {
      screen: ContactScreen
    },

    // HJ Secure screen
    Secure: {
      screen: SecureScreen
    },

    //Booking
    Booking: {
      screen: BookingScreen
    },
    
    BookingConfirm: {
      screen: BookingConfirmScreen
    },

    //Cart
    Cart: {
      screen: CartScreen
    },
    Schedule: {
      screen: ScheduleScreen
    },
    Declaration: {
      screen: DeclarationScreen
    },
    Review: {
      screen: ReviewScreen
    },
    OrderDetail: {
      screen: OrderDetailScreen
    },
  },

  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerBackTitle: ' ',
      gestureEnabled: false,
    },
  },
);

export default createAppContainer(AppNavigator);
