/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import { Provider } from 'react-redux';
 import { PersistGate } from 'redux-persist/integration/react';
 import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
 
 import AppContainer from './src/router';
 import { Loading } from './src/components';
 import { NavigationService } from './src/core/services';
 import store from './src/store';

 MaterialIcon.loadFont();
 
 const App = () => {
   return (
     <Provider store={store.store}>
       <PersistGate loading={<Loading />} persistor={store.persistor}>
         <AppContainer
           ref={(navigatorRef) => {
             NavigationService.setNavigator(navigatorRef);
           }}
         />
       </PersistGate>
     </Provider>
   );
 };
 
 export default App;
 