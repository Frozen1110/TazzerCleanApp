import React, { useEffect, useState, useMemo } from 'react';
import { View, Image, StyleSheet,FlatList, ScrollView, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigationService } from '~/core/services';
import { Screen, AppText, Button, Input, Footer, DashedLine, KnowledgeItem, Tabs } from '~/components';

import { fetchAPI } from '~/core/utility';
import { setUserInfo, setToken, signOut, setOrder } from '~/store/actions';
import { GlobalStyles, Theme, MainNavigationOptions, UserNavigationOptions } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WalletSVG from '~/assets/images/wallet-white.svg';

import { Constants } from '~/core/constant';
import { withTheme } from 'react-native-elements';

export const KnowledgeScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.account.userInfo);
    const [categoris, setCategories] = useState(['Garden Maintenance','Clearance & Clean-up'])
    const [knowledge, setKnowledge] = useState(true);
    const tabData = useMemo(() => {
        let tabData = [];
        categoris.map((item) => {
            tabData.push({
            title: item,
            content: (
                <View>
                { knowledge ? (
                <>
                <KnowledgeItem
                    image=""
                    title="Our Mascot - Our Pride and Joe"
                    description1="A mostcat represents the core values of any companyand that's exactly what we aimed to archieve with Joe"
                    description2="Our business is built on the expertise of working-class heroies..."
                    date="February 23, 2021"
                />
                <KnowledgeItem
                    image=""
                    title="All the more reasons To Begin Construction This Diwali"
                    description1="It's that time of year again. People are in a festive mood and the time for celebration is upon us. This is also  a time that is looked at as a fresh start or in the case of 2020 a fresh re-start..."
                    date="November 11, 2020"
                />
                </>
            ) : 
                <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <AppText style={styles.text}>You have no knowledge for this category</AppText>
                </View>
            }
            </View>
            ),
            });
        })
        return tabData;
    }, []);

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
            <Tabs tabs={tabData} />
        </View>
        
      </Screen>
    );
};


KnowledgeScreen.navigationOptions = ({ navigation }) =>
    MainNavigationOptions({
    navigation,
    options: {
      headerTitle: 'Knowledge Center',
    },
});

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        color: 'white',
        fontSize: 14
    }
});
