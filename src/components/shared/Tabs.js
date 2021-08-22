import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Theme } from '~/styles';

import {AppText} from '~/components';

export const Tabs = ({
    tabs,
    headerBackground = "#222",
    headerActiveColor = "white"
}) => {

const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <ScrollView>
        {tabs.length > 1 && <View style={styles.tab}>
            {tabs.map((tab,index) => {
                return <TouchableOpacity
                style={[styles.tabButton,(index == activeTabIndex && styles.tabButtonActive), {backgroundColor: headerBackground}]}
                activeOpacity={0.8}
                onPress={() => setActiveTabIndex(index)}
                >
                    <AppText 
                    style={[styles.tabButtonText,(index == activeTabIndex && styles.tabButtonTextActive), (index === activeTabIndex && {color: headerActiveColor})]}
                    >{tab.title}</AppText>
                    {index == activeTabIndex && <View style={styles.underline}></View> }
                </TouchableOpacity>
            })}
        </View>}
        <View style={styles.tabContent}>{typeof tabs[activeTabIndex] != null && tabs[activeTabIndex].content}</View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
    tab : {
        flexDirection : 'row',
        justifyContent: 'center',
        flex: 1
    },
    tabButton : {
        paddingVertical: 15,
        width: Dimensions.get('window').width / 2
    },
    tabButtonText : {
        color: '#777',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 20
    },
    tabButtonActive : {

    },
    tabButtonTextActive : {
        fontSize: 14
    },
    tabContent : {
        paddingTop: 10,
        flex: 1,
        minHeight: '100%'
    },
    underline: {
        width: '100%', 
        borderWidth: 1, 
        borderColor: '#f44', 
        position: 'absolute', 
        bottom: 0
    }
});
