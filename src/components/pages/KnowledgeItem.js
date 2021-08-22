import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Theme } from '~/styles';

import { AppText, Button, DashedLine } from '~/components';
import { withTheme } from 'react-native-elements';

export const KnowledgeItem = ({
    image = '#1fbd50',
    title,
    description1,
    description2,
    date
}) => {

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>

        </View>
        <View style={styles.descriptionContainer}>
            <AppText style={styles.title}>{title}</AppText>
            <AppText style={styles.text}>{description1}</AppText>
            { description2 && <AppText style={styles.text}>{description2}</AppText> }
            <DashedLine styleLine={{backgroundColor: 'white'}} styleContainer={{borderColor: 'white'}}/>
            <AppText style={styles.text}>{date}</AppText>
        </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#444',
        height: 330, 
        padding: 5, 
        borderRadius: 5, 
        marginTop: 10,
        marginHorizontal: 20,
        marginBottom: 10
    },
    imageContainer: {
        backgroundColor: '#222',
        height: 150
    },  
    descriptionContainer: {
        padding: 20
    },
   text: {
       color: 'white',
       fontSize: 12,
       marginTop: 10,
       marginBottom: 10
   },
   title: {
       color: 'white',
       fontSize: 16
   }
});
