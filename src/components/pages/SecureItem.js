import React  from 'react';
import { View, StyleSheet } from 'react-native';

import { AppText } from '~/components';

import Secure1SVG from '~/assets/images/secure_1.svg';
import Secure2SVG from '~/assets/images/secure_2.svg';
import Secure3SVG from '~/assets/images/secure_3.svg';
import Secure4SVG from '~/assets/images/secure_4.svg';
import Secure5SVG from '~/assets/images/secure_5.svg';
import Secure6SVG from '~/assets/images/secure_6.svg';
import Secure7SVG from '~/assets/images/secure_7.svg';

export const SecureItem = ({
    image,
    title,
    description,
}) => {

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            {
                image === 1 && <Secure1SVG height = {80} width = {80}/>
            }
            {
                image === 2 && <Secure2SVG height = {80} width = {80}/>
            }
            {
                image === 3 && <Secure3SVG height = {80} width = {80}/>
            }
            {
                image === 4 && <Secure4SVG height = {80} width = {80}/>
            }
            {
                image === 5 && <Secure5SVG height = {80} width = {80}/>
            }
            {
                image === 6 && <Secure6SVG height = {80} width = {80}/>
            }
            {
                image === 7 && <Secure7SVG height = {80} width = {80}/>
            }
        </View>
        <View style={styles.descriptionContainer}>
            <AppText style={styles.title}>{title}</AppText>
            <AppText style={styles.text}>{description}</AppText>
        </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222222',
        height: 150, 
        paddingHorizontal: 30, 
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center'
    },
    imageContainer: {
        flexDirection: 'row'
    },  
    descriptionContainer: {
        padding: 20,
        marginLeft: 20,
        width: 280
    },
   text: {
       color: 'white',
       fontSize: 12,
       marginTop: 10,
       marginBottom: 10
   },
   title: {
       color: 'white',
       fontSize: 20,
       fontWeight: 'bold'
   },
   image: {
        width: 80,
        height: 80
   }
});
