import React, { useEffect, useState, useMemo } from 'react';
import { View, Image, StyleSheet,FlatList, ScrollView, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigationService } from '~/core/services';
import { Screen, AppText, Button, Input, Footer, DashedLine, SecureItem, Tabs } from '~/components';

import { fetchAPI } from '~/core/utility';
import { setUserInfo, setToken, signOut, setOrder } from '~/store/actions';
import { GlobalStyles, Theme, MainNavigationOptions, UserNavigationOptions } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckSVG from '~/assets/images/check_simple.svg';
import { showNotification } from '~/store/actions';

import { Constants } from '~/core/constant';
import App from '../../App';
export const ServiceDetailScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);    
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.account.userInfo);
    const [service, setService] = useState(false);
    const serviceId = navigation.getParam('id');
    const [split, setSplit] = useState(1);
    const tabData = useMemo(() => {
        let tabData = [];
        tabData.push({
        title: "Inclusions",
        content: (
            <View style={{ paddingVertical: 30 }}>
                <View style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center', paddingRight: 30}}>
                    <CheckSVG fill="#f54343" width={16} height={16} />
                    <AppText style={{marginLeft: 10, color: 'white'}}>Prices shown are for labour charges only</AppText>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center', paddingRight: 30}}>
                    <CheckSVG fill="#f54343" width={16} height={16} />
                    <AppText style={{marginLeft: 10, color: 'white'}}>Consumables and ports (it's used) will be charged extra</AppText>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center', paddingRight: 30}}>
                    <CheckSVG fill="#f54343" width={16} height={16} />
                    <AppText style={{marginLeft: 10, color: 'white'}}>Warranty on consumables and parts  will be as per manufacturer only.</AppText>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center', paddingRight: 30}}>
                    <CheckSVG fill="#f54343" width={16} height={16} />
                    <AppText style={{marginLeft: 10, color: 'white'}}>Housejoy providing 7 days service warranty for Wet servicing & 30 days for repairing & gas refill</AppText>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center', paddingRight: 30}}>
                    <CheckSVG fill="#f54343" width={16} height={16} />
                    <AppText style={{marginLeft: 10, color: 'white'}}>If any repair work is required a quote will be given before proceeding.</AppText>
                </View>
                <View>
                    <AppText style={{color: 'white', fontSize: 24}}>Procedure</AppText>
                </View>
                <View style={{marginTop: 20, paddingRight: 30}}>
                    <AppText style={{color: "#999"}}>Prices shown are labour charges only.</AppText>
                </View>
                <View style={{marginTop: 20, paddingRight: 30}}>
                    <AppText style={{color: "#999"}}>Consumables and ports (it's used) will be charged extra</AppText>
                </View>
                <View style={{marginTop: 20, paddingRight: 30}}>
                    <AppText style={{color: "#999"}}>Warranty on consumables and parts  will be as per manufacturer only.</AppText>
                </View>
                <View style={{marginTop: 20, paddingRight: 30}}>
                    <AppText style={{color: "#999"}}>Housejoy providing 7 days service warranty for Wet servicing & 30 days for repairing & gas refill</AppText>
                </View>
                <View style={{marginTop: 20, paddingRight: 30}}>
                    <AppText style={{color: "#999"}}>If any repair work is required a quote will be given before proceeding.</AppText>
                </View>
            </View>
        ),
        
        });
        tabData.push({
            title: "Exclusions",
            content: (
                <View style={{ paddingVertical: 30 }}>
                    <View style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center'}}>
                        <CheckSVG fill="#f54343" width={16} height={16} />
                        <AppText style={{marginLeft: 10, color: 'white'}}>Prices shown are for labour charges only</AppText>
                    </View>
                </View>
            ),
        });
        return tabData;
    }, []);
    /*
    useEffect(() => {
        setLoading(true); 
        console.log("++++request+++", serviceId);         
        fetchAPI(`/services/geServiceById?serviceId=`+serviceId, {
            method: 'GET',
        })
        .then((res) => {
            console.log(res);
            setService(service);
            navigation.setParams({ title : service.name});
            //setBalance(res);
        })
        .catch((err) =>
            dispatch(showNotification({ type: 'error', message: err.message })),
        )
        .finally(() => setLoading(false));
    },[serviceId]);
    */
    return (
      <Screen
        backgroundColor="#333"
    >
        
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.image1}>
                <Image
                    source={require('~/assets/images/sample_service.png')}
                    style={{width: '100%'}}
                />

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10, marginBottom: 20}}>
                <Button
                    type="purple"
                    onClick={()=>console.log('button clicked')}
                    style={{width: 150, height: 40}}
                >Upto 1 ton</Button>
                <Button
                    type="bordered-light"
                    onClick={()=>console.log('button clicked')}
                    style={{width: 150, height: 40}}
                >1 - 2 ton</Button>
            </View>
            <DashedLine />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 25}}>
                <AppText style={{fontSize: 18, color: 'white'}}>Unit</AppText>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={()=> split > 0 ? setSplit(split - 1) : {}}
                    >
                        <View style={styles.minusContainer}>
                                <AppText style={styles.text}> - </AppText>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.numberContainer}>
                        <AppText style={styles.text}> {split} </AppText>
                    </View>
                    <TouchableOpacity
                        onPress={()=> setSplit(split + 1)}
                    >
                        <View style={styles.plusContainer}>
                                <AppText style={styles.text}> + </AppText>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <DashedLine/>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItem: 'center',paddingVertical: 20, paddingHorizontal: 25}}>
                <View>
                    <AppText style={{fontSize: 18, color: 'white'}}>Service Cost</AppText>
                    <AppText style={{marginTop: 10, color: "#f54343"}}>$ 1200</AppText>
                </View>
                <Button
                    type="purple"
                    onClick={()=> NavigationService.navigate('Cart')}
                    style={{width: 100, height: 40}}
                >ADD</Button>
            </View>
            <View style={{ backgroundColor: '#444', height: 50, width: '100%', paddingHorizontal: 25, paddingVertical: 5}}>
                <AppText style={{fontSize: 12, color: "#f54343"}}>Note : </AppText>
            </View>
            <View style={{padding: 25}}>
                <Tabs tabs={tabData} headerBackground='transparent' headerActiveColor="#f54343"/>
            </View>
            </ScrollView>
        </View>
        
      </Screen>
    );
};


ServiceDetailScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'Artificial Turf Installation',
    },
});

const styles = StyleSheet.create({
  container: {
  },

  image1: {
    backgroundColor: "#444",
    width: '100%',
  },

  minusContainer: {
    backgroundColor: "#f54343",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 30,
    height: 30,
    color: 'white'
  },
  plusContainer: {
    backgroundColor: "#f54343",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 30,
    height: 30,
    color: 'white'
  },
  numberContainer: {
    backgroundColor: '#f54343',
    width: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  },
  text: {
      color: 'white'
  }
});
