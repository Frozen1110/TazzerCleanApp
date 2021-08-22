import { NavigationActions, StackActions } from 'react-navigation';
import { Platform, Keyboard } from 'react-native';

const config = {};

function setNavigator(nav) {
  if (nav) {
    config.navigator = nav;
  }
}

function goBack(params = {}) {
  if (config.navigator) {
    if (Platform.OS === 'android') {
      Keyboard.dismiss();
    }
    const action = NavigationActions.back({ params });
    config.navigator.dispatch(action);
  }
}

function setParams(params = {}) {
  if (config.navigator) {
    const action = NavigationActions.setParams({ params });
    config.navigator.dispatch(action);
  }
}

function navigate(routeName, params = {}) {
  if (config.navigator && routeName) {
    if (Platform.OS === 'android') {
      Keyboard.dismiss();
    }
    const action = NavigationActions.navigate({ routeName, params });
    config.navigator.dispatch(action);
  }
}

function reset(routeName, params = {}) {
  if (config.navigator && routeName) {
    if (Platform.OS === 'android') {
      Keyboard.dismiss();
    }
    const action = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params })],
    });
    config.navigator.dispatch(action);
  }
}

export const NavigationService = {
  setNavigator,
  goBack,
  setParams,
  navigate,
  reset,
};
