import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Theme } from '~/styles';

import { AppText } from '~/components';
import { NavigationService } from '../../core/services';

export const BookingItem = ({
    image,
    title,
    date,
    schedule,
    time
}) => {

  return (
    <View style={styles.container}>
        <View style={styles.mainContainer}>
            <TouchableOpacity
                onPress={()=> NavigationService.navigate('BookingConfirm')}
            >
                <Image
                    source={{ 
                            uri: 
                                image ||
                                'https://via.placeholder.com/450?text=Image%20is%20not%20available',
                            }}
                    style={styles.image}
                    
                />
            </TouchableOpacity>
            <View style={{marginLeft: 20}}>
                <AppText style={styles.title}>{ title }</AppText>
                <AppText style={styles.tiny}>Placed on : { date }</AppText>
                {
                    schedule === true ?
                    <AppText style={styles.highlight_active}>SCHEDULED</AppText>
                    :
                    <AppText style={styles.highlight_inactive}>NOT SCHEDULED</AppText>
                }
            </View>

        </View>

        
        <View style={{width: '100%', borderWidth: 1, borderColor: '#707070', height: 0}}></View>

        <View style={{flexDirection: 'row',justifyContent: 'space-between', paddingVertical: 15}}>
            <AppText style={styles.text}> {date} </AppText>
            <AppText style={styles.text}> {time} </AppText>
        </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    mainContainer: {
        flexDirection: 'row',
        paddingVertical: 20
    },  
    descriptionContainer: {
        padding: 20,
        marginLeft: 20,
        width: 250
    },
   text: {
       color: 'white',
       fontSize: 12,
   },
   title: {
       color: 'white',
       fontSize: 16,
       fontWeight: 'bold'
   },
   tiny: {
        color: 'grey',
        fontSize: 10
   },   
   highlight_active: {
    color: '#25cbf2',
    fontSize: 12
   },   
   highlight_inactive: {
    color: '#f44',
    fontSize: 12
   },   
   image: {
        width: 100,
        height: 50
   }
});
