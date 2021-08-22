import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet,FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigationService } from '~/core/services';
import { Screen, AppText, Button, Input, Footer } from '~/components';

import { fetchAPI } from '~/core/utility';
import { setUserInfo, setToken, signOut, setOrder } from '~/store/actions';
import { GlobalStyles, Theme, MainNavigationOptions, UserNavigationOptions } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


export const HomeScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.account.userInfo);
    const [services, setServices] = useState(false);

    const [find, setFind] = useState('');
    useEffect(() => {
        console.log("+++userinfo+++",userInfo);
        navigation.setParams({
            username: userInfo.firstName + ' ' + userInfo.lastName,
            avatar: userInfo.avatar,
            location: '7-1-77/1,Smith...'
        });
        setLoading(true);          
        fetchAPI(`/services/getAllServices`, {
            method: 'GET',
        })
        .then((res) => {
            setServices(res);
        })
        .catch((err) =>
            dispatch(showNotification({ type: 'error', message: err.message })),
        )
        .finally(() => setLoading(false));
      }, [userInfo]);
    return (
      <Screen
        align="center"
        backgroundColor="#333"
        stickyBottom = {
            <Footer active='home'/>
        }
        >
        <View style={styles.container}>
            <Input
                type="text"
                placeholder="Search for Services"
                style={{marginTop: 10, marginBottom: 10, borderRadius: 6, height:40}}
                value = {find}
                onChange= {(e) => setFind(e)}
                actionIcon="text-search"
                actionHandler={() => {

                }}
            />
            {services && services.length > 0 &&
                <FlatList
                style={styles.list}
                alwaysBounceVertical={false}
                data={services}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap'}}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={()=>NavigationService.navigate('ServiceDetail', {id: item.id})}
                    >
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ 
                                    uri: 
                                        item.imageUrl ||
                                        'https://via.placeholder.com/450?text=Image%20is%20not%20available',
                                    }}
                            style={styles.image}
                           
                        />
                        <AppText style={styles.text}>{item.name}</AppText>
                    </View>
                    </TouchableOpacity>
                )}
              />
            }
        </View>
      </Screen>
    );
};


HomeScreen.navigationOptions = ({ navigation }) =>
    UserNavigationOptions({
    navigation,
    options: {
      headerTitle: '',
    },
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    paddingHorizontal: Theme.layout.screenPaddingHorizontal,
    paddingTop: Theme.layout.screenPaddingTop,
    paddingBottom: Theme.layout.screenPaddingBottom,

    display: 'flex',
    minHeight: '100%',
  },

  logo: {
    width: '80%',
    height: 80,
    resizeMode: 'contain',
    margin: 'auto',
    marginBottom: 120,
    marginTop: 30
  },

  accentColor: {
    color: Theme.color.accentColor,
  },

  heading: {
    color: '#FFF',
    fontSize: 40,
    letterSpacing: 2,
    fontWeight: '800',
    textTransform: 'uppercase',
  },

  subheading: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },

  
  image: {
    width: '100%',
    height: 85,
    borderRadius: 5,
  },

  text: {
      color: '#fff',
      marginTop: 10
  },

  imageContainer: {
    padding: 10,
    alignItems: 'center',
    width: 100,
    flex: 0.25
  },

  list: {
    flex: 1,
  }
});
