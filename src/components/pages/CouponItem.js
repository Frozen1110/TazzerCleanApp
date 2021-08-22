import React from 'react';
import { View, StyleSheet, TouchableOpacity, } from 'react-native';

import { AppText, Button, DashedLine } from '~/components';

export const CouponItem = ({
    backgroundColor = '#1fbd50',
    lineColor= 'white',
    type,
    cost,
    service,
    promocode,
    validity
}) => {

  return (
    <View style={styles.container}>
        <View style={{...styles.subcontainer, backgroundColor: backgroundColor}}>
            <View style={styles.leftcontainer}>
                <View style={{...styles.description, width: 70}}>
                    <AppText style={styles.text}>{type}</AppText>
                </View>
                <View style={{marginTop: 5}}>
                    <AppText style={{fontSize: 30}}>$ {cost}</AppText>
                </View>
                <View style={styles.description}>
                    <AppText style={styles.text}>Instant Discount on</AppText>
                    <AppText style={styles.text}>{service}</AppText>
                </View>
                <View>
                    <Button
                        type="bordered-black"
                        style={{marginTop: 20, height: 40}}
                        onClick={() => {
                            console.log('apply');
                        }}>
                            Apply
                    </Button>
                </View>
            </View>
            <View style={styles.rightcontainer}>
                <View style={{borderColor: lineColor, borderWidth: 3, height: 100, width: 190}}>
                    <View style={{position: 'absolute', top: -10, zIndex: 1,marginHorizontal: 15, alignSelf: 'center',textAlign: 'center', backgroundColor: backgroundColor, paddingHorizontal: 10}}>
                        <AppText style={{ color: lineColor}}>YOUR PROMO CODE</AppText>
                    </View>
                    <AppText style={{fontSize: 25, alignSelf: 'center', marginVertical: 10}}>{promocode}</AppText>
                    <DashedLine styleLine={{backgroundColor: lineColor}} styleContainer={{borderColor: lineColor}}/>
                    <AppText style={{color: lineColor, fontSize: 12, marginTop: 10, alignSelf: 'center'}}>Validity: {validity}</AppText>
                </View>
            </View>

        </View>
        <TouchableOpacity
            onPress={() => {console.log('terms and conditions')}}
        >
            <View style={{ padding: 10 }}>
                <AppText style={{...styles.text, textDecorationLine: 'underline', textAlign: 'right'}}>Terms & Conditions</AppText>
            </View>
        </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#444',
        height: 250, 
        width: '100%', 
        padding: 5, 
        borderRadius: 5, 
        marginTop: 10
    },
    subcontainer: {
        width: '100%', 
        flexDirection: 'row', 
        flex: 1, 
        borderRadius: 5
    },
    leftcontainer: {
        flex: 0.4, 
        paddingHorizontal: 20, 
        paddingVertical: 10
    },
    rightcontainer: {
        height: '100%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        flex: 0.6
    },
   text: {
       color: 'white',
       fontSize: 12
   },
   description: {
       backgroundColor: '#000', 
       padding: 5
    }
});
